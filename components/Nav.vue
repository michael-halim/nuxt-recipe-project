<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <NuxtLink to="/" class="nav-link"> Navbar </NuxtLink>
      <div class="navbar-collapse">
        <ul class="navbar-nav">
          <li>
            <NuxtLink to="/" class="nav-link"> Home </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/form" class="nav-link"> Form</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/transaction" class="nav-link"> Transaction</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/order" class="nav-link"> Order</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>