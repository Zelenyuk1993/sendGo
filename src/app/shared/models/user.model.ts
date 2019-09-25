export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl?: string;
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  static fromResponse(response: any): UserModel {
    return Object.assign(new UserModel(), {
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      pictureUrl: response.picture.data.url,
    });
  }

  public clone(): UserModel {
    return Object.assign(new UserModel(), {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      pictureUrl: this.pictureUrl,
    });
  }
}
