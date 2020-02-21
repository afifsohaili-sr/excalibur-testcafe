import {Excalibur} from "./excalibur";

class SpaceManager {
  private excalibur: Excalibur;

  constructor(excalibur: Excalibur) {
    this.excalibur = excalibur;
  }

  async createSpace(key: string, name: string) {
    const {data} = await this.excalibur.getHttpService().post('/rest/api/space', {key, name});
    return data;
  }
}

export {SpaceManager}
