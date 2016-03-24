declare module 'vuex' {
  class Store {
    constructor(definition: {
      state: Object,
      mutations?: Array
    });
  }
}
