<template>
  <div class="container">
    <div class="card mb-3 wrapper" style="max-width: 90%">
      <div class="row">
        <div class="col-md-3">
          <div class="row">
            <h5 class="card-title ml-3 mt-3 text-center">
              {{ item.recipeName }}
            </h5>
          </div>
          <img
            src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/5/27/5b48f41c-fd76-4809-bee3-4f6cf623fe9e.jpg"
            alt=""
          />
          <!-- <img :src="item.menuList[selectedSize].image" alt="" /> -->
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <div class="row">
              <div class="col-3 mt-3">
                <p class="card-text">
                  {{ item.recipeDescription }}
                </p>
              </div>
              <div class="col-6 mt-3">
                <div class="row border-right">
                  <div class="col-6">
                    <div class="input-group mb-3">
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        Small
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        Medium
                      </button>
                      <button
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        Large
                      </button>
                    </div>
                  </div>
                  <div class="col-6 mt-1">
                    <h5>Rp. 10000</h5>
                  </div>
                </div>
                <div class="row mt-5 mb-2">
                  <div class="col-4">
                    <button
                      class="btn btn-outline-secondary btn-sm w-100"
                      type="button"
                    >
                      Edit
                    </button>
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
                  <li>a</li>
                  <li>b</li>
                  <li>c</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <container class="bv-example-row wrapper mt-3">
    <row>
      <div>
        <row class="mt-3 mb-1 ml-1">
          <h5>{{ item.recipeName }}</h5>
        </row>
        <row class="image-wrapper mb-3">
          <img :src="item.menuList[selectedSize].image" alt="" />
        </row>
      </div>

      <div class="mt-5">{{ item.recipeDescription }}</div>
      <div class="mt-5 ml-3 mr-2">
        <div class="border-right">
          <row>
            <form-group>
              <form-radio-group
                id="btn-radios-2"
                v-model="selectedSize"
                @click="changeSelected(selectedSize)"
                :options="options"
                button-variant="outline-primary"
                size="sm"
                name="radio-btn-outline"
                buttons
              ></form-radio-group>
            </form-group>
            <h5 class="ml-4 mr-3">
              Rp. {{ item.menuList[selectedSize].price }}
            </h5>
          </row>
          <row class="mt-5 mr-2 mb-4">
            <div class="col-4">
              <nuxt-link
                :to="{ name: 'form', params: { foodID: item.recipeID } }"
                class="btn-block"
                ><button variant="outline-info">Edit</button></nuxt-link
              >
            </div>
            <div class="col-8">
              <button variant="outline-primary">Add to Cart</button>
            </div>
          </row>
        </div>
      </div>

      <div class="mt-5">
        <h5>Ingredients</h5>
        <ul
          class="ingredients-list"
          v-for="ingredients in item.recipeIngredients"
          :key="ingredients"
        >
          <li>{{ ingredients }}</li>
        </ul>
      </div>
    </row>
  </container> -->
</template>

<script>
export default {
  props: ["options", "item", "selectedSize", "name"],
  methods: {
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