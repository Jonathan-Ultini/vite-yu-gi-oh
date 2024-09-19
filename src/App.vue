<template>
  <div id="app" class="container">
    <Loader v-if="loading" />
    <CardList v-else :cards="cards" />
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import CardList from './components/CardList.vue';
import Loader from './components/Loader.vue';
import { store } from './store';  // Importa lo store

export default {
  components: {
    CardList,
    Loader
  },
  setup() {
    const loading = ref(true);
    const cards = ref([]);

    const fetchCards = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0');
        store.cards = response.data.data;  // Salva nello store
        cards.value = store.cards;  // Assegna i dati reattivi alle cards
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        loading.value = false;  // Termina il caricamento
      }
    };

    onMounted(fetchCards);  // Chiama l'API quando il componente è montato

    return {
      loading,
      cards
    };
  }
};
</script>
