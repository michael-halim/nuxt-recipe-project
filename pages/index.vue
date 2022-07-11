<template>
  <div class="container">
    <div class="mt-3 text-right">
      <NuxtLink to="/form"
        ><button class="btn btn-success">Add New</button></NuxtLink
      >
    </div>
    <!-- <Food
      v-for="(item, index) in menuList"
      :options="item.options"
      :key="index"
      :selectedSize="selectedSize"
      :item="item"
      :name="item.recipeName"
      @changeSelected="changeSelected($event)"
    /> -->
    <Food
      v-for="(item, index) in menuList"
      :key="index"
      :selectedSize="selectedSize"
      :item="item"
      :name="item.recipeName"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    const fetchData = await axios.get(
      `https://a0e81161-50f5-45f1-9944-3c1bd5be6108.mock.pstmn.io/menu`
    );
    console.log(fetchData.data.menuList);
    this.menuList = fetchData.data.menuList;
    // this.menuList = fetchData.data.completedRecipeList;
  },
  data() {
    return {
      selectedSize: "small",
      selectedId: 1,
      menuList: [],
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
.image-wrapper {
  position: relative;
}
img {
  max-height: 200px;
  margin: auto;
  display: block;
  border-radius: 16px;
}
.card-body {
  border: none;
}
</style>