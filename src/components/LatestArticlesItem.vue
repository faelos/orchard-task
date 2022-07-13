<template>
  <a :href="content.url">{{ content.title }}</a>
  <p>{{ content.desc }}</p>
</template>

<script>
export default {
  props: ['content'],
}
</script>

<style scoped>

</style>