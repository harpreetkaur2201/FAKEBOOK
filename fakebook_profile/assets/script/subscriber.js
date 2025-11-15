// assets/script/subscriber.js

import { User } from './user.js';

/* 
========================================
STEP 1: SUBSCRIBER CLASS
Purpose:
- Extend User class
- Add pages, groups, and monetization capability
- Provide getters and helper methods
- getInfo() combines base User info with subscriber-specific data
*/
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

  // explicit getters
  getPages() { return [...this.#pages]; }
  getGroups() { return [...this.#groups]; }
  getCanMonetize() { return this.#canMonetize; }

  // getInfo combines base User info and subscriber info
  getInfo() {
    const base = super.getInfo();
    return {
      ...base,
      pages: [...this.#pages],
      groups: [...this.#groups],
      canMonetize: this.#canMonetize
    };
  }
};
