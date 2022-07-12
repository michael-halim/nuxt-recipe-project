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
    const fetchData = await axios.get(
      `https://6ea94281-1e3f-4004-af53-301c09084e22.mock.pstmn.io/recipe`
    );

    const fetchSizePriceImage = await axios.get(
      `https://6ea94281-1e3f-4004-af53-301c09084e22.mock.pstmn.io/menu`
    );

    const tempRecipeList = fetchData.data.recipeList;
    const tempSizePriceImage = fetchSizePriceImage.data.menuList;

    for (const element of tempRecipeList) {
      element.ingredient = element.ingredient.split(",");
      for (const elementSizePriceImage of tempSizePriceImage) {
        if (elementSizePriceImage.recipeID == element.ID) {
          element["menuSizePriceList"] =
            elementSizePriceImage.menuSizePriceList;
        }
      }
    }
    this.recipeList = tempRecipeList;

    console.log(tempRecipeList);
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