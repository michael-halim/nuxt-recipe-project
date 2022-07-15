<template>
  <div class="container">
    <button class="btn btn-success mt-3" @click="addOrderHandler">
      Add New
    </button>
    <div class="row">
      <div class="col-8">
        <!-- <OrderCard
          v-for="(order, index) in orderList"
          :key="index"
          :orderID="order.id"
          @deleteOrderHandler="deleteOrderHandler($event)"
        /> -->
        <TestOrderCard
          v-for="(order, index) in orderList"
          :key="index"
          :order="order"
          :menuIndex="index"
          @deleteOrderHandler="deleteOrderHandler"
        />
      </div>
      <div class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ orderList }}</pre>
      </div>
      <div class="col-4 wrapperSubTotal">
        <h3 class="m-3">Subtotal Rp. 10000</h3>
        <button type="button" class="btn btn-success m-3">Checkout</button>
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
    this.initMenuOption = tempMenuOption;
    this.orderList[0].menuOption = this.initMenuOption;

    console.log("INIT MENU OPTION");
    console.log(this.initMenuOption);

    console.log("order LIST");
    console.log(this.orderList[0].menuOption);
    // console.log("MENU OPTION");
    // console.log(this.menuOption);
    // console.log(this.menuOption[0].name);
  },
  data() {
    return {
      initMenuOption: [],
      orderCount: 1,
      orderList: [
        {
          menuOption: [],
          selectedIndex: null,
          selectedRecipeIndex: null,
          selectedPrice: null,
          selectedSize: null,
          selectedQty: null,
          selectedImgFileName: null,
          selectedSizeID: null,
        },
      ],
    };
  },
  methods: {
    addOrderHandler() {
      this.orderCount++;
      this.orderList.push({
        menuOption: this.initMenuOption,
        selectedIndex: null,
        selectedRecipeIndex: null,
        selectedPrice: null,
        selectedSize: null,
        selectedQty: null,
        selectedImgFileName: null,
        selectedSizeID: null,
      });
    },
    deleteOrderHandler(order) {
      console.log("DELETE ORDER HANDLER CHECK ORDER OBJECT SELECTED");
      console.log(order);
      this.orderList[order.selectedIndex] = order;
      // this.orderCount--;
      // this.orderList.splice(index, 1);
      // const tempOrderList = this.orderList.filter(
      //   (order) => order.id !== orderID
      // );
      // this.orderList = [...tempOrderList];
    },
  },
};
</script>

<style scoped>
.wrapperSubTotal {
  right: 3rem;
  position: fixed;
  margin-top: 3rem;
  border-radius: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  max-height: 300px;
}
</style>