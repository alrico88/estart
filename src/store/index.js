import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { Encryptor } from "@/helpers/encryption";
import { arrayMoveImmutable } from "array-move";

const encryptor = new Encryptor();

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    blocks: [],
    editing: false,
    ui: {
      bordered: false,
      shadowed: false,
      favicon: false,
      clock: true,
      search: true,
      openInNewTab: true,
      bodyColor: "#212121",
      fontFamily: "",
      backgroundImage: ""
    }
  },
  getters: {
    getBlocksHash: state => () => {
      return encryptor.encrypt(state.blocks);
    },
    isCustomFont(state) {
      return state.ui.fontFamily !== "";
    }
  },
  mutations: {
    changeEditing(state, editingStatus) {
      state.editing = editingStatus;
    },
    changeBlocks(state, blocks) {
      state.blocks = blocks;
    },
    changeUI(state, ui) {
      state.ui = ui;
    }
  },
  actions: {
    toggleEditing({ commit, state }) {
      commit("changeEditing", !state.editing);
    },
    addBlock({ commit, state }, newBlock) {
      const blocks = [...state.blocks, newBlock];
      commit("changeBlocks", blocks);
    },
    removeBlock({ commit, state }, blockId) {
      const blockPos = state.blocks.findIndex(d => d.id === blockId);
      const blocksCopy = [...state.blocks];
      blocksCopy.splice(blockPos, 1);
      commit("changeBlocks", blocksCopy);
    },
    changeBlockTitle({ commit, state }, { blockId, title }) {
      const blocksCopy = [...state.blocks];
      const blockPos = blocksCopy.findIndex(d => d.id === blockId);
      if (blockPos !== -1) {
        blocksCopy[blockPos].title = title;
      }
      commit("changeBlocks", blocksCopy);
    },
    addLink({ commit, state }, { blockId, link }) {
      const blocksCopy = [...state.blocks];
      const blockPos = blocksCopy.findIndex(d => d.id === blockId);
      if (blockPos !== -1) {
        blocksCopy[blockPos].links.push(link);
      }
      commit("changeBlocks", blocksCopy);
    },
    deleteLink({ commit, state }, { blockId, linkId }) {
      const blocksCopy = [...state.blocks];
      const blockPos = blocksCopy.findIndex(d => d.id === blockId);
      if (blockPos !== -1) {
        const linkPos = blocksCopy[blockPos].links.findIndex(
          d => d.id === linkId
        );
        if (linkPos !== -1) {
          blocksCopy[blockPos].links.splice(linkPos, 1);
        }
      }
      commit("changeBlocks", blocksCopy);
    },
    importBlocks({ commit }, hash) {
      try {
        const decoded = encryptor.decrypt(hash);

        commit("changeBlocks", decoded);

        return true;
      } catch (err) {
        return false;
      }
    },
    updateUI({ commit, state }, { element, value }) {
      const style = state.ui;

      const newStyle = {
        ...style,
        [element]: value
      };

      commit("changeUI", newStyle);
    },
    moveLink({ commit, state }, { blockId, currentIndex, direction }) {
      const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      const blocksCopy = [...state.blocks];
      const blockPos = blocksCopy.findIndex(d => d.id === blockId);
      if (blockPos !== -1) {
        blocksCopy[blockPos].links = arrayMoveImmutable(
          blocksCopy[blockPos].links,
          currentIndex,
          newIndex
        );
      }

      commit("changeBlocks", blocksCopy);
    }
  },
  plugins: [vuexLocal.plugin]
});
