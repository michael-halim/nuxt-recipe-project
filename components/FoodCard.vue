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
                    <EditButton :itemID="item.ID" />
                  </div>
                  <AddToCartButton />
                </div>
              </div>
              <div class="col-3 mt-3">
                <h5>Ingredients</h5>
                <Ingredient :item="item" />
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
        for (const sizePriceObject of item.menuSizePriceList) {
          if (sizePriceObject.sizeID == sizeID) {
            this.price = sizePriceObject.price;
            this.imgFileName = sizePriceObject.imgFileName;
          }
        }
      }
    },
    formatNumber(x) {
      // Function to Format Number to separate number with 3 digits
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
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
</style>