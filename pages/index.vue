<template>
  <div class="container">
    <div class="mt-3 text-right">
      <NuxtLink to="/form"
        ><button class="btn btn-success">Add New</button></NuxtLink
      >
    </div>
    <Food v-for="(item, index) in recipeList" :key="index" :item="item" />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    const BASE_LINK =
      "https://6da944a7-8028-4ad0-a7bd-351470a5016a.mock.pstmn.io";

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

    console.log("TEST");
    console.log(tempRecipeList);
    console.log("RECIPE LIST");
    console.log(tempRecipeList.menuSizePriceList[0]);
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