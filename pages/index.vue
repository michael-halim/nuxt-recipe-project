<template>
  <div class="container">
    <!-- Add New Button Connects to Form Page -->
    <div class="row justify-content-end">
      <div class="col-3 m-3">
        <NuxtLink to="/form"
          ><button class="btn btn-success">Add New</button></NuxtLink
        >
      </div>
    </div>
    <!-- Food Card with Information -->
    <FoodCard
      v-cloak
      v-for="(item, index) in recipeList"
      :key="index"
      :item="item"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    // GET Base Link from store
    const BASE_LINK = this.$store.getters.getBaseLink();

    // FETCH Recipe Data to Get All Menu
    const fetchData = await axios.get(`${BASE_LINK}/recipe`);

    // FETCH Menu to Get All Menu Sizes
    const fetchSizePriceImage = await axios.get(`${BASE_LINK}/menu`);

    // DRILL Into Data and Put it to temp
    const tempRecipeList = fetchData.data.data;
    const tempSizePriceImage = fetchSizePriceImage.data.data;

    // GET Ingredient List and All Menu Sizes
    for (const element of tempRecipeList) {
      element.ingredient = element.ingredient.split(",");
      for (const elementSizePriceImage of tempSizePriceImage) {
        if (elementSizePriceImage.ID == element.ID) {
          element["menuSizePriceList"] = elementSizePriceImage.sizeList;
          break;
        }
      }
    }
    // Connect API to Frontend
    this.recipeList = tempRecipeList;
  },
  data() {
    return {
      recipeList: [],
    };
  },
  methods: {},
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
[v-cloak] {
  display: none;
}
</style>