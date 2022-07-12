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
            v-model="formObject.dataSize"
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
            v-model="formObject.dataPrice"
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
  <!-- <b-form inline class="mt-4">
    <b-form-group :label="formInfo.labelNameSize" label-for="size" class="mr-3">
      <b-form-input
        id="size"
        :placeholder="formInfo.placeholderSize"
        class="ml-3"
        v-model="formData.dataSize"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      :label="formInfo.labelNamePrice"
      label-for="hargaMakanan1"
      class="mr-3"
    >
      <b-form-input
        id="hargaMakanan1"
        :placeholder="formInfo.placeholderPrice"
        class="ml-3"
        v-model="formData.dataPrice"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="input-group-2"
      label="Foto"
      label-for="fotoMakanan"
      class="ml-3"
      ><b-form-file
        id="fotoMakanan"
        class="ml-3"
        v-model="formInfo.image"
        :state="Boolean(formInfo.image)"
        placeholder="Pilih Foto Makanan"
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </b-form-group>
  </b-form> -->
</template>

<script>
export default {
  props: ["formObject"],
};
</script>

<style scoped>
</style>