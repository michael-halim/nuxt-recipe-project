<template>
  <div class="container wrapper mt-5">
    <div class="m-4">
      <form @submit="onSubmit" @reset="onReset" class="mt-2">
        <div class="row">
          <!-- Label dan Input Makanan -->
          <div class="col-8">
            <label for="recipeName" class="form-label pt-4">Nama Makanan</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="recipeName"
                placeholder="Soto Banjar"
                v-model="form.recipeName"
                required
              />
            </div>
          </div>

          <!-- Label dan Input Foto Resep -->
          <div class="col-4">
            <div class="input-group mb-3 pt-2 mt-5">
              <label class="input-group-text">Foto</label>
              <input
                type="file"
                class="form-control"
                ref="recipeImageFiles"
                @change="recipeImageHandler($event)"
                required
              />
            </div>
          </div>
        </div>

        <!-- Label dan Deskripsi Makanan -->
        <label for="recipeDescription" class="form-label"
          >Deskripsi Makanan</label
        >
        <div class="input-group mb-3">
          <textarea
            type="text"
            class="form-control"
            id="recipeDescription"
            placeholder="Soto Bajar adalah makanan khas Banjar, duh"
            v-model="form.recipeDescription"
            required
          />
        </div>

        <!-- Label dan Ukuran Harga Foto Makanan yang Dinamis -->
        <button
          type="button"
          class="btn btn-secondary"
          @click="addSizePriceForm"
        >
          Add Size
        </button>
        <SizePriceForm
          v-for="(formObject, index) in form.sizePriceForm"
          :key="index"
          :size="formObject"
          :formIndex="index"
          @sizePriceFormImageHandler="sizePriceFormImageHandler"
        />

        <!-- Label dan Ingredient Makanan -->
        <label for="recipeIngredient" class="form-label"
          >Ingredient Makanan</label
        >
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="recipeIngredient"
            placeholder="Ingredients Makanan Dipisahkan koma"
            v-model="form.ingredientList"
            required
          />
        </div>

        <!-- Button Submit dan Reset -->
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="reset" class="btn btn-danger">Reset</button>
      </form>
      <div class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  // Fetch a JSON data from backend
  async fetch() {
    // If request coming from edit button
    if (this.$route.params.foodID !== undefined) {
      const BASE_LINK = this.$store.getters.getBaseLink();

      // FETCHING Data from API
      const fetchData = await axios.get(
        `${BASE_LINK}/menurecipe/${this.$route.params.foodID}`
      );

      // GET recipeName, recipeDescription, recipeImage, and all sizes
      const fetchObject = fetchData.data.data;

      this.form.recipeName = fetchObject.name;
      this.form.recipeDescription = fetchObject.desc;
      this.form.ingredientList = fetchObject.ingredient;

      // GET All Sizes from API
      const tempListSizePriceForm = [];
      for (const sizeObject of fetchObject.sizeList) {
        let tempSizePriceForm = {};
        tempSizePriceForm["dataSize"] = sizeObject.size.name;
        tempSizePriceForm["dataPrice"] = sizeObject.price;
        tempSizePriceForm["dataImage"] = sizeObject.imgFileName;
        tempListSizePriceForm.push(tempSizePriceForm);
      }
      this.form.sizePriceForm = tempListSizePriceForm;
    }
  },
  data() {
    return {
      form: {
        recipeName: null,
        recipeDescription: null,
        image: {
          imgFileName: null,
          pic: null,
        },
        ingredientList: "",
        sizePriceForm: [
          {
            dataSize: null,
            dataPrice: null,
            dataImage: {
              imgFileName: null,
              pic: null,
            },
          },
        ],
      },
      sizePriceCount: 1,
    };
  },
  methods: {
    onSubmit(event) {
      // IF Submit button is clicked
      // PREVENT Reload Default Browser
      event.preventDefault();

      // TOKENIZE IngredientList by ,
      const ingredientList = this.form.ingredientList.split(",");
      console.log(this.form);

      // alert(this.form);
      // alert(this.form.recipe);
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
    async recipeImageHandler(event) {
      let file = this.$refs.recipeImageFiles.files[0];
      let base64 = await this.readRecord(file);
      this.form.image.imgFileName = file.name;
      this.form.image.pic = this.formatBase64(base64);
    },
    sizePriceFormImageHandler({ index, fileInfo, base64 }) {
      this.form.sizePriceForm[index].dataImage.imgFileName = fileInfo.name;
      this.form.sizePriceForm[index].dataImage.pic = this.formatBase64(base64);
    },
    onReset(event) {
      // RESET All Input Form

      // PREVENT Default Browser Reload
      event.preventDefault();

      // Reset our form values

      this.form.recipeName = null;
      this.form.recipeDescription = null;
      this.form.ingredientList = null;
      this.form.image = {
        imgFileName: null,
        pic: null,
      };
      this.form.sizePriceForm = [
        {
          dataSize: null,
          dataPrice: null,
          dataImage: {
            imgFileName: null,
            pic: null,
          },
        },
      ];
      this.sizePriceCount = 1;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    formatBase64(str) {
      return str.replace(/^data:image\/[a-z]+;base64,/, "");
    },
    addSizePriceForm() {
      // ADD Dynamically Data, Price, and Image Form
      this.form.sizePriceForm.push({
        dataSize: null,
        dataPrice: null,
        dataImage: {
          imgFileName: null,
          pic: null,
        },
      });
    },
  },
};
</script>
<style scoped>
.wrapper {
  border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>