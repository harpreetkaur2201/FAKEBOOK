// assets/script/subscriber.js
import { User } from './user.js';

export class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages = [], groups = [], canMonetize = false) {
    super(id, name, userName, email);
    this.#pages = Array.isArray(pages) ? pages : [];
    this.#groups = Array.isArray(groups) ? groups : [];
    this.#canMonetize = Boolean(canMonetize);
  }

  // getters required by the assignment
  getPages() { return [...this.#pages]; }
  getGroups() { return [...this.#groups]; }
  getCanMonetize() { return this.#canMonetize; }

  // getInfo uses the base class method and extends it
  getInfo() {
    const base = super.getInfo();
    return {
      ...base,
      pages: [...this.#pages],
      groups: [...this.#groups],
      canMonetize: this.#canMonetize
    };
  }

  // optional helpers
  addPage(p) { this.#pages.push(p); }
  addGroup(g) { this.#groups.push(g); }
  enableMonetization() { this.#canMonetize = true; }
}
