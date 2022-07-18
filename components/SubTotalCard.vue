<template>
  <div class="col-4 wrapperSubTotal">
    <h3 class="m-3">Subtotal Rp. {{ formatNumber(subTotal) }}</h3>
    <button type="button" class="btn btn-success m-3">Checkout</button>
  </div>
</template>

<script>
export default {
  props: ["subTotal"],
  methods: {
    formatNumber(x) {
      // FORMAT number . every 3 digit from behind
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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