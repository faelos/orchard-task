<template>
  <h1>{{ content.heading }}</h1>
  <p>{{ content.desc }}</p>
  <h2>{{ content.subheading }}</h2>
  <p>{{ content.subcontent }}</p>
  <template v-for="image in content.images">
    <img :src="image.src" :alt="image.alt" />
  </template>
</template>

<script>
export default {
  props: ['content'],
}
</script>

<style scoped>

</style>
