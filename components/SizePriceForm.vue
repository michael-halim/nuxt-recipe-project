<template>
  <div class="input-group mb-3 mt-3">
    <div class="row sizePriceWrapper">
      <div class="col-3">
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
      <div class="col-3">
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
          />
        </div>
      </div>
      <div class="col-2">
        <img
          v-if="changedFileURL === null"
          class="previewImage"
          :src="size.dataImage.imgURL"
          alt=""
        />
        <img v-else :src="changedFileURL" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changedFileURL: null,
    };
  },
  props: ["size", "formIndex"],
  methods: {
    async onFileChange(event) {
      let file = this.$refs.files.files[0];
      let base64 = await this.readRecord(file);

      // PREVIEW UPLOADED URL
      this.changedFileURL = URL.createObjectURL(file);

      // EMIT Uploaded Image
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
.previewImage {
  max-width: 100px;
}
.sizePriceWrapper {
  padding-top: 2rem;
  border-radius: 16px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}
</style>