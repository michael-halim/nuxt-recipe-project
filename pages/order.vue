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
    const BASE_LINK = this.$store.getters.getBaseLink();

    const fetchData = await axios.get(`${BASE_LINK}/recipe`);
    const tempMenuOption = [];
    console.log("fetchData.data.data");
    console.log(fetchData.data.data);
    for (const fetchObject of fetchData.data.data) {
      let tempData = {};
      tempData["ID"] = fetchObject.ID;
      tempData["name"] = fetchObject.name;
      tempData["imgFileName"] = fetchObject.imgFileName;
      tempMenuOption.push(tempData);
    }
    this.menuOption = tempMenuOption;
    // this.orderList[0].menuOption = this.initMenuOption;
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

      // RESET Order Card
      this.onReset();
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
.wrapperNewOrder {
  right: 2rem;
  position: fixed;
  margin-top: 1rem;
}
</style>