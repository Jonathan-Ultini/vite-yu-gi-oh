<template>
  <div>
    <h3>Totale carte trovate: {{ total }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
div {
  font-size: 1.1rem;
  color: #333;
}
</style>
