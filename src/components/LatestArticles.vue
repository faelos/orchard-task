<template>
  <div>
    <div class="heading-wrap">
      <h3
        ref="heading"
        v-html="content.heading"
      ></h3>
    </div>
    <hr />
    <div class="articles">
      <div
        v-for="(article, i) in content.articles"
        :key="`article-${i}`"
        :class="{
          'is-active': i === hoverIndex,
          'is-inactive': i !== hoverIndex && hoverIndex !== null,
        }"
        @mouseenter="onMouseEnter(i)"
        @mouseleave="onMouseLeave(i)"
      >
        <LatestArticlesItem :content="article" />
      </div>
    </div>
  </div>
</template>

<script>
import LatestArticlesItem from '@/components/LatestArticlesItem.vue'

export default {
  components: {
    LatestArticlesItem,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      hoverIndex: null,
    }
  },
  methods: {
    onMouseEnter(i) {
      this.hoverIndex = i
    },
    onMouseLeave(i) {
      this.hoverIndex = null
    },
  },
}
</script>

<style scoped lang="scss">
.heading-wrap {
  text-align: center;
}
h3 {
  @extend %h3;
  position: relative;
  z-index: 3;

  @include media('<tablet') {
    line-height: 1.2;
  }
}

hr {
  @extend %hr;

  @include media('>=tablet') {
    display: none;
  }
}

.articles {
  lost-flex-container: row;
  margin-top: 60px;

  > div {
    @extend %u-accelerate;
    position: relative;
    margin-bottom: 60px;
    transition: all 0.3s ease;

    @include media('>=tablet') {
      .no-touch &.is-active {
        transform: scale(1.1);
        z-index: 2;

        &:before {
          opacity: 1;
        }
      }

      .no-touch &.is-inactive {
        opacity: 0.75;
      }
    }

    &:before {
      content: '';
      position: absolute;
      z-index: -1;
      opacity: 0;
      $size: 15px;
      top: -$size;
      right: -$size;
      bottom: -$size;
      left: -$size;
      background-color: lighten(black, 10%);
      border-radius: 2px;
      transition: all 0.1s ease;
      box-shadow: 0px 0px 100px black;
    }

    @include media('>=tablet', '<tablet-landscape') {
      lost-column: 1/3 3 20px;
    }

    @include media('>=tablet-landscape') {
      lost-column: 1/3;
    }
  }
}
</style>
