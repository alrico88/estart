export function genUIComputed(uiProp) {
  return {
    get() {
      return this.ui[uiProp];
    },
    set(value) {
      this.changeUI(uiProp, value);
    }
  };
}
