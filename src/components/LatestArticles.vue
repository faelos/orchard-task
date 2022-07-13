<template>
  <h3>{{ content.heading }}</h3>
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