<template>
  <nuxt-link :to="{ name: 'form', params: { foodID: itemID } }">
    <button class="btn btn-outline-secondary btn-sm w-100" type="button">
      Edit
    </button>
  </nuxt-link>
</template>

<script>
export default {
  props: ["itemID"],
};
</script>

<style scoped>
</style>