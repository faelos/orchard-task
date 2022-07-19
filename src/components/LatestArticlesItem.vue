<template>
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
  >
    {{ content.title }}
  </a>
  <p>{{ content.desc }}</p>
  <a
    class="primary-btn"
    :href="content.url"
    @click="onClick(content.title, $event)"
  >
    {{ content.cta }}
  </a>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      required: true,
    },
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
  margin-bottom: 28px;

  img {
    @include u-bright-hover;
  }

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
}
p {
  @extend %p;
  margin-top: 12px;
}
.primary-btn {
  margin-top: 20px;
}
</style>
