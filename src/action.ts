let actions = {}

export default function (name, cb) {
  if (cb) {
    actions[name] = cb
  } else {
    return actions[name]
  }
}
