import {Excalibur} from "./excalibur";

type ContentRepresentation = 'storage' | 'wiki';

class PageManager {
  private excalibur: Excalibur;

  constructor(excalibur: Excalibur) {
    this.excalibur = excalibur;
  }

  async createPage(title: string, body: string, contentRepresentation: ContentRepresentation, spaceKey: string) {
    const {data} = await this.excalibur.getHttpService().post('/rest/api/content', {
      type: 'page',
      title,
      space: {key: spaceKey},
      body: {storage: {value: 'body', representation: contentRepresentation}}
    })
    return data;
  }
}

export {PageManager}
