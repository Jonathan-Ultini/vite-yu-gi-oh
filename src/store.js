import { reactive } from 'vue';
import axios from 'axios'; // Importiamo Axios

// Creiamo un oggetto reattivo per lo stato
const state = reactive({
  cards: [],      // Stato delle carte
  loading: false, // Stato di caricamento
});

// Funzione per caricare le carte dall'API
const fetchCards = async () => {
  state.loading = true; // Impostiamo loading su true prima della chiamata
  try {
    const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0');

    // Axios converte automaticamente la risposta in JSON, quindi possiamo accedere ai dati direttamente
    state.cards = response.data.data;
  } catch (error) {
    console.error('Errore nel caricamento delle carte:', error);
  } finally {
    state.loading = false; // Impostiamo loading su false alla fine
  }
};

// Esportiamo lo store
export function useCardStore() {
  return {
    state,
    fetchCards,
  };
}
