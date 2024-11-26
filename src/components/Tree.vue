<template>
  <div class="tree">
    <details class="tree-details" :open="isOpen">
      <summary
        class="tree-summary"
        :class="{ 'tree-summary--clickable': item.children.length }"
        @click.stop="toggleOpen"
      >
        <button
          class="tree-row__btn--add"
          :class="{ active: selectedFolder?.id === item.id }"
          @click.stop="onChoose"
        >
          ✔
        </button>
        <span class="tree-row__name">{{ level }} {{ item.name }}</span>
      </summary>
      <div class="tree-children" v-if="item.children.length">
        <Tree
          v-model="selectedFolder"
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :level="level.length + 1"
        />
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import type { TreeType } from "@/stores/tree";
import { computed, ref } from "vue";

const isOpen = ref(true);
const props = defineProps(["item", "level"]);
const selectedFolder = defineModel<TreeType | null>();

const onChoose = () => {
  selectedFolder.value =
    selectedFolder.value?.id === props.item.id ? null : props.item;
};

const level = computed(() =>
  Array.from({ length: props.level })
    .map(() => "-")
    .join("")
);

const toggleOpen = () => {
  if (!level) return;

  isOpen.value = !isOpen.value;
};
</script>
<style scoped>
.tree-details {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  background-color: #f9f9f9;
  transition: box-shadow 0.3s ease;
}

.tree-details[open] {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tree-summary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.tree-summary--clickable:hover {
  background-color: #e9e9e9;
}

.tree-row__btn--add {
  padding: 5px 10px;
  border: 1px solid #ccc;
}

.tree-row__btn--add.active {
  background-color: #4cba76;
  color: white;
  border-color: #4cba76;
}

.tree-row__name {
  flex: 1;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-children {
  margin-left: 20px;
  padding-left: 10px;
  border-left: 2px solid #ddd;
}
</style>
