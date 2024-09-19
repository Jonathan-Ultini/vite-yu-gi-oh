<template>
  <div class="mb-3">
    <label for="archetypeSelect" class="form-label">Seleziona Archetipo:</label>
    <select id="archetypeSelect" class="form-select" v-model="selected" @change="updateFilter">
      <option value="">Tutti gli Archetipi</option>
      <option v-for="archetype in archetypes" :key="archetype" :value="archetype">
        {{ archetype }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  emits: ['filterSelected'],
  setup(props, { emit }) {
    const archetypes = ref([]);
    const selected = ref('');

    // Carica gli archetipi all'avvio
    const fetchArchetypes = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/archetypes.php');
        archetypes.value = response.data.map(archetype => archetype.archetype_name);
      } catch (error) {
        console.error('Errore durante il caricamento degli archetipi:', error);
      }
    };

    const updateFilter = () => {
      emit('filterSelected', selected.value);
    };

    onMounted(fetchArchetypes);

    return {
      archetypes,
      selected,
      updateFilter
    };
  }
};
</script>

<style scoped></style>
