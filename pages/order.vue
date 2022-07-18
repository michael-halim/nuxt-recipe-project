<template>
  <div class="container">
    <button class="btn btn-success mt-3" @click="addOrderHandler">
      Add New
    </button>
    <div class="row">
      <div class="col-8">
        <OrderCard
          v-for="(order, index) in orderList"
          :key="index"
          :order="order"
          :orderIndex="index"
          @deleteOrderHandler="deleteOrderHandler"
        />
      </div>
      <div class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ orderList }}</pre>
      </div>
      <SubTotalCard :subTotal="subTotal" />
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
    // this.orderList[0].menuOption = this.initMenuOption;
  },
  data() {
    return {
      initMenuOption: [],
      orderCount: 0,
      orderList: [],
      subTotal: 0,
    };
  },
  methods: {
    addOrderHandler() {
      this.orderCount++;
      this.orderList.push({
        menuOption: this.initMenuOption,
        selectedRecipeID: null,
        selectedRecipeName: null,
        selectedPrice: null,
        selectedSize: null,
        selectedQty: null,
        selectedImgFileName: null,
        selectedSizeID: null,
      });
    },
    deleteOrderHandler({ propsOrder, orderIndex }) {
      // console.log("DELETE ORDER HANDLER CHECK ORDER OBJECT SELECTED");
      // console.log(propsOrder);
      // console.log(orderIndex);
      this.orderCount--;
      this.orderList.splice(orderIndex, 1);
    },
  },
  watch: {
    orderList: {
      handler() {
        let subTotal = 0;
        for (const order of this.orderList) {
          if (order.selectedPrice !== null && order.selectedQty !== null) {
            subTotal +=
              parseInt(order.selectedPrice) * parseInt(order.selectedQty);
          }
        }
        this.subTotal = subTotal;
        console.log(this.subTotal);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
</style>