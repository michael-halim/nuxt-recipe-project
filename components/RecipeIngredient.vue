<template>
  <div>
    <li
      v-for="(data, index) in dataInput"
      id="recipe-list"
      :key="index"
      @click="getIndex(index)"
    >
      {{ data }}
    </li>
  </div>
</template>

<script>
export default {
  props: ["dataInput"],
  methods: {
    getIndex(index) {
      this.$emit("changeIndex", index);
    },
  },
};
</script>

<style scoped>
li {
  color: rgb(96, 96, 96);
  font-size: larger;
  cursor: pointer;
}
ul li {
  text-decoration: underline rgb(128, 128, 128);
}
</style>