<template lang="pug">
.container
  .row.mb-3
    .col
      h4.fw-bolder.mb-0 Backup / Restore
  .row.row-cols-1.row-cols-sm-2.mb-4.g-3
    .col
      h5 Export
      .vstack.gap-3
        .text-muted Export your links data to a file to import it in another browser or computer or as backup
        textarea.form-control(v-model="dataToExport", readonly, :rows="10")
        .hstack.gap-2
          button.btn.btn-primary(@click="() => copy(dataToExport)")
            icon(name="bi:clipboard") 
            |  {{ copied ? 'Copied' : 'Copy' }} to clipboard
          button.btn.btn-success(@click="saveToFile")
            icon(name="bi:download")
            |  Export to file
    .col
      h5 Import
      .vstack.gap-3
        .text-muted Restore your saved links. WARNING: Importing will overwrite local data
        textarea.form-control(
          v-model="dataToImport",
          :rows="10", 
          :placeholder="isOverDropZone ? 'Drop the file' : 'Paste from the clipboard or drag a file over here'",
          ref="dropzoneRef"
        )
        div
          template(v-if="importSuccess")
            .alert.alert-success.d-block(v-if="importSuccess") Imported successfully
          template(v-else)
            button.btn.btn-success(@click="importData", :disabled="importDisabled")
              icon(name="bi:upload")
              |  Import data
  .row
    .col
      h5 Reset
      confirm-delete(text="Delete all blocks", filled, @delete="deleteAllLinks")
</template>

<script setup lang="ts">
import { useLinksStore } from "~~/stores/links";
import { Formatter } from "fracturedjsonjs";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { readAsText } from "promise-file-reader";

useHead({
  title: "Backup and restore - estart",
});

const linksStore = useLinksStore();

// Export

const dataToExport = computed(() => {
  return new Formatter().Serialize(linksStore.data) as string;
});

const { copied, copy } = useClipboard();

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

// Reset

function deleteAllLinks(): void {
  linksStore.data = [];
}
</script>
