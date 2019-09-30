export class FacebookPostModel {
  id: number;
  createdTime: string;
  message: string;
  fromName: string;
  fromId: number;
  statusSelect?: boolean;
  fullPicture?: string;
  attachments?: Attachments;
  accountPictureUrl?: string;

  static fromResponse(response: any): FacebookPostModel {
    return Object.assign(new FacebookPostModel(), {
      id: response.id,
      createdTime: response.created_time,
      message: response.message,
      fromName: response.from.name,
      fromId: response.from.id,
      statusSelect: false,
      fullPicture: response.full_picture ? response.full_picture : null,
      attachments:  response.attachments ? Attachments.fromResponse(response.attachments) : null,
      accountPictureUrl:  response.accountPictureUrl,
    });
  }

  public clone(): FacebookPostModel {
    return Object.assign(new FacebookPostModel(), {
      id: this.id,
      createdTime: this.createdTime,
      message: this.message,
      fromName: this.fromName,
      fromId: this.fromId,
      fullPicture: this.fullPicture,
      attachments: this.attachments ? this.attachments.clone() : null,
      accountPictureUrl:  this.accountPictureUrl,

    });
  }
}

export class Attachments {
  url: string;
  title: string;
  type: string;
  description: string;

  public static fromResponse(response: any): Attachments {

    return Object.assign(new Attachments(), {
      url: response.data[0].url ? response.data[0].url : null,
      title: response.data[0].title ? response.data[0].title : null,
      type: response.data[0].type ? response.data[0].type : null,
      description: response.data[0].description ? response.data[0].description : null,
    });
  }
  public clone(): Attachments {
    return Object.assign(new Attachments(), {
      url: this.url,
      title:  this.title,
      type:  this.type,
      description: this.description,
    });
  }
}
