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
              />
            </div>
          </div>

          <!-- Label dan Input Foto Resep -->
          <div class="col-4">
            <div class="input-group mb-3 pt-2 mt-5">
              <label class="input-group-text">Foto</label>
              <input type="file" class="form-control" />
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
      const BASE_LINK =
        "https://9ebbb237-28df-45d9-a23d-66a0f8e360e6.mock.pstmn.io";

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
        recipeName: "",
        recipeDescription: "",
        image: null,
        ingredientList: "",
        sizePriceForm: [
          {
            dataSize: null,
            dataPrice: null,
            dataImage: null,
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
      // alert(this.form);
      // alert(this.form.recipe);
    },
    onReset(event) {
      // RESET All Input Form

      // PREVENT Default Browser Reload
      event.preventDefault();

      // Reset our form values
      this.form.recipeName = "";
      this.form.recipeDescription = "";
      this.form.ingredientList = "";
      this.form.sizePriceForm = [
        {
          dataSize: null,
          dataPrice: null,
          dataImage: null,
        },
      ];
      this.sizePriceCount = 1;

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    addSizePriceForm() {
      // ADD Dynamically Data, Price, and Image Form
      this.form.sizePriceForm.push({
        dataSize: null,
        dataPrice: null,
        dataImage: null,
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