import {Excalibur} from "./excalibur";
import * as fs from "fs";
import FormData from "form-data";
import path from 'path'

class PluginManager {
  private excalibur: Excalibur;
  private upmToken: string | undefined;

  constructor(excalibur: Excalibur) {
    this.excalibur = excalibur;
  }

  private async getUpmToken(): Promise<string> {
    if (this.upmToken) {
      return this.upmToken;
    }
    const pluginApiUrl = '/rest/plugins/1.0/';
    const {headers} = await this.excalibur.getHttpService().get(pluginApiUrl, {headers: {'Content-Type': 'application/json'}});
    const upmToken = headers['upm-token'] ?? '';
    this.upmToken = upmToken
    return upmToken;
  }

  public install(obrPath: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await this.getUpmToken();
        const pluginInstallUrl = '/rest/plugins/1.0/';
        const formData = new FormData();
        formData.append('plugin', fs.createReadStream(path.resolve(obrPath)))
        const {data: installResponse} = await this.excalibur.getHttpService().post(
          pluginInstallUrl,
          formData,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              ...formData.getHeaders()
            },
            params: {token}
          })
        let timeElapsed = 0;
        const pluginStatusCheckUrl = installResponse.links.self;
        const pluginStatusCheckInterval = setInterval(async () => {
          timeElapsed = timeElapsed + 1;
          console.info(`Installing plugin... (Time elapsed: ${timeElapsed} seconds)`)
          const pluginStatusCheckResponse = await this.excalibur.getHttpService().get(pluginStatusCheckUrl);
          const isEnabled = pluginStatusCheckResponse.data?.enabled ?? false;
          if (isEnabled) {
            clearInterval(pluginStatusCheckInterval)
            console.info(`Plugin ${pluginStatusCheckResponse.data.key} successfully installed!`);
            resolve();
          }
          if (timeElapsed > 20) {
            clearInterval(pluginStatusCheckInterval)
            reject(new Error('Timeout! Takes more than 20 seconds to install'));
          }
        }, 1000);
      } catch (err) {
        reject(err);
      }
    })
  }
}

export {PluginManager};
