<template>
  <h2>{{ content.heading }}</h2>
  <div v-for="article in content.articles">
    <LatestArticlesItem :content="article" />
  </div>
</template>

<script>
import LatestArticlesItem from '@/components/LatestArticlesItem.vue'

export default {
  components: {
    LatestArticlesItem,
  },
  props: ['content'],
}
</script>

<style scoped>

</style>