<!-- visualizzerà le carte -->
<template>
  <div class="card">
    <img :src="card.card_images[0].image_url" alt="Card image" />
    <h3>{{ card.name }}</h3>
    <p>{{ card.type }}</p>
    <p>{{ card.desc }}</p>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
/* Stile di base per le card */
.card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
}

.card img {
  width: 100%;
}
</style>
