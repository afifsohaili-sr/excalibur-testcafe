import axios, {AxiosInstance} from "axios";

type ExcaliburConfig = {
  confluenceUrl?: string,
  confluenceUrlPrefix?: string
  password?: string,
  username?: string,
};

class Excalibur {
  public username: string;
  public password: string;
  public confluenceUrl: string;
  public confluenceUrlPrefix: string;

  private httpService: AxiosInstance | undefined;

  constructor({
                confluenceUrl = 'localhost:8090',
                confluenceUrlPrefix = '',
                password = 'admin',
                username = 'admin',
              }: ExcaliburConfig) {
    this.confluenceUrl = confluenceUrl;
    this.confluenceUrlPrefix = confluenceUrlPrefix;
    this.password = password;
    this.username = username;
  }

  public getHttpService(): AxiosInstance {
    if (this.httpService) {
      return this.httpService;
    }
    const httpService = axios.create({
      baseURL: `http://${this.confluenceUrl}${this.confluenceUrlPrefix}`,
      auth: {
        username: this.username,
        password: this.password
      }
    });
    this.httpService = httpService;
    return httpService;
  }
}

export {Excalibur};
