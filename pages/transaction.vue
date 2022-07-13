<template>
  <div>
    <div class="container">
      <NuxtLink to="/order">
        <input
          type="button"
          class="btn btn-success mt-3 mb-3"
          value="Add New Transaction"
        />
      </NuxtLink>
      <TransactionData
        v-for="(transactionObject, index) in transactionData"
        :key="index"
        :transactionObject="transactionObject"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  async fetch() {
    const BASE_LINK =
      "https://9ebbb237-28df-45d9-a23d-66a0f8e360e6.mock.pstmn.io";

    const fetchData = await axios.get(`${BASE_LINK}/transaction`);

    let tempTransactionList = fetchData.data.data;
    // console.log(tempTransactionList);
    for (const data of tempTransactionList) {
      //   console.log(data);
      let totalPrice = 0;
      for (const tsc of data.transactionDetail) {
        totalPrice += tsc.price * tsc.qty;
      }
      data["totalPrice"] = totalPrice;
    }
    console.log("TOTAL");
    console.log(tempTransactionList);
    this.transactionData = tempTransactionList;
  },
  data() {
    return {
      transactionData: null,
    };
  },
};
</script>

<style scoped>
table {
  cursor: pointer;
}
td {
  transition: 0.3s ease-in-out;
}
td:hover {
  box-shadow: -2px 0px 78px -35px rgba(0, 0, 0, 0.75);
  transition: 0.3s ease-in-out;
  padding: 1rem;
}
tr.hide-table-padding td {
  padding: 0;
}
</style>