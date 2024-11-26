<template>
  <div class="app-modal-backdrop" v-if="isOpen">
    <div class="app-modal-content">
      <div class="app-modal-tree">
        <Tree
          v-model="selectedFolder"
          v-for="item in tree.list"
          :key="item.id"
          :item="item"
        />
      </div>
      <div class="app-modal__footer">
        <button @click="onOK" :disabled="!selectedFolder">OK</button>
        <button @click="onClose">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTreeStore, type TreeType } from "../stores/tree";
import Tree from "./Tree.vue";

const tree = useTreeStore();
const isOpen = defineModel();

const selectedFolder = ref<TreeType | null>(null);

const emit = defineEmits(["select"]);

const onOK = () => {
  if (!selectedFolder.value) return;

  isOpen.value = false;
  emit("select", selectedFolder.value.id);
};

const onClose = () => {
  isOpen.value = false;
};
</script>

<style scoped>
.app-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  justify-content: center;
  align-items: center;
}

.app-modal-content {
  padding: 40px;
  border-radius: 40px;
  max-width: 780px;
  text-align: center;
  background: #ffe0f5;
  border-radius: 8px;
  display: grid;
  gap: 40px;
}

.app-modal__footer {
  display: flex;
  justify-content: space-evenly;
}
button {
  padding: 5px 10px;
  font-size: 20px;
  border: 1px solid #bfa7c8;
}
</style>
