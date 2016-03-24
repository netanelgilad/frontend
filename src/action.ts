let actions: Object = {};

export default function (name: string, cb?: Function): undefined | Function {
  if (cb) {
    actions[name] = cb;
  } else {
    return actions[name];
  }
}
