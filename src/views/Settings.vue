<template>
  <div class="home">
    <h1>{{ $store.state.count }}</h1>
    <button @click="$store.commit('decrement');">-</button>
    <button @click="$store.commit('increment');">+</button>
    <button @click="$store.commit('increment2');">+2</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Settings"
};
</script>
