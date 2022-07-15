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
            required
          />
        </div>
      </div>
      <div class="col-4">
        <div class="input-group mb-3">
          <label class="input-group-text">Harga (Rp. )</label>
          <input
            type="number"
            class="form-control"
            placeholder="10.000"
            v-model="size.dataPrice"
            required
          />
        </div>
      </div>
      <div class="col-4">
        <div class="input-group mb-3">
          <label class="input-group-text">Foto</label>

          <input
            type="file"
            class="form-control"
            ref="files"
            @change="onFileChange($event)"
            required
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["size", "formIndex"],
  methods: {
    async onFileChange(event) {
      let file = this.$refs.files.files[0];
      let base64 = await this.readRecord(file);

      this.$emit("sizePriceFormImageHandler", {
        index: this.$props.formIndex,
        fileInfo: file,
        base64: base64,
      });
    },
    readRecord(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        reader.onload = function (event) {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    },
  },
};
</script>

<style scoped>
</style>