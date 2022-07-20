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
              v-model="order.selectedRecipeID"
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
                v-for="(option, index) in menuOption"
                :key="index"
                :value="option.ID"
                :data-menuOptionIndex="index"
                :data-menuOptionID="option.ID"
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
                  v-model="order.selectedSizeID"
                >
                  <option disabled selected hidden value="">Pilih Size</option>
                  <option
                    v-for="(option, index) in sizeOption"
                    :key="option.sizeID"
                    :value="option.sizeID"
                    :data-sizeOptionIndex="index"
                    :data-sizeOptionID="option.sizeID"
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
                v-model="order.selectedQty"
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
                @click="onDelete"
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
          <div
            class="col-12"
            v-if="order.selectedPrice !== null && order.selectedQty !== null"
          >
            <h5>
              Rp.
              {{
                this.$store.getters.formatNumber(
                  this.$props.order.selectedPrice *
                    this.$props.order.selectedQty
                )
              }}
            </h5>
          </div>
        </div>
      </div>
      <!-- Preview Image -->
      <div class="col-4" v-if="order.selectedImgFileName !== null">
        <img :src="order.selectedImgFileName" alt="" />
      </div>
      <div class="col-4" v-else-if="sizePreviewImage !== null">
        <img :src="sizePreviewImage" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    if (this.$route.params.transactionID !== undefined) {
      // SAVE Size Option
      this.fetchSize();
    }
  },
  data() {
    return {
      sizePreviewImage: null,
      sizeOption: [],
      selectedMenuIndex: null,
    };
  },
  props: ["orderIndex", "order", "menuOption"],
  methods: {
    async fetchSize() {
      // GET Base Link from store
      const BASE_LINK = this.$store.getters.getBaseLink();

      // FETCH Data from backend to get sizeList
      let fetchData = await axios.get(
        `${BASE_LINK}/menurecipe/${this.$props.order.selectedRecipeID}`
      );
      fetchData = fetchData.data.data;

      // GET Image URL to Props
      this.$props.order.selectedImgFileName = fetchData.imgFileName;

      // COMBINE Necessary Data
      const tempListSizeObject = [];
      for (const sizeObject of fetchData.sizeList) {
        let tempSizeObject = {};
        tempSizeObject["price"] = sizeObject.price;
        tempSizeObject["size"] = sizeObject.size.name;
        tempSizeObject["imgFileName"] = sizeObject.imgFileName;
        tempSizeObject["sizeID"] = sizeObject.size.ID;
        tempSizeObject["menuID"] = sizeObject.ID;
        tempListSizeObject.push(tempSizeObject);
      }
      this.sizeOption = tempListSizeObject;
    },
    async onMenuChange(event) {
      // Event Handler for Changing Menu Option

      // RESET Size, Qty, and Price
      this.sizeSelected = null;
      this.selectedSizeIndex = null;

      this.$props.order.selectedSize = null;
      this.$props.order.selectedSizeID = null;
      this.$props.order.selectedPrice = null;
      this.$props.order.selectedQty = null;
      this.$props.order.selectedMenuID = null;

      // GET Recipe Name to Props
      this.$props.order.selectedRecipeName = event.target
        .querySelector(
          "option[value='" + this.$props.order.selectedRecipeID + "']"
        )
        .innerHTML.trim();

      // GET Menu Index (Differ than menuID)
      this.selectedMenuIndex = event.target
        .querySelector(
          "option[value='" + this.$props.order.selectedRecipeID + "']"
        )
        .getAttribute("data-menuOptionIndex");

      // FETCH Size from API
      this.fetchSize();

      // RESTART Preview Image when Choosing Size
      this.sizePreviewImage = null;
    },
    onDelete() {
      this.$emit("deleteOrderHandler", {
        propsOrder: this.$props.order,
        orderIndex: this.$props.orderIndex,
      });
    },
    changeSize($event) {
      // Event Handler for Changing Size Option

      // GET Selected Size Index
      this.selectedSizeIndex = $event.target
        .querySelector(
          "option[value='" + this.$props.order.selectedSizeID + "']"
        )
        .getAttribute("data-sizeOptionIndex");

      // Update Props Selected Size, Price, menuID, and Image
      this.$props.order.selectedSize =
        this.sizeOption[this.selectedSizeIndex].size;

      this.$props.order.selectedPrice =
        this.sizeOption[this.selectedSizeIndex].price;

      this.$props.order.selectedImgFileName =
        this.sizeOption[this.selectedSizeIndex].imgFileName;

      this.$props.order.selectedMenuID =
        this.sizeOption[this.selectedSizeIndex].menuID;

      // SET Specific Image when Choosing Size
      this.sizePreviewImage =
        this.sizeOption[this.selectedSizeIndex].imgFileName;

      // SET Qty to 1 whenever Choose Size
      this.$props.order.selectedQty = 1;
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