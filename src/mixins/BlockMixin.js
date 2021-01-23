import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["ui"]),
    cardClasses() {
      const classes = [];
      const ui = this.ui;

      if (ui.shadowed) {
        classes.push("shadow");
      }

      if (ui.bordered) {
        classes.push("border-secondary");
      }

      return classes;
    }
  }
};
