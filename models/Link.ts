import { nanoid } from "nanoid";

export class Link {
  public id: string;
  public name: string;
  public url: string;

  constructor(name: string, url: string) {
    this.id = nanoid();
    this.name = name;
    this.url = url;
  }
}
