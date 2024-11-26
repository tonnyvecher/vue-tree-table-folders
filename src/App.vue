<template>
  <div class="app">
    <button class="app__btn--open" @click="openModal">Открыть</button>
    <Modal v-model="isOpen" @select="selectHandler" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Modal from "./components/Modal.vue";

const isOpen = ref(false);

const selectHandler = (id: string) => {
  alert(`ID papki: ${id}`);
};

const openModal = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #dcbdff, #ffffff);
  min-height: 100dvh;
  padding: 20px;
  display: grid;
  place-items: center;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-size: 20px;
}

.app__btn--open {
  margin: 0 auto;
  padding-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
