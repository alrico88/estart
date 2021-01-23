import { nanoid } from "nanoid";

export class Block {
  constructor() {
    this.id = nanoid();
    this.title = "";
    this.links = [];
    this.color = "red";
  }
}

export class Link {
  constructor(name, url) {
    this.id = nanoid();
    this.name = name;
    this.url = url;
  }
}
