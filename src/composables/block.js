import { computed } from "@vue/composition-api";

export function useBlockUI(ui) {
  const cardClasses = computed(() => {
    {
      const { shadowed, bordered, alignment } = ui.value;

      const classes = [`text-${alignment}`];

      if (shadowed) {
        classes.push("shadow");
      }

      if (bordered) {
        classes.push("border-secondary");
      }

      return classes;
    }
  });

  return {
    cardClasses
  };
}
