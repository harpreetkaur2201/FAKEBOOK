// assets/script/user.js
export class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  // explicit getters required by the assignment
  getId() { return this.#id; }
  getName() { return this.#name; }
  getUserName() { return this.#userName; }
  getEmail() { return this.#email; }

  // getInfo returns an object with the 4 required fields
  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      userName: this.#userName,
      email: this.#email
    };
  }
}
