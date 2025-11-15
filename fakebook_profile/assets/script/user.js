// assets/script/subscriber.js

import { User } from './user.js';

/* 
========================================
STEP 1: SUBSCRIBER CLASS
Purpose:
- Extend User class
- Add followers, following, and premium status
- Provide method to get combined info
*/
export class Subscriber extends User {
  #followers;
  #following;
  #isPremium;

  constructor(id, name, userName, email, followers = [], following = [], isPremium = false) {
    super(id, name, userName, email);
    this.#followers = followers;
    this.#following = following;
    this.#isPremium = isPremium;
  }

  // explicit getters
  getFollowers() { return this.#followers; }
  getFollowing() { return this.#following; }
  getIsPremium() { return this.#isPremium; }

  // getInfo includes base User info + Subscriber info
  getInfo() {
    return {
      ...super.getInfo(),
      followers: this.#followers,
      following: this.#following,
      isPremium: this.#isPremium
    };
  }
}
