<template lang="pug">
.card.bg-dark.border-secondary
  .card-body
    b-form.text-left(@submit="prepareLink")
      h5 New link
      b-form-group(label="Name", size="sm")
        b-form-input(type="text", size="sm", v-model="link.name")
      b-form-group(label="URL")
        b-form-input(type="text", size="sm", v-model="link.url")
      b-button(type="submit", :disabled="notReady", variant="primary", size="sm") Add
      b-button.ml-2(variant="secondary", size="sm", @click="cancel") Discard
</template>

<script>
import { Link } from "@/helpers/classes";
import { BForm, BFormGroup, BFormInput, BButton } from "bootstrap-vue";
import { reactive, computed, toRefs } from "@vue/composition-api";
import { useURL } from "../composables/url";
import is from "@sindresorhus/is";
import { useActions } from "vuex-composition-helpers";

export default {
  name: "AddLink",
  props: {
    blockId: {
      type: String,
      required: true
    }
  },
  components: {
    BFormInput,
    BForm,
    BFormGroup,
    BButton
  },
  emit: ["done", "cancelled"],
  setup(props, { emit }) {
    const { addLink } = useActions(["addLink"]);

    const link = reactive({
      name: "",
      url: ""
    });

    const { url } = toRefs(link);

    const { isValidURL } = useURL(url);

    const notReady = computed(() => {
      return (
        is.emptyStringOrWhitespace(link.name) ||
        is.emptyStringOrWhitespace(link.url) ||
        !isValidURL.value
      );
    });

    function prepareLink() {
      addLink({
        blockId: props.blockId,
        link: new Link(link.name, link.url)
      });

      emit("done");
    }

    function cancel() {
      emit("cancelled");
    }

    return {
      link,
      notReady,
      prepareLink,
      cancel
    };
  }
};
</script>
