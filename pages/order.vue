<template>
  <div class="container">
    <div class="card mb-3 mt-5 wrapper" style="max-width: 90%">
      <div class="row">
        <div class="col-8">
          <!-- Option Menu -->
          <div class="m-3">
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label for="floatingSelect">Pilih Resep Menu</label>
            </div>
          </div>

          <div class="row">
            <!-- Option Size -->
            <div class="col-6">
              <div class="m-3">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <label for="floatingSelect">Pilih Resep Menu</label>
                </div>
              </div>
            </div>

            <!-- Option Quantity -->
            <div class="col-3">
              <div class="form-floating m-3">
                <input
                  type="number"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Pilih Quantity</label>
              </div>
            </div>
            <div class="col-3">
              <div class="mt-4">
                <button type="button" class="btn btn-danger w-40">
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
            <!-- Delete Button -->
          </div>
        </div>
        <div class="col-4">
          <img
            src="https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/5/27/5b48f41c-fd76-4809-bee3-4f6cf623fe9e.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
/* .wrapper:hover {
  box-shadow: -2px 0px 78px -35px rgba(0, 0, 0, 0.75);
  transition: 0.3s ease-in-out;
  padding: 1rem;
} */
</style>