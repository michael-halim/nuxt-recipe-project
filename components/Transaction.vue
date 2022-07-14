<template>
  <div class="accordion">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse' + `${transactionObject.ID}`"
        >
          <div class="col-3">{{ transactionObject.ID }}</div>
          <div class="col-3">{{ transactionObject.timestamp }}</div>
          <div class="col-3">Rp. {{ transactionObject.totalPrice }}</div>
        </button>
      </h2>
      <div
        :id="'collapse' + `${transactionObject.ID}`"
        class="accordion-collapse collapse"
      >
        <div class="accordion-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Recipe Name</th>
                <th scope="col">Size</th>
                <th scope="col">@Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="detailTransactionObject in transactionObject.transactionDetail"
                :key="detailTransactionObject.menuID"
              >
                <td>{{ detailTransactionObject.menu.recipe.name }}</td>
                <td>{{ detailTransactionObject.menu.size.name }}</td>
                <td>Rp. {{ detailTransactionObject.menu.price }}</td>
                <td>{{ detailTransactionObject.qty }}</td>
                <td>
                  Rp.
                  {{
                    detailTransactionObject.menu.price * detailTransactionObject.qty
                  }}
                </td>
              </tr>
              <tr>
                <td class="labelTotalPriceCollapse">Total</td>
                <td class="totalPriceCollapse" colspan="4">
                  Rp. {{ transactionObject.totalPrice }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["transactionObject"],
  methods: {},
};
</script>

<style scoped>
.previewImage {
  max-width: 80px;
  margin: 1rem 0;
}
.labelTotalPriceCollapse {
  border-bottom: none;
  font-weight: bold;
}
.totalPriceCollapse {
  text-align: right;
  padding-right: 12rem;
  font-weight: bold;
  border-bottom: none;
}
</style>