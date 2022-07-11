<template>
  <b-container class="wrapper mt-5">
    <div class="m-4">
      <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mt-2">
        <!-- Label dan Input Makanan -->
        <b-form-group
          id="input-group-2"
          label="Nama Makanan"
          label-for="recipeName"
          class="pt-3"
        >
          <b-form-input
            id="recipeName"
            v-model="form.recipeName"
            placeholder="Masukkan Nama Makanan"
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Deskripsi Makanan" label-for="recipeDescription">
          <b-form-textarea
            id="recipeDescription"
            v-model="form.recipeDescription"
            size="sm"
            placeholder="Makanan ini adalah makanan khas dari solo. Karakteristik makanan ini...."
          ></b-form-textarea>
        </b-form-group>

        <b-button @click="addSizePriceForm">Add Size</b-button>
        <SizePriceForm
          v-for="(formObject, index) in form.sizePriceForm"
          :key="index"
          :formInfo="formObject.info"
          :formData="formObject.dataForm"
        />

        <!-- Ingredients Makanan -->
        <b-form-group
          label="Ingredients Makanan"
          label-for="ingredientsMakanan"
          class="mt-5"
        >
          <b-form-input
            id="ingredientsMakanan"
            v-model="form.ingredientsList"
            placeholder="Masukkan Ingredients Makanan Dipisahkan Koma"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
export default {
  // Fetch a JSON data from backend
  async fetch() {
    const fetchData = await axios.get(
      `https://6b29a167-3f3e-45e8-83d9-043a5685490f.mock.pstmn.io/getMenuByRecipeID/${this.$route.params.foodID}`
    );
    // Get recipeName, recipeDescription, recipeImage, and all sizes
    this.form.recipeName = fetchData.data.recipeName;
    this.form.recipeDescription = fetchData.data.recipeDescription;
    this.form.image = fetchData.data.recipeDescription;
    const tempMenuList = Object.keys(fetchData.data.menuList);
    const tempPrice = [];
    const tempSizePriceForm = [];
    for (const element of tempMenuList) {
      tempPrice.push(fetchData.data.menuList[element].price);
    }
    console.log(tempPrice);
    const variantSizePrice = {
      info: {
        labelNameSize: "Size #" + 1,
        placeholderSize: "Small/Medium/Large",
        labelNamePrice: "Harga (Rp)",
        placeholderPrice: "10",
      },
      dataForm: {
        dataSize: "Super Large",
        dataPrice: 10,
      },
    };
    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
      
    // }
    // // for(const in )
    // this.form.sizePriceForm[0].dataForm = "";
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
            info: {
              labelNameSize: "Size #" + 1,
              placeholderSize: "Small/Medium/Large",
              labelNamePrice: "Harga (Rp)",
              placeholderPrice: "10",
            },
            dataForm: {
              dataSize: "Super Large",
              dataPrice: 10,
            },
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
        options: [],
        prices: {},
        ingredientsList: ingredientsList,
        sizePriceForm: this.sizePriceForm,
      };

      alert(JSON.stringify(data, null, 2));
      event.preventDefault();
      alert(JSON.stringify(data));
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
      // alert();
      this.sizePriceCount++;
      this.form.sizePriceForm.push({
        info: {
          labelNameSize: "Size #" + this.sizePriceCount,
          labelNamePrice: "Harga (Rp)",
          placeholderSize: "Small",
          placeholderPrice: "10",
        },
        dataForm: {},
      });
      console.log(this.form.sizePriceForm);
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