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
          :orderID="order.id"
          @deleteOrderHandler="deleteOrderHandler($event)"
        />
      </div>
      <div class="col-4 wrapperSubTotal">
        <h3 class="m-3">Subtotal Rp. 10000</h3>
        <button type="button" class="btn btn-success m-3">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderCount: 1,
      orderList: [{ id: 1 }],
    };
  },
  methods: {
    addOrderHandler() {
      this.orderCount++;
      this.orderList.push({ id: this.orderCount });
    },
    deleteOrderHandler(orderID) {
      this.orderCount--;
      const tempOrderList = this.orderList.filter(
        (order) => order.id !== orderID
      );
      this.orderList = [...tempOrderList];
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