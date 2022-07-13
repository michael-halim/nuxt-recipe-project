<template>
  <div class="container wrapper mt-5">
    <div class="m-4">
      <form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-2">
        <!-- Label dan Input Makanan -->
        <label for="recipeName" class="form-label pt-4">Nama Makanan</label>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="recipeName"
            v-model="form.recipeName"
          />
        </div>

        <label for="recipeDescription" class="form-label"
          >Deskripsi Makanan</label
        >
        <div class="input-group mb-3">
          <textarea
            type="text"
            class="form-control"
            id="recipeDescription"
            v-model="form.recipeDescription"
          />
        </div>

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
          :formObject="formObject"
        />

        <label for="recipeIngredient" class="form-label"
          >Deskripsi Makanan</label
        >
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            id="recipeIngredient"
            placeholder="Ingredients Makanan Dipisahkan koma"
            v-model="form.ingredientsList"
          />
        </div>

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
    const BASE_LINK =
      "https://9ebbb237-28df-45d9-a23d-66a0f8e360e6.mock.pstmn.io";
    const fetchData = await axios.get(
      `${BASE_LINK}/recipe/${this.$route.params.foodID}/`
    );
    // Get recipeName, recipeDescription, recipeImage, and all sizes
    this.form.recipeName = fetchData.data.name;
    this.form.recipeDescription = fetchData.data.desc;
    this.form.ingredientsList = fetchData.data.ingredient;
  },
  data() {
    return {
      form: {
        recipeName: "",
        recipeDescription: "",
        image: null,
        ingredientsList: "",
        sizePriceForm: [
          {
            dataSize: null,
            dataPrice: null,
            dataImage: null,
          },
        ],
      },
      sizePriceCount: 1,

      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      const ingredientsList = this.form.ingredientsList.split(",");
      let data = {
        id: Math.floor((1 + Math.random()) * 0x10000).toString(16),
        recipeName: this.form.recipeName,
        sizePriceForm: [
          {
            dataSize: "Super Large",
            dataPrice: 10,
          },
        ],
        ingredientsList: ingredientsList,
        sizePriceForm: this.sizePriceForm,
      };

      alert(JSON.stringify(data, null, 2));
      event.preventDefault();
      alert(JSON.stringify(data));
      alert(this.form);
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.recipeName = "";
      this.form.recipeDescription = "";
      this.form.ingredientsList = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    addSizePriceForm() {
      this.form.sizePriceForm.push({ dataSize: null, dataPrice: null });
      // console.log(this.form.sizePriceForm);
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