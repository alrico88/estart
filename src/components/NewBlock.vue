<template lang="pug">
.card.h-100(:class="cardStyle")
  .card-body.text-center(v-if="ready")
    b-form(v-if="ready", @submit.prevent="createBlock")
      b-form-group(label="Block title")
        b-form-input.border-secondary(type="text", v-model="block.title")
      b-form-group(label="Block color")
        b-form-input.border-secondary(type="color", v-model="block.color")
      b-button(type="submit", :disabled="cantSubmit", variant="primary") Add block
  .card-body.text-center(v-else)
    a(href="#", @click.prevent="getReady")
      .row.h-100.align-items-center
        .col
          b-icon-plus-circle.text-white(:font-scale="2")
</template>

<script>
import {
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BIconPlusCircle
} from "bootstrap-vue";
import { Block } from "@/helpers/classes";
import { ref, reactive, computed } from "@vue/composition-api";
import { useActions, useState } from "vuex-composition-helpers";
import is from "@sindresorhus/is";
import { useBlockUI } from "../composables/block";

export default {
  name: "NewBlock",
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BIconPlusCircle
  },
  setup() {
    const { addBlock } = useActions(["addBlock"]);
    const { ui } = useState(["ui"]);

    const { cardStyle } = useBlockUI(ui);

    const block = reactive({
      title: "",
      color: "#FFFFFF"
    });
    const ready = ref(false);

    function getReady() {
      ready.value = true;
    }

    function resetFields() {
      block.title = "";
      block.color = "";
      ready.value = false;
    }

    function createBlock() {
      const blockToCreate = new Block();
      blockToCreate.title = block.title;
      blockToCreate.color = block.color;

      addBlock(blockToCreate);
      resetFields();
    }

    const cantSubmit = computed(() => is.emptyStringOrWhitespace(block.title));

    return {
      block,
      ready,
      getReady,
      createBlock,
      cantSubmit,
      cardStyle
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #2e2e2e;
  border-radius: 6px;
  .card-body {
    padding: 15px 15px;
  }

  h5 {
    margin: 15px;
  }
}
</style>
