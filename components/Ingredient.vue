<template>
  <ul>
    <li v-for="(singleIngredient, index) in item.ingredient" :key="index">
      {{ singleIngredient }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  list-style-type: none;
}
</style>