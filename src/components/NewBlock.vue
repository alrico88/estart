<template lang="pug">
  .card.h-100(:class="cardClasses")
    .card-body.text-center(v-if="ready")
      b-form(v-if="ready", @submit="createBlock")
        b-form-group(label="Block title")
          b-form-input.border-secondary(type="text", v-model="title")
        b-form-group(label="Block color")
          b-form-input.border-secondary(type="color", v-model="color")
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
import { mapActions } from "vuex";
import { Block } from "@/helpers/classes";
import BlockMixin from "@/mixins/BlockMixin";

export default {
  name: "NewBlock",
  components: {
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BIconPlusCircle
  },
  mixins: [BlockMixin],
  data() {
    return {
      ready: false,
      title: "",
      color: "#FFFFFF"
    };
  },
  computed: {
    cantSubmit() {
      return this.title === "";
    }
  },
  methods: {
    ...mapActions(["addBlock"]),
    getReady() {
      this.ready = true;
    },
    createBlock() {
      const blockToCreate = new Block();
      blockToCreate.title = this.title;
      blockToCreate.color = this.color;
      this.addBlock(blockToCreate);
      this.resetFields();
    },
    resetFields() {
      this.title = "";
      this.color = "#FFFFFF";
      this.ready = false;
    }
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
