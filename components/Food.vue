<template>
  <div class="container">
    <div class="card mb-3 wrapper" style="max-width: 90%">
      <div class="row">
        <div class="col-md-3">
          <div class="row">
            <h5 class="card-title ml-3 mt-3 text-center">
              {{ item.name }}
            </h5>
          </div>
          <div v-if="this.imgFileName != null">
            <img :src="this.imgFileName" alt="" />
          </div>
          <div v-else>
            <img :src="item.imgFileName" alt="" />
          </div>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <div class="row">
              <div class="col-3 mt-3">
                <p class="card-text">
                  {{ item.desc }}
                </p>
              </div>
              <div class="col-6 mt-3">
                <div class="row border-right">
                  <div class="col-6">
                    <div class="input-group mb-3">
                      <button
                        v-for="size in item.menuSizePriceList"
                        :key="size.sizeID"
                        @click="changeSize(item.ID, size.sizeID, item)"
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        {{ size.sizeName }}
                      </button>
                    </div>
                  </div>
                  <div class="col-6 mt-1">
                    <h5>
                      Rp.
                      <span v-if="this.price != null">
                        {{ this.price }}
                      </span>
                      <span v-else>
                        {{ item.menuSizePriceList[0].price }}
                      </span>
                    </h5>
                  </div>
                </div>
                <div class="row mt-5 mb-2">
                  <div class="col-4">
                    <NuxtLink to="/form">
                      <button
                        class="btn btn-outline-secondary btn-sm w-100"
                        type="button"
                      >
                        Edit
                      </button>
                    </NuxtLink>
                  </div>
                  <div class="col-8">
                    <button
                      class="btn btn-outline-secondary btn-sm w-100"
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-3 mt-3">
                <h5>Ingredients</h5>
                <ul>
                  <li
                    v-for="(singleIngredient, index) in item.ingredient"
                    :key="index"
                  >
                    {{ singleIngredient }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: null,
      imgFileName: null,
    };
  },
  props: ["options", "item", "selectedSize", "name"],
  methods: {
    changeSize(menuID, sizeID, item) {

      if (menuID == item.ID) {
        console.log(item.menuSizePriceList);
        for (const sizePriceObject of item.menuSizePriceList) {
          if (sizePriceObject.sizeID == sizeID) {
            this.price = sizePriceObject.price;
            this.imgFileName = sizePriceObject.imgFileName;
          }
        }
      }
    },
    changeSelected(size) {
      this.item.prices = this.item.prices[size];
    },
  },
};
</script>

<style scoped>
.ingredients-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
img {
  margin-bottom: 2rem;
  display: block;
  border-radius: 16px;
  max-width: 200px;
}
.wrapper {
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.wrapper:hover {
  box-shadow: -2px 0px 78px -35px rgba(0, 0, 0, 0.75);
  transition: 0.3s ease-in-out;
  padding: 1rem;
}
ul {
  padding: 0;
}
li {
  list-style-type: none;
}
</style>