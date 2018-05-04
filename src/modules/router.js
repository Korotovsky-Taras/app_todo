export class Router {

  constructor() {
    this.routes = {};
    this.current = null;
  }

  register(path, view) {
    this.routes[path] = view;
  }

  go(path) {
    this.routes[path].render()
  }

  start() {
    for (let path in this.routes) {
      // console.log(path)
    }
  }

}
