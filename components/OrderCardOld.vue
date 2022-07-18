<template>
  <div class="card mb-3 mt-5 wrapper" style="max-width: 95%">
    <div class="row">
      <div class="col-8">
        <!-- Option Menu -->
        <div class="m-3">
          <div class="form-floating">
            <select class="form-select" @change="onMenuChange">
              <option disabled selected hidden value="">Pilih Menu</option>
              <option
                v-for="(option, index) in menuOption"
                :key="option.ID"
                :value="index"
                @click="sizeSelected = undefined"
              >
                {{ option.name }}
              </option>
            </select>
            <label>Menu</label>
          </div>
        </div>

        <div class="row">
          <!-- Option Size -->
          <div class="col-6">
            <div class="m-3">
              <div class="form-floating">
                <select
                  class="form-select"
                  @change="changeSize"
                  v-model="sizeSelected"
                >
                  <option disabled selected hidden value="">Pilih Size</option>
                  <option
                    v-for="(option, index) in sizeOption"
                    :key="option.sizeID"
                    :value="index"
                    @click="sizeSelected = option.size"
                  >
                    {{ option.size }}
                  </option>
                </select>
                <label>Size</label>
              </div>
            </div>
          </div>

          <!-- Option Quantity -->
          <div class="col-3">
            <div class="form-floating m-3">
              <input
                type="number"
                min="1"
                class="form-control"
                placeholder="10"
                v-model="qty"
              />
              <label>Quantity</label>
            </div>
          </div>

          <!-- Delete Button -->
          <div class="col-3">
            <div class="mt-4">
              <button
                type="button"
                class="btn btn-danger w-40"
                @click="onDelete(orderID)"
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
                &nbsp; Delete
              </button>
            </div>
          </div>
        </div>
        <div class="row m-3">
          <div class="col-3" v-if="selectedSizeIndex !== null">
            <h5>
              Rp.
              {{ formatNumber(sizeOption[selectedSizeIndex].price * qty) }}
            </h5>
          </div>
        </div>
      </div>

      <!-- Preview Image -->
      <div
        class="col-4"
        v-if="sizePreviewImage == null && selectedMenuIndex !== null"
      >
        <img :src="menuOption[selectedMenuIndex].imgFileName" alt="" />
      </div>
      <div class="col-4" v-else>
        <img :src="sizePreviewImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    const BASE_LINK = this.$store.getters.getBaseLink();

    const fetchData = await axios.get(`${BASE_LINK}/recipe`);
    const tempMenuOption = [];
    for (const fetchObject of fetchData.data.data) {
      let tempData = {};
      tempData["ID"] = fetchObject.ID;
      tempData["name"] = fetchObject.name;
      tempData["imgFileName"] = fetchObject.imgFileName;
      tempMenuOption.push(tempData);
    }
    this.menuOption = tempMenuOption;
  },
  data() {
    return {
      sizeSelected: undefined,
      sizePreviewImage: null,
      menuOption: [],
      sizeOption: [],
      qty: null,
      selectedSizeIndex: null,
      selectedMenuIndex: null,
    };
  },
  props: ["orderID"],
  methods: {
    async onMenuChange($event) {
      // Event Handler for Changing Menu Option

      // RESET Size, Qty, and Price
      this.sizeSelected = undefined;
      this.qty = undefined;
      this.selectedSizeIndex = null;

      // GET Menu Index (Differ than menuID)
      this.selectedMenuIndex = $event.target.value;

      // GET Base Link from store
      const BASE_LINK = this.$store.getters.getBaseLink();

      // FETCH Data from backend to get sizeList
      let fetchData = await axios.get(
        `${BASE_LINK}/menurecipe/${this.menuOption[$event.target.value].ID}`
      );

      fetchData = fetchData.data.data;

      // COMBINE Necessary Data
      const tempListSizeObject = [];
      for (const sizeObject of fetchData.sizeList) {
        let tempSizeObject = {};
        tempSizeObject["price"] = sizeObject.price;
        tempSizeObject["size"] = sizeObject.size.name;
        tempSizeObject["imgFileName"] = sizeObject.imgFileName;
        tempSizeObject["sizeID"] = sizeObject.size.ID;
        tempListSizeObject.push(tempSizeObject);
      }

      // SAVE Size Option
      this.sizeOption = tempListSizeObject;

      // RESTART Preview Image when Choosing Size
      this.sizePreviewImage = null;
      // console.log(tempListSizeObject);
    },
    onDelete(orderID) {
      this.sizeSelected = undefined;
      this.sizePreviewImage = null;
      this.menuOption = [];
      this.sizeOption = [];
      this.qty = null;
      this.selectedSizeIndex = null;
      this.selectedMenuIndex = null;
      this.$emit("deleteOrderHandler", orderID);
    },
    changeSize($event) {
      // Event Handler for Changing Size Option

      this.selectedSizeIndex = $event.target.value;

      // SET Specific Image when Choosing Size
      this.sizePreviewImage =
        this.sizeOption[this.selectedSizeIndex].imgFileName;

      // SET Qty to 1 whenever Choose Size
      this.qty = 1;
    },
    formatNumber(x) {
      // FORMAT number . every 3 digit from behind
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style scoped>
.wrapper {
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
img {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: block;
  border-radius: 16px;
  max-width: 200px;
}
</style>