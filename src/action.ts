let actions: Object = {};

export function Action(name: string, cb?: Function): undefined | Function {
  if (cb) {
    actions[name] = cb;
  } else {
    return actions[name];
  }
}
