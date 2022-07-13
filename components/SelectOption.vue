<template>
  <div class="form-floating">
    <select class="form-select">
      <option disabled selected hidden value="">{{ label }}</option>
      <option
        v-for="option in optionData"
        :key="option.ID"
        :value="option.name"
        @change="changeOptionHandler(option.ID)"
      >
        {{ option.name }}
      </option>
    </select>
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["label", "optionData"],
  methods: {
    changeOptionHandler(event) {
      alert();
      this.$emit("changeOptionHandler", optionID);
    },
  },
};
</script>

<style scoped>
</style>