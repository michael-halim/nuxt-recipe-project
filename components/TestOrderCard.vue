<template>
  <div class="card mb-3 mt-5 wrapper" style="max-width: 95%">
    <div class="row">
      <div class="col-8">
        <!-- Option Menu -->
        <div class="m-3">
          <div class="form-floating">
            <select
              class="form-select"
              @change="onMenuChange"
              v-model="order.selectedRecipeIndex"
            >
              <option
                v-if="order.selectedRecipe === null"
                disabled
                selected
                hidden
                value=""
              >
                Pilih Menu
              </option>
              <option
                v-for="(option, index) in order.menuOption"
                :key="index"
                :value="option.name"
                :data-menuOptionIndex="index"
                @click="clickMenuOptionHandler"
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
                  v-model="order.selectedSize"
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
        <img :src="order.menuOption[selectedMenuIndex].imgFileName" alt="" />
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
  data() {
    return {
      sizeSelected: null,
      sizePreviewImage: null,
      sizeOption: [],
      qty: null,
      selectedSizeIndex: null,
      selectedMenuIndex: null,
    };
  },
  props: ["orderID", "menuOption", "menuIndex", "order"],
  methods: {
    async onMenuChange(event) {
      // Event Handler for Changing Menu Option
      // console.log("Event Target");
      // console.log(event.target);
      // console.log(
      //   event.target
      //     .querySelector(
      //       "option[value='" + this.$props.order.selectedRecipeIndex + "']"
      //     )
      //     .getAttribute("data-menuOptionIndex")
      // );
      // RESET Size, Qty, and Price
      this.sizeSelected = null;
      this.qty = null;
      this.selectedSizeIndex = null;

      // GET Menu Index (Differ than menuID)
      //TODO: FIND ANOTHER WAY TO GET VMODEL WORKING IN MENU OPTION
      this.selectedMenuIndex = event.target
        .querySelector(
          "option[value='" + this.$props.order.selectedRecipeIndex + "']"
        )
        .getAttribute("data-menuOptionIndex");

      console.log("SELECTED MENU INDEX");
      console.log(this.selectedMenuIndex);

      // GET Base Link from store
      const BASE_LINK = this.$store.getters.getBaseLink();

      // FETCH Data from backend to get sizeList
      let fetchData = await axios.get(
        `${BASE_LINK}/menurecipe/${
          this.$props.order.menuOption[this.selectedMenuIndex].ID
        }`
      );
      fetchData = fetchData.data.data;
      // console.log("FETCH DATA");
      // console.log(fetchData);
      // COMBINE Necessary Data
      const tempListSizeObject = [];
      for (const sizeObject of fetchData.sizeList) {
        let tempSizeObject = {};
        tempSizeObject["price"] = sizeObject.price;
        tempSizeObject["size"] = sizeObject.size.name;
        tempSizeObject["imgFileName"] = sizeObject.imgFileName;
        tempSizeObject["sizeID"] = sizeObject.size.ID;
        tempListSizeObject.push(tempSizeObject);

        // Update Props Selected Price, Size, Image, and Size ID
        // this.$props.order.selectedPrice = sizeObject.price;
        // this.$props.order.selectedSize = sizeObject.size.name;
        // this.$props.order.selectedImgFileName = sizeObject.imgFileName;
        // this.$props.order.selectedSizeID = sizeObject.size.ID;
      }
      // Update Props Selected Recipe
      // this.$props.selectedIndex = $event.target.value;
      // this.$props.order.selectedRecipe =
      //   this.$props.order.menuOption[$event.target.value].name;

      // SAVE Size Option
      this.sizeOption = tempListSizeObject;
      // RESTART Preview Image when Choosing Size
      this.sizePreviewImage = null;
      // console.log(tempListSizeObject);
    },
    clickMenuOptionHandler(event) {
      alert();
      this.selectedMenuIndex = event.target.getAttribute(
        "data-menuOptionIndex"
      );
      console.log("SELECTED MENU INDEX");
      console.log(this.selectedMenuIndex);
    },
    onDelete(orderID) {
      // Update Props Selected Qty
      // this.$props.order.selectedQty = this.qty;
      this.$emit("deleteOrderHandler", this.$props.order);

      // this.sizeSelected = null;
      // this.sizePreviewImage = null;
      // this.sizeOption = [];
      // this.selectedSizeIndex = null;
      // this.selectedMenuIndex = null;
      // this.qty = null;
    },
    changeSize($event) {
      // Event Handler for Changing Size Option
      // this.selectedSizeIndex = $event.target.value;
      // // SET Specific Image when Choosing Size
      // this.sizePreviewImage =
      //   this.sizeOption[this.selectedSizeIndex].imgFileName;
      // // SET Qty to 1 whenever Choose Size
      // this.qty = 1;
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