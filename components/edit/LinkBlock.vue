<template lang="pug">
.card(:style="{borderColor: color}")
  .card-body
    .hstack.gap-2.align-items-center.mb-3
      drag-handle
      c-form-input(type="color", v-model="color")
      input.form-control(type="text", v-model="title", placeholder="Block Title")
      confirm-delete(
        text="Delete block",
        @delete="linksStore.deleteBlockById(id)"
      )
    table.table.table-sm.table-bordered.align-middle.mb-0
      thead.bg-dark
        tr
          th
          th(:colspan="2") URL
          th Name
      template(v-if="links.length === 0")
        tbody
          tr
            td.text-center(:colspan="4") 
              .vstack.gap-2
                div
                  icon(name="ic:outline-playlist-remove", size="50px")
                div No links in block
      template(v-else)
        draggable(
          v-model="links", 
          tag="tbody", 
          item-key="id",
          handle=".column-drag-handle"
        )
          template(#item="{element}")
            edit-link-item(
              :block-id="id",
              :id="element.id",
              v-model:name="element.name",
              v-model:url="element.url"
            )
  .card-footer(:style="{backgroundColor: color}")
    .hstack.gap-2
      button.w-100.btn.btn-sm.btn-link.text-decoration-none(
        @click="linksStore.addLinkToBlock(id)",
        :disabled="hasInvalidLink",
        :style="addLinkStyle"
      ) #[icon(name="bi:plus")] Add new link to {{ title }}
        
</template>

<script setup lang="ts">
import { Link } from "~~/models/Link";
import { useLinksStore } from "~~/stores/links";
import { CFormInput } from "@coreui/bootstrap-vue";
import draggable from "vuedraggable";
import type { StyleValue } from "vue";
import is from "@sindresorhus/is";

const props = defineProps<{
  id: string;
  index: number;
  color: string;
  title: string;
  links: Link[];
}>();

const { color, title, links } = useVModels(props);

const linksStore = useLinksStore();

const hasInvalidLink = computed(() =>
  props.links.some((d) => {
    return is.emptyString(d.name) || is.emptyString(d.url);
  })
);

const addLinkStyle = computed<StyleValue>(() => {
  return {
    color: `${getGoodContrastLinkColor(props.color)} !important`,
  };
});
</script>
