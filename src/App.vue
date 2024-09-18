<template>
  <div id="app">
    <h1>Yu-Gi-Oh! Cards</h1>

    <!-- Loader -->
    <Loader v-if="state.loading" />

    <!-- Se non stiamo caricando, mostra le card -->
    <div v-if="!state.loading" class="card-container">
      <Card v-for="card in state.cards" :key="card.id" :card="card" />
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Card from './components/Card.vue';
import Loader from './components/Loader.vue';
import { useCardStore } from './store'; // Importiamo lo store

export default {
  components: {
    Card,
    Loader,
  },
  setup() {
    const { state, fetchCards } = useCardStore(); // Usiamo lo store

    onMounted(() => {
      fetchCards(); // Chiamata API al montaggio del componente
    });

    return {
      state, // Restituiamo lo stato reattivo
    };
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
