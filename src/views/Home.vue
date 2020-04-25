<template>
  <div class="container has-text-centered">
    <h1 class="title" v-if="$store.state.me">
      Hi, {{$store.state.me}}
    </h1>
    <template v-else>
      <h1 class="title">
        Beauty Salon
      </h1>
      <h2 class="subtitle">
        select menu on the top
        <span class="icon"><i class="fas fa-angle-up"></i></span>
      </h2>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
