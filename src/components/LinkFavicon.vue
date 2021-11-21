<template lang="pug">
b-avatar.mr-1(
  :src="faviconSrc",
  :text="textFallback",
  :size="20",
  variant="dark"
)
</template>

<script>
import { BAvatar } from "bootstrap-vue";
import { computed } from "@vue/composition-api";

export default {
  props: {
    link: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  components: {
    BAvatar
  },
  setup(props) {
    const faviconSrc = computed(() => {
      let favicon;

      try {
        const asURL = new URL(props.link);
        favicon = `https://icons.duckduckgo.com/ip3/${asURL.hostname}.ico`;
      } catch (e) {
        favicon = null;
      }

      return favicon;
    });

    const textFallback = computed(() => {
      return props.name.split(" ").reduce((str, word, index) => {
        if (index < 2) {
          str += word.charAt(0);
        }

        return str;
      }, "");
    });

    return {
      faviconSrc,
      textFallback
    };
  }
};
</script>
