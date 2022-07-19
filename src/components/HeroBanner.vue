<template>
  <div class="hero">
    <div class="hero__cols">
      <div class="hero__col">
        <div class="hero__img-cols">
          <div class="hero__img-col">
            <div class="hero__img-main">
              <a
                href="javascript:void(0)"
                @click="onImgClick(0, $event)"
              >
                <img
                  :src="content.images[0].src"
                  :alt="content.images[0].alt"
                />
              </a>
            </div>
          </div>
          <div class="hero__img-col">
            <div class="hero__img-sml">
              <a
                href="javascript:void(0)"
                @click="onImgClick(1, $event)"
              >
                <img
                  :src="content.images[1].src"
                  :alt="content.images[1].alt"
                />
              </a>
            </div>
            <div class="hero__img-sml">
              <a
                href="javascript:void(0)"
                @click="onImgClick(2, $event)"
              >
                <img
                  :src="content.images[2].src"
                  :alt="content.images[2].alt"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__col">
        <h1>{{ content.heading }}</h1>
        <hr />
        <p class="desc">{{ content.desc }}</p>
        <h2>{{ content.subheading }}</h2>
        <p class="subcontent">{{ content.subcontent }}</p>
      </div>
    </div>
  </div>

  <vue-easy-lightbox
    move-disabled
    :visible="isModalVisible"
    :imgs="modalImg"
    @hide="onModalHide"
  >
    <template #toolbar="{}">
      <!-- removes toolbar -->
    </template>
  </vue-easy-lightbox>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  components: {
    VueEasyLightbox,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modalImg: '',
      isModalVisible: false,
    }
  },
  methods: {
    onImgClick(imgIndex, e) {
      const imgSrcForModal = this.content.images[imgIndex].src
      console.log(`open ${imgSrcForModal} in modal`, e.target)
      this.modalImg = imgSrcForModal
      this.isModalVisible = true
    },
    onModalHide() {
      this.isModalVisible = false
    },
  },
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  margin-top: 60px;
}

.hero__cols,
.hero__img-cols {
  @include media('>=tablet') {
    lost-flex-container: row;
  }
}

.hero__col {
  @include media('>=tablet', '<tablet-landscape') {
    lost-column: 1/2;

    &:first-child {
      align-self: center;
    }
  }

  @include media('>=tablet-landscape') {
    &:first-child {
      lost-column: 2/3;
    }

    &:last-child {
      lost-column: 1/3;
    }
  }
}

.hero__img-col {
  @include media('>=tablet', '<tablet-landscape') {
    lost-column: 1/2 2 5px;
  }

  @include media('>=tablet-landscape') {
    lost-column: 1/2 2 24px;
  }
}

.hero__img-main {
  @include media('<tablet') {
    position: absolute;
    top: -60px;
    z-index: -1;

    // make full width. Inversely corresponds to .l-gutters padding values
    max-width: initial;
    width: calc(100% + 40px);
    margin-left: -20px;
    margin-right: -20px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: calc(var(--vh, 1vh) * 70);
      background-image: linear-gradient(rgba(transparent, 0) 50%, rgba($bg, 1));
    }
  }
}

.hero__img-sml {
  display: none;

  @include media('>=tablet') {
    display: block;
  }

  &:last-child {
    @include media('>=tablet', '<tablet-landscape') {
      margin-top: 5px;
    }

    @include media('>=tablet-landscape') {
      margin-top: 18px;
    }
  }
}

img {
  @include u-bright-hover();
}

h1 {
  @extend %h1;

  @include media('<tablet') {
    padding-top: 110%;
    font-weight: 400;
  }
}

hr {
  border: 0;
  background-color: white;
  height: 1px;
  margin-top: 15px;
  margin-bottom: 28px;
}

.desc {
  @extend %p;
  font-size: 18px;
}

h2 {
  @extend %h2;
  margin-top: 43px;
}

.subcontent {
  font-weight: 500;
  font-size: 18px;
  line-height: 1.62;
  letter-spacing: 0.1px;
  margin-top: 15px;
}
</style>
