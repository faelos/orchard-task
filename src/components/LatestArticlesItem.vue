<template>
  <div
    ref="scrollTarget"
    class="fx-scroll"
  >
    <a
      class="img-wrap"
      :href="content.url"
      @click="onClick(content.title, $event)"
    >
      <img
        :src="content.imgSrc"
        :alt="content.imgAlt"
      />
    </a>
    <a
      class="title"
      :href="content.url"
      @click="onClick(content.title, $event)"
      v-html="content.title"
    ></a>
    <p>{{ content.desc }}</p>
    <a
      class="primary-btn"
      :href="content.url"
      @click="onClick(content.title, $event)"
    >
      {{ content.cta }}
    </a>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    ScrollTrigger.create({
      trigger: this.$refs.scrollTarget,
      toggleClass: 'is-active',
      once: true,
    })
  },
  methods: {
    onClick(title, e) {
      console.log(`clicked ${title}`, e.target)
    },
  },
}
</script>

<style scoped lang="scss">
.img-wrap {
  display: block;
  position: relative;

  // make full width. Inversely corresponds to .l-gutters padding values
  @include media('<tablet') {
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;
    background-color: $primary;
  }
}
.title {
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.1px;
  margin-top: 28px;
  display: inline-block;

  @include media('<tablet') {
    font-weight: 700;
    font-size: 20px;
  }

  @include media('>=tablet', '<tablet-landscape') {
    font-size: 16px;
    margin-top: 18px;
  }
}
p {
  @extend %p;
  margin-top: 12px;

  @include media('>=tablet', '<tablet-landscape') {
    font-size: 15px;
  }
}
.primary-btn {
  margin-top: 20px;
}

.fx-scroll {
  @include media('<tablet') {
    opacity: 0;

    &.is-active {
      opacity: 1;
      transition: opacity 0.5s ease-in;
    }
  }
}
</style>
