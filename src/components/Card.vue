<template>
  <div class="col-md-3 mb-4">
    <div class="card h-100">
      <img :src="card.card_images[0].image_url" class="card-img-top" alt="Card image" />
      <div class="card-body">
        <h5 class="card-title">{{ card.name }}</h5>
        <!-- <p class="card-text">{{ card.race }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card']
};
</script>
