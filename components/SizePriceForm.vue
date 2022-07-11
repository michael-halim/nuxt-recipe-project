<template>
  <b-form inline class="mt-4">
    <b-form-group
      :label="formInfo.labelNameSize"
      label-for="sizeMakanan1"
      class="mr-3"
    >
      <b-form-input
        id="sizeMakanan1"
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
  </b-form>
</template>

<script>
export default {
  props: ["formInfo", "formData"],
};
</script>

<style scoped>
</style>