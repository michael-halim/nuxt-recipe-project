<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <OrderCard
          v-for="(order, index) in orderList"
          :key="index"
          :order="order"
          :orderIndex="index"
          :menuOption="menuOption"
          @deleteOrderHandler="deleteOrderHandler"
        />
      </div>
      <div class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ orderList }}</pre>
      </div>
      <div class="col-4 wrapperNewOrder">
        <button class="btn btn-success mt-3" @click="addOrderHandler">
          Add New
        </button>
      </div>
      <SubTotalCard :subTotal="subTotal" @checkoutHandler="checkoutHandler" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    // GET Base Link from Store
    const BASE_LINK = this.$store.getters.getBaseLink();

    // CHECK If This is come from Edit Button or Not
    if (this.$route.params.transactionID !== undefined) {
      const transactionID = this.$route.params.transactionID;

      let fetchTransactionData = await axios.get(
        `${BASE_LINK}/transaction/${transactionID}`
      );

      // FETCH Transaction Detail and Set data to V Model in Order Card
      fetchTransactionData = fetchTransactionData.data.data.transactionDetail;
      for (const transactionDetail of fetchTransactionData) {
        let tempOrderList = {};
        tempOrderList["selectedRecipeID"] = transactionDetail.menu.recipeID;
        tempOrderList["selectedRecipeName"] =
          transactionDetail.menu.recipe.name;
        tempOrderList["selectedMenuID"] = transactionDetail.menuID;
        tempOrderList["selectedPrice"] = transactionDetail.menu.price;
        tempOrderList["selectedSize"] = transactionDetail.menu.size.name;
        tempOrderList["selectedQty"] = transactionDetail.qty;
        tempOrderList["selectedImgFileName"] =
          transactionDetail.menu.recipe.imgFileName;
        tempOrderList["selectedSizeID"] = transactionDetail.menu.sizeID;
        this.orderList.push(tempOrderList);
      }
    }

    // GET Menu Option from API
    const fetchData = await axios.get(`${BASE_LINK}/recipe`);
    const tempMenuOption = [];

    // CONSTRUCTS Menu Option
    for (const fetchObject of fetchData.data.data) {
      let tempData = {};
      tempData["ID"] = fetchObject.ID;
      tempData["name"] = fetchObject.name;
      tempData["imgFileName"] = fetchObject.imgFileName;
      tempMenuOption.push(tempData);
    }

    // SAVE Menu Option
    this.menuOption = tempMenuOption;
  },
  data() {
    return {
      menuOption: [],
      orderCount: 0,
      orderList: [],
      subTotal: 0,
    };
  },
  methods: {
    addOrderHandler() {
      this.orderCount++;
      this.orderList.push({
        selectedRecipeID: null,
        selectedRecipeName: null,
        selectedMenuID: null,
        selectedPrice: null,
        selectedSize: null,
        selectedQty: null,
        selectedImgFileName: null,
        selectedSizeID: null,
      });
    },
    onReset() {
      this.menuOption = [];
      this.orderCount = 0;
      this.orderList = [];
      this.subTotal = 0;
    },
    deleteOrderHandler({ propsOrder, orderIndex }) {
      this.orderCount--;
      this.orderList.splice(orderIndex, 1);
    },
    async checkoutHandler() {
      // GET Base Link
      const BASE_LINK = this.$store.getters.getBaseLink();

      // ADD Quantity of Duplicate Menu
      let dictTransaction = {};
      for (const order of this.orderList) {
        if (dictTransaction[order.selectedMenuID]) {
          dictTransaction[order.selectedMenuID] += parseInt(order.selectedQty);
        } else {
          dictTransaction[order.selectedMenuID] = parseInt(order.selectedQty);
        }
      }

      // CONSTRUCTS Array for Transaction List
      const transactionList = [];
      for (const key in dictTransaction) {
        let tempTransaction = {};
        tempTransaction["menuID"] = parseInt(key);
        tempTransaction["qty"] = parseInt(dictTransaction[key]);
        transactionList.push(tempTransaction);
      }

      // SEND Data to Backend
      // IF Edit use PUT Method
      if (this.$route.params.transactionID !== undefined) {
        await axios
          .put(`${BASE_LINK}/transaction/${this.$route.params.transactionID}`, {
            transactionDetail: transactionList,
          })
          .then((res) => {
            console.log("RESPONSE POST TRANSACTION");
            console.log(res);
            if (res.status === 200) {
              alert("Success");
            }
          })
          .catch((error) => {
            console.log("ERROR");
            console.log(error);
          });
      } else {
        await axios
          .post(`${BASE_LINK}/transaction`, {
            transactionDetail: transactionList,
          })
          .then((res) => {
            console.log("RESPONSE POST TRANSACTION");
            console.log(res);
            if (res.status === 200) {
              alert("Success");
            }
          })
          .catch((error) => {
            console.log("ERROR");
            console.log(error);
          });
      }

      // RESET Order Card
      this.onReset();
    },
  },
  watch: {
    orderList: {
      // WATCH Every Changes to OrderList and Add the Qty to SubTotal
      handler() {
        let subTotal = 0;
        for (const order of this.orderList) {
          if (order.selectedPrice !== null && order.selectedQty !== null) {
            subTotal +=
              parseInt(order.selectedPrice) * parseInt(order.selectedQty);
          }
        }
        this.subTotal = subTotal;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.wrapperNewOrder {
  right: 2rem;
  position: fixed;
  margin-top: 1rem;
}
</style>