<template>
  <div id="app" class="container">
    <!-- Filtro per Archetipi e Numero Totale di Carte -->
    <div class="row align-items-center mb-3">
      <div class="col">
        <!-- Filtro per Archetipi -->
        <Filter @filterSelected="fetchCardsByArchetype" />
      </div>
      <div class="col text-end">
        <!-- Numero Totale di Carte -->
        <ResultCount :total="cards.length" />
      </div>
    </div>

    <!-- Loader o Lista di Carte -->
    <Loader v-if="loading" />
    <CardList v-else :cards="cards" />
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import Filter from './components/Filter.vue';
import CardList from './components/CardList.vue';
import Loader from './components/Loader.vue';
import ResultCount from './components/ResultCount.vue';
import { store } from './store';

export default {
  components: {
    Filter,
    CardList,
    Loader,
    ResultCount
  },
  setup() {
    const loading = ref(true);
    const cards = ref([]);

    // Funzione per ottenere tutte le carte
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0');
        store.cards = response.data.data;
        cards.value = store.cards;
      } catch (error) {
        console.error('Errore durante il caricamento delle carte:', error);
      } finally {
        loading.value = false;
      }
    };

    // Funzione per ottenere carte filtrate per archetipo
    const fetchCardsByArchetype = async (archetype) => {
      loading.value = true;
      try {
        let url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
        if (archetype) {
          url += `?archetype=${archetype}`;
        } else {
          url += '?num=20&offset=0';
        }

        const response = await axios.get(url);
        cards.value = response.data.data;
      } catch (error) {
        console.error('Errore durante il caricamento delle carte filtrate:', error);
      } finally {
        loading.value = false;
      }
    };

    // Carica carte all'avvio
    onMounted(fetchCards);

    return {
      loading,
      cards,
      fetchCardsByArchetype
    };
  }
};
</script>
