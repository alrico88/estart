import { nanoid } from "nanoid";
import { Link } from "./Link";

export class Block {
  public id: string;
  public title: string;
  public links: Link[];
  public color: string;

  constructor() {
    this.id = nanoid();
    this.title = "";
    this.links = [];
    this.color = "red";
  }
}
