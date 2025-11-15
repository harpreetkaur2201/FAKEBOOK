'use strict';
// subscriber.js
import { User } from './user.js';

export class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(id, name, userName, email, pages = [], groups = [], canMonetize = false) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      pages: this.#pages,
      groups: this.#groups,
      canMonetize: this.#canMonetize
    };
  }
}
