<template lang="pug">
.container.pb-3
  .row.mb-3
    .col
      h4.fw-bolder.mb-0 Backup / Restore
  .row.row-cols-1.row-cols-md-2.mb-4.g-3
    .col
      h5 Export
      .vstack.gap-3
        .text-muted Export your links data to a file to import it in another browser or computer or as backup
        b-form-textarea(v-model="dataToExport", readonly, :rows="10")
        .hstack.gap-2
          copy-to-clip(:to-copy="dataToExport")
          b-button(variant="success", @click="saveToFile")
            icon(name="bi:download")
            |
            | Export to file
        export-remote(:data="dataToExport")
    .col
      h5 Import
      .vstack.gap-3
        .text-muted Restore your saved links. WARNING: Importing will overwrite local data
        b-form-textarea(
          v-model="dataToImport",
          :rows="10",
          :placeholder="isOverDropZone ? 'Drop the file' : 'Paste from the clipboard or drag a file over here'",
          ref="dropzoneRef"
        )
        div
          b-alert.d-block(:model-value="importSuccess", variant="success") Imported successfully
          b-alert.d-block(:model-value="remoteSuccess", variant="success") Got data from remote. Click on "Import data" to apply changes
          b-button(
            variant="success",
            @click="importData",
            :disabled="importDisabled"
          )
            icon(name="bi:upload")
            |
            | Import data
  .row
    .col
      h5 Reset
      confirm-delete(
        text="Delete all blocks",
        filled,
        @delete="deleteAllLinks"
      )
</template>

<script setup lang="ts">
import { useLinksStore } from "~~/stores/links";
import { Formatter } from "fracturedjsonjs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { readAsText } from "promise-file-reader";
import is from "@sindresorhus/is";

const { $client } = useNuxtApp();

useSeoMeta({
  title: "Backup and restore - estart",
});

const linksStore = useLinksStore();

// Export

const dataToExport = computed(
  () => new Formatter().Serialize(linksStore.data) as string
);

function saveToFile() {
  saveAs(
    new Blob([dataToExport.value]),
    `estart-backup-${dayjs().format("YYYYMMDD")}.txt`
  );
}

// Import

const dataToImport = ref("");
const importSuccess = refAutoReset(false, 3000);

function importData(): void {
  try {
    const parsed = JSON.parse(dataToImport.value);
    linksStore.clearAllData();
    linksStore.data = parsed;

    importSuccess.value = true;
  } catch (err) {
    console.error(err);
  }
}

const importDisabled = computed(() => dataToImport.value === "");

async function onDrop(file: File[] | null): Promise<void> {
  if (!file) {
    return;
  }

  dataToImport.value = await readAsText(file[0]);
}

const dropzoneRef = ref<HTMLDivElement | null>(null);

const { isOverDropZone } = useDropZone(dropzoneRef, onDrop);

const remoteSuccess = ref(false);

const route = useRoute();

async function loadToImport() {
  if (is.nonEmptyString(route.query.id)) {
    try {
      const response = await $client.getFromStore.query(route.query.id);

      if (response.success) {
        dataToImport.value = response.data as string;

        remoteSuccess.value = true;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

onMounted(loadToImport);

// Reset

function deleteAllLinks(): void {
  linksStore.data = [];
}
</script>
