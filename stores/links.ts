import { Block } from "~~/models/Block";
import { Link } from "~~/models/Link";
import { find, remove } from "lodash-es";

export const useLinksStore = defineStore("linksStore", {
  state: () => {
    return {
      data: [] as Block[],
    };
  },
  actions: {
    clearAllData() {
      this.data = [];
    },
    addBlock() {
      this.data.push(new Block());
    },

    addLinkToBlock(blockId: string) {
      this.data
        .find((d) => d.id === blockId)
        ?.links.push(new Link("", "https://"));
    },

    deleteBlockById(blockId: string) {
      remove(this.data, (d) => d.id === blockId);
    },

    deleteLinkById(blockId: string, linkId: string) {
      const block = find(this.data, (d) => d.id === blockId);

      if (!block) {
        return;
      }

      remove(block.links, (d) => d.id === linkId);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
