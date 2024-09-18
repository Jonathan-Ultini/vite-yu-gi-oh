import { reactive } from 'vue';

// Creiamo un oggetto reattivo per lo stato
const state = reactive({
  cards: [],      // Stato delle carte
  loading: false, // Stato di caricamento
});

// Funzione per caricare le carte dall'API
const fetchCards = async () => {
  state.loading = true; // Impostiamo loading su true prima della chiamata
  try {
    const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=0', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella chiamata API');
    }

    const data = await response.json();
    state.cards = data.data; // Aggiorniamo le carte con i dati ricevuti dall'API
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
