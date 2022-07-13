<template>
  <h3>{{ content.heading }}</h3>
  <div class="articles">
    <div v-for="article in content.articles">
      <LatestArticlesItem :content="article" />
    </div>
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

<style scoped lang="scss">
h3 {
  @extend %h3;
  margin-top: 100px;
}
.articles {
  lost-flex-container: row;
  
  > div {
    margin-bottom: 60px;
    
    @include media('>=tablet', '<tablet-landscape') {
      lost-column: 1/2 2 5%;
    }
    @include media('>=tablet-landscape') {
      lost-column: 1/3;
    }
  }
}
</style>