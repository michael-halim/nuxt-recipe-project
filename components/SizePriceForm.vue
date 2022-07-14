<template>
  <div class="input-group mb-3 mt-3">
    <div class="row">
      <div class="col-4">
        <div class="input-group mb-3">
          <label class="input-group-text">Size</label>
          <input
            type="text"
            class="form-control"
            placeholder="Small"
            v-model="size.dataSize"
          />
        </div>
      </div>
      <div class="col-4">
        <div class="input-group mb-3">
          <label class="input-group-text">Harga</label>
          <input
            type="number"
            class="form-control"
            placeholder="10000"
            v-model="size.dataPrice"
          />
        </div>
      </div>
      <div class="col-4">
        <div class="input-group mb-3">
          <label class="input-group-text">Foto</label>
          <input type="file" class="form-control" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["size"],
};
</script>

<style scoped>
</style>