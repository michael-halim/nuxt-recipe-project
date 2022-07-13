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
          <img :src="item.imgFileName" alt="" />
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
                        :key="size.size.ID"
                        @click="changeSize(item.ID, size.size.ID, item)"
                        class="btn btn-outline-secondary btn-sm"
                        type="button"
                      >
                        {{ size.size.name }}
                      </button>
                    </div>
                  </div>
                  <div class="col-6 mt-1">
                    <h5>
                      Rp.
                      <span v-if="this.price != null">
                        {{ formatNumber(this.price) }}
                      </span>
                      <span v-else>
                        {{ formatNumber(item.menuSizePriceList[0].price) }}
                      </span>
                    </h5>
                  </div>
                </div>
                <div class="row justify-content-start">
                  <div v-if="this.imgFileName != null" class="col-3">
                    <img class="previewImage" :src="this.imgFileName" alt="" />
                  </div>
                  <div v-else class="col-3">
                    <img class="previewImage" :src="item.imgFileName" alt="" />
                  </div>
                </div>
                <div class="row mt-5 mb-2">
                  <div class="col-4">
                    <nuxt-link
                      :to="{ name: 'form', params: { foodID: item.ID } }"
                    >
                      <button
                        class="btn btn-outline-secondary btn-sm w-100"
                        type="button"
                      >
                        Edit
                      </button>
                    </nuxt-link>
                  </div>
                  <div v-if="!isInCart" class="col-8">
                    <button
                      class="btn btn-outline-secondary btn-sm w-100"
                      type="button"
                      @click="addedToCart"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div v-else class="col-8">
                    <div class="row">
                      <div class="col-6 ml-5">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="deleteItemInCart"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path
                              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          @click="minusItemCart"
                          class="btn btn-danger btn-sm"
                        >
                          -
                        </button>
                        <span style="font-weight: bold">{{ qty }}</span>
                        <button
                          type="button"
                          @click="addItemCart"
                          class="btn btn-success btn-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
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
      isInCart: false,
      qty: 0,
    };
  },
  props: ["options", "item", "selectedSize", "name"],
  methods: {
    changeSize(menuID, sizeID, item) {
      if (menuID == item.ID) {
        for (const sizePriceObject of item.menuSizePriceList) {
          if (sizePriceObject.sizeID == sizeID) {
            this.price = sizePriceObject.price;
            this.imgFileName = sizePriceObject.imgFileName;
          }
        }
      }
    },
    addedToCart() {
      this.qty++;
      this.isInCart = true;
    },
    deleteItemInCart() {
      this.qty = 0;
      this.isInCart = false;
    },
    addItemCart() {
      this.qty++;
    },
    minusItemCart() {
      this.qty--;
      if (this.qty <= 0) {
        this.isInCart = false;
      }
    },
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
.previewImage {
  max-width: 80px;
}
.wrapper {
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  border: none;
}
.wrapper:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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