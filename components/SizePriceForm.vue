<template>
  <div class="input-group mb-3 mt-3">
    <div class="row sizePriceWrapper">
      <div class="row mb-3">
        <div class="col-1">
          <button
            type="button"
            class="btn btn-danger btn-sm w-100"
            @click="$emit('deleteSizeHandler', { formIndex: formIndex })"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
          </button>
        </div>
      </div>
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
            type="text"
            class="form-control"
            placeholder="10.000"
            v-model="size.dataPrice"
            @keyup="formatNumberHandler"
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
      <div class="col-1">
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
    formatNumberHandler() {
      // REMOVE Non Number
      this.$props.size.dataPrice = this.$props.size.dataPrice.replace(
        /[^0-9]/g,
        ""
      );
      // REMOVE Leading Zero
      this.$props.size.dataPrice = this.$props.size.dataPrice.replace(
        /^0+/,
        ""
      );
      // RE-FORMAT Number
      this.$props.size.dataPrice = this.$store.getters.formatNumber(
        this.$props.size.dataPrice.replace(/\./g, "")
      );
      console.log(event);
    },
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