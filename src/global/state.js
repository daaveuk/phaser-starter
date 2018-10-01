import { get, debounce } from 'lodash';

export default class State {
  constructor(key, scene) {
    this.state = [];
    this.key = key;
    this.scene = scene;
  }

  get(key) {
    return this.state[key];
  }

  set(key, value) {
    this.state[key] = value;

    this.syncToWindow();
  }

  syncToWindow() {
    if (typeof window.states !== 'undefined') {
      window.states[this.key] = this.state;
      // console.log('Saved to window');
    } else {
      window.states = {};
      //      this.syncToWindow();
    }
  }

  save() {
    const { list } = this.scene.make.displayList;

    for (let i = 0; i < list.length; i++) {
      let obj = list[i];
      obj = obj.toJSON();
      this.state.push(obj);
    }
    let stringState = JSON.stringify(this.state);
    localStorage.setItem(this.key, stringState);
  }

  load(key) {
    let state = localStorage.getItem(this.key);
    this.state = JSON.parse(state);
  }
}
