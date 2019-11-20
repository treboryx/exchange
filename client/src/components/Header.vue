<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">Exchange</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li :class="[currentPage == '/' ? 'active' : '', 'nav-item']">
          <a class="nav-link" href="/">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li :class="[currentPage.includes('add') ? 'active' : '', 'nav-item']">
          <a class="nav-link" href="/add">Add</a>
        </li>
        <li :class="[currentPage.includes('update') ? 'active' : '', 'nav-item']">
          <a class="nav-link" href="/update">Update</a>
        </li>
        <li :class="[currentPage.includes('delete') ? 'active' : '', 'nav-item']">
          <a class="nav-link" href="/delete">Delete</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  computed: {
    currentPage() {
      return this.$route.path;
    }
  }
};
</script>

<style>
</style>