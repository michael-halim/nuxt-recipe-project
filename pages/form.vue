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

        <button type="submit" variant="primary">Submit</button>
        <button type="reset" variant="danger">Reset</button>
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
  // async fetch() {
  //   const fetchData = await axios.get(
  //     `https://6b29a167-3f3e-45e8-83d9-043a5685490f.mock.pstmn.io/getMenuByRecipeID/${this.$route.params.foodID}`
  //   );
  //   // Get recipeName, recipeDescription, recipeImage, and all sizes
  //   this.form.recipeName = fetchData.data.recipeName;
  //   this.form.recipeDescription = fetchData.data.recipeDescription;
  //   this.form.image = fetchData.data.recipeDescription;
  //   const tempMenuList = Object.keys(fetchData.data.menuList);
  //   const tempPrice = [];
  //   const tempSizePriceForm = [];
  //   for (const element of tempMenuList) {
  //     tempPrice.push(fetchData.data.menuList[element].price);
  //   }
  //   console.log(tempPrice);
  //   // const variantSizePrice = {
  //   //   info: {
  //   //     labelNameSize: "Size #" + 1,
  //   //     placeholderSize: "Small/Medium/Large",
  //   //     labelNamePrice: "Harga (Rp)",
  //   //     placeholderPrice: "10",
  //   //   },
  //   //   dataForm: {
  //   //     dataSize: "Super Large",
  //   //     dataPrice: 10,
  //   //   },
  //   // };
  //   // for (let index = 0; index < array.length; index++) {
  //   //   const element = array[index];

  //   // }
  //   // // for(const in )
  //   // this.form.sizePriceForm[0].dataForm = "";
  // },
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