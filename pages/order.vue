<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <OrderCard v-for="index in countOrder" :key="index" />
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
  data() {
    return {
      countOrder: 4,
    };
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