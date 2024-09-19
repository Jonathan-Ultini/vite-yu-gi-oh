<template>
  <div class="row">
    <Card v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  props: ['cards'],
  components: {
    Card
  }
};
</script>
