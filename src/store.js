export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get togglers() {
    return this.controller.togglers;
  }

  get openedTogglers() {
    return this.controller.openedTogglers;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  load() {
    let ids = this.constructor.load(this.key);
    if (!ids) return;

    let idSet = new Set(ids);
    this.togglers.forEach(toggler => {
      let content = this.controller.findContent(toggler);
      if (idSet.has(this.controller.getID(toggler))) {
        this.controller.show(toggler, content)
      } else {
        this.controller.hide(toggler, content);
      }
    });
  }

  save() {
    let ids = this.openedTogglers.map(toggler => this.controller.getID(toggler));
    this.constructor.save(this.key, ids);
  }

  static load(key) {
    if (!key) return;
    let json = sessionStorage.getItem(key);
    try {
      return JSON.parse(json)
    } catch {
      return null;
    }
  }

  static save(key, value) {
    if (!key) return;
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
