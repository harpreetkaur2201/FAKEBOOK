import { User } from './user.js';

// Subscriber extends User
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

  // getters
  getPages() { return [...this.#pages]; }
  getGroups() { return [...this.#groups]; }
  getCanMonetize() { return this.#canMonetize; }

  // full info
  getInfo() {
    return {
      ...super.getInfo(),
      pages: [...this.#pages],
      groups: [...this.#groups],
      canMonetize: this.#canMonetize
    };
  }
}
