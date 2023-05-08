<template>
  <div class="home">
    <button @click="$store.commit('pane');">-</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  watch: {
    darkmode(newName) {
      localStorage.darkmode = newName;
    }
  }
};
</script>
