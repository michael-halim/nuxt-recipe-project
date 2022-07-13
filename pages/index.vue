<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-3 m-3">
        <NuxtLink to="/form"
          ><button class="btn btn-success">Add New</button></NuxtLink
        >
      </div>
    </div>
    <Food v-for="(item, index) in recipeList" :key="index" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    const BASE_LINK =
      "https://9ebbb237-28df-45d9-a23d-66a0f8e360e6.mock.pstmn.io";

    const fetchData = await axios.get(`${BASE_LINK}/recipe`);

    const fetchSizePriceImage = await axios.get(`${BASE_LINK}/menu`);

    const tempRecipeList = fetchData.data.data;
    const tempSizePriceImage = fetchSizePriceImage.data.data;

    for (const element of tempRecipeList) {
      element.ingredient = element.ingredient.split(",");
      for (const elementSizePriceImage of tempSizePriceImage) {
        if (elementSizePriceImage.ID == element.ID) {
          element["menuSizePriceList"] = elementSizePriceImage.sizeList;
          break;
        }
      }
    }
    this.recipeList = tempRecipeList;

    // this.menuList = fetchData.data.completedRecipeList;
  },
  data() {
    return {
      selectedSize: "small",
      selectedId: 1,
      recipeList: [],
    };
  },
  methods: {
    changeSelected(data) {
      console.log(data[0]);
      console.log(data[1]);
    },
  },
};
</script>

<style>
img {
  max-height: 200px;
  margin: auto;
  display: block;
  border-radius: 16px;
  margin-bottom: 2rem;
}
.card-body {
  border: none;
}
</style>