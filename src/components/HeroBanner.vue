<template>
  <div class="hero">
    <div class="hero__cols">
      <div class="hero__col">
        <div class="hero__img-cols">
          <div class="hero__img-col">
            <div
              ref="mouseTarget"
              class="hero__img-lrg"
            >
              <a
                href="javascript:void(0)"
                @click="onImgClick(0, $event)"
              >
                <img
                  ref="hero-img"
                  :src="content.images[0].src"
                  :alt="content.images[0].alt"
                  @load="setupPixi"
                />
              </a>
            </div>
          </div>
          <div class="hero__img-col">
            <div class="hero__img-sml fx-plate">
              <a
                href="javascript:void(0)"
                @click="onImgClick(1, $event)"
              >
                <img
                  class="fx-plate__fore"
                  src="/hero-2-overlay@2x.png"
                  alt=""
                />
                <img
                  class="fx-plate__back"
                  :src="content.images[1].src"
                  :alt="content.images[1].alt"
                />
              </a>
            </div>
            <div class="hero__img-sml fx-asparagus">
              <a
                href="javascript:void(0)"
                @click="onImgClick(2, $event)"
              >
                <img
                  v-for="(n, i) in 12"
                  :key="i"
                  :class="`fx-asparagus__stem-${n}`"
                  :src="getAsparagusStemImg(n)"
                  alt=""
                />
                <img
                  class="fx-asparagus__back"
                  :src="content.images[2].src"
                  :alt="content.images[2].alt"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__col fx-text-fade">
        <h1
          ref="heading"
          v-html="content.heading"
        ></h1>
        <hr />
        <p class="desc">{{ content.desc }}</p>
        <h2>{{ content.subheading }}</h2>

        <!-- @phone -->
        <div class="hero__phone-cols">
          <div class="fx-plate fx-scroll-target">
            <a
              href="javascript:void(0)"
              @click="onImgClick(1, $event)"
            >
              <img
                class="fx-plate__fore"
                src="/hero-2-overlay@2x.png"
                alt=""
              />
              <img
                class="fx-plate__back"
                :src="content.images[1].src"
                :alt="content.images[1].alt"
              />
            </a>
          </div>
          <div class="fx-asparagus fx-scroll-target">
            <a
              href="javascript:void(0)"
              @click="onImgClick(2, $event)"
            >
              <img
                v-for="(n, i) in 12"
                :key="i"
                :class="`fx-asparagus__stem-${n}`"
                :src="getAsparagusStemImg(n)"
                alt=""
              />
              <img
                class="fx-asparagus__back"
                :src="content.images[2].src"
                :alt="content.images[2].alt"
              />
            </a>
          </div>
        </div>

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
import { ref } from 'vue'
import VueEasyLightbox from 'vue-easy-lightbox'
import * as PIXI from 'pixi.js'
import { GodrayFilter } from 'pixi-filters'
import { useMouseInElement } from '@vueuse/core'
import fitty from 'fitty'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import isTouchDevice from '@/lib/is-touch-device'

gsap.registerPlugin(ScrollTrigger)

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
  setup() {
    const mouseTarget = ref(null)

    const { elementX, elementY, elementWidth, elementHeight, isOutside } =
      useMouseInElement(mouseTarget)

    return {
      elementX,
      elementY,
      elementWidth,
      elementHeight,
      isOutside,
      mouseTarget,
    }
  },
  data() {
    return {
      modalImg: '',
      isModalVisible: false,
      pixi: null,
      depthSprite: null,
      isTouchDevice: isTouchDevice(),
    }
  },
  watch: {
    elementX(x) {
      this.updateDisplaymentMap({ x })
    },
    elementY(y) {
      this.updateDisplaymentMap({ y })
    },
  },
  mounted() {
    this.$nextTick(() => {
      fitty(this.$refs.heading, { minSize: 20 }) // css overrides @phone

      ScrollTrigger.create({
        trigger: '.fx-scroll-target',
        toggleClass: {
          targets: '.fx-scroll-target',
          className: 'is-forced',
        },
        start: 'top center',
      })
    })
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
    getAsparagusStemImg(i) {
      if (i > 4 && i <= 8) i -= 4
      if (i > 8) i -= 8
      return new URL(`/stem-${i}@2x.png`, import.meta.url).href
    },
    setupPixi() {
      const loader = new PIXI.Loader()

      loader
        .add('hero', new URL(`/hero-1@2x.jpg`, import.meta.url).href)
        .add('depthSprite', new URL(`/hero-1-map@2x.jpg`, import.meta.url).href)

      loader.onComplete.add((loader, resources) => {
        // get stage
        const img = this.$refs['hero-img']
        this.pixi = new PIXI.Application({
          resizeTo: img,
        })
        img.parentNode.appendChild(this.pixi.view)
        this.pixi.renderer.backgroundAlpha = 0

        // add hero
        const hero = new PIXI.Sprite(resources.hero.texture)
        hero.width = img.offsetWidth
        hero.height = img.offsetHeight
        this.pixi.stage.addChild(hero)

        // add depth map
        this.depthSprite = new PIXI.Sprite(resources.depthSprite.texture)
        this.depthSprite.width = img.offsetWidth
        this.depthSprite.height = img.offsetHeight

        const displacementFilter = new PIXI.filters.DisplacementFilter(
          this.depthSprite
        )

        displacementFilter.scale.x = 0
        displacementFilter.scale.y = 0
        this.pixi.stage.addChild(this.depthSprite)
        this.pixi.stage.filters = [displacementFilter] // update

        const godrayFilter = new GodrayFilter({
          angle: 25,
          gain: 0.7,
          lacunarity: 1.8,
          parallel: true,
          time: 0,
          alpha: 0.25,
        })
        this.pixi.stage.filters.push(godrayFilter)

        const ticker = new PIXI.Ticker()
        let delta = 0
        ticker.add(() => {
          delta += 0.02
          godrayFilter.time = delta
        })
        ticker.start()

        this.pixi.renderer.on('resize', (width, height) => {
          hero.width = img.offsetWidth
          hero.height = img.offsetHeight
          this.depthSprite.width = img.offsetWidth
          this.depthSprite.height = img.offsetHeight
        })
      })

      loader.load()
    },
    updateDisplaymentMap({ x = null, y = null }) {
      if (this.isOutside || this.isTouchDevice) {
        return
      }

      const filter = this.pixi.stage.filters[0]
      const maxRange = 20

      if (x) {
        const percX = (
          ((this.elementX / this.elementWidth) * 100) /
          100
        ).toFixed(2)

        const newX = percX * maxRange - 10
        filter.scale.x = newX
      }
      if (y) {
        const percY = (
          ((this.elementY / this.elementHeight) * 100) /
          100
        ).toFixed(2)

        const newY = percY * maxRange - 10
        filter.scale.y = newY
      }
    },
  },
}
</script>

<style scoped lang="scss">
.hero {
  position: relative;

  @include media('<tablet') {
    margin-bottom: 80px;
  }

  @include media('>=tablet') {
    margin-top: 10%;
    margin-bottom: 10%;
  }
}

.hero__cols,
.hero__img-cols {
  @include media('>=tablet') {
    lost-flex-container: row;
  }
}

.hero__col {
  @include media('>=tablet', '<tablet-landscape') {
    &:first-child {
      lost-column: 1.3/3;
    }

    &:last-child {
      lost-column: 1.7/3;
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

.hero__img-cols {
}

.hero__img-col {
  @include media('>=tablet', '<tablet-landscape') {
    &:nth-child(2) {
      lost-flex-container: row;
    }
  }

  @include media('>=tablet-landscape') {
    lost-column: 1/2 2 24px;
  }
}

.hero__img-lrg {
  position: relative;

  &:deep(canvas) {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none; // canvas stealing click on touch devices
  }

  @include media('<tablet') {
    position: absolute;
    top: -50px;
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
      background-image: linear-gradient(rgba(transparent, 0) 65%, rgba($bg, 1));
    }
  }
}

.hero__img-sml {
  display: none;

  @include media('>=tablet') {
    display: block;
  }

  @include media('>=tablet', '<tablet-landscape') {
    lost-column: 1/2 2 5px;
    margin-top: 5px;
  }

  &:last-child {
    @include media('>=tablet-landscape') {
      margin-top: 18px;
    }
  }
}

.fx-plate {
  position: relative;
  overflow: hidden;

  &:hover,
  &.is-forced {
    .fx-plate__fore {
      transition-duration: 0.6s;
      transform: scale(1.3) rotate(10deg) translateX(-5%);
      filter: saturate(1.2) drop-shadow(2px -2px 10px rgba(0, 0, 0, 0.5));
    }
    .fx-plate__back {
      filter: blur(1.2px) saturate(0.5);
    }
  }

  &__fore {
    position: absolute;
    z-index: 1;
    left: 7%;
    bottom: 0;
    width: 81%;
    transition: 0.5s all ease;
    transform-origin: 45% 60%;
  }

  &__back {
    transition: 0.5s all ease-out;
  }
}

.fx-asparagus {
  position: relative;
  overflow: hidden;

  &:hover,
  &.is-forced {
    [class^='fx-asparagus__stem'] {
      $x-axis-mod: 30%;
      $y-axis-mod: 4%;
      $scale-mod: 0.1;

      // 1 - 4
      &:nth-child(-n + 4) {
        transform: translate3d(-#{$x-axis-mod}, -#{$y-axis-mod}, 0px)
          scale(1 - $scale-mod) rotate(-4deg);
        filter: blur(0.5px) brightness(0.7);
      }

      // 9-12
      &:nth-child(n + 9) {
        transform: translate3d(#{$x-axis-mod}, #{$y-axis-mod}, 0px)
          scale(1 + $scale-mod) rotate(3deg);
        filter: brightness(1.3);
      }
    }
  }
}
[class^='fx-asparagus__stem'] {
  $fx-asparagus-delay-mod: 0.1s;
  $fx-asparagus-speed: 0.5s;

  position: absolute;
  transition: $fx-asparagus-speed all ease;
  transform-origin: 50% 70%;
  filter: brightness(1) blur(0) drop-shadow(0px 0px 5px rgba(black, 0.25));

  //
  // stem positioning
  //

  // 1, 5, 9
  &:nth-child(4n + 1) {
    width: 10.75%;
    bottom: 9%;
    left: 12%;
  }

  // 2, 6, 10
  &:nth-child(4n + 2) {
    width: 8.1%;
    bottom: 9%;
    left: 36.5%;
    transition-delay: $fx-asparagus-delay-mod;
  }

  // 3, 7, 11
  &:nth-child(4n + 3) {
    width: 8.6%;
    bottom: 9.7%;
    left: 59.5%;
    transition-delay: $fx-asparagus-delay-mod * 2;
  }

  // 4, 8, 12
  &:nth-child(4n + 4) {
    width: 10.3%;
    bottom: 9%;
    left: 80.2%;
    transition-delay: $fx-asparagus-delay-mod * 3;
  }

  //
  // stem layering
  //

  // 1 - 4
  &:nth-child(-n + 4) {
    z-index: 1;
    filter: brightness(1);
    filter: blur(0);
  }
  // 5-8
  &:nth-child(n + 5):nth-child(-n + 8) {
    z-index: 2;
  }
  // 8 +
  &:nth-child(n + 8) {
    z-index: 3;
    filter: brightness(1);
  }
}

.fx-text-fade {
  > * {
    opacity: 0;
  }
}

.ready .fx-text-fade {
  $fx-text-fade-delay: 0.2s;

  > * {
    animation-name: fadeInUp;
    animation-duration: 0.7s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    animation-delay: $fx-text-fade-delay;
  }

  h2 {
    animation-delay: $fx-text-fade-delay * 2;
  }

  .subcontent {
    animation-delay: $fx-text-fade-delay * 2.5;
  }

  .hero__phone-cols {
    animation-delay: $fx-text-fade-delay * 2.5;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 2rem, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

h1 {
  @extend %h1;

  @include media('<tablet') {
    font-size: 38px !important; // override fitty @phone
    white-space: normal !important; // override fitty @phone
    line-height: 1.2;
    font-weight: 400;
    text-align: center;
    padding-top: 110%;
    text-shadow: 2px 2px 0px rgba(black, 0.5);
  }
}

hr {
  @extend %hr;
}

.desc {
  @extend %p;
  font-size: 18px;
}

h2 {
  @extend %h2;
  margin-top: 43px;

  @include media('<tablet') {
    text-align: center;
  }
}

.subcontent {
  font-weight: 500;
  font-size: 18px;
  line-height: 1.62;
  letter-spacing: 0.1px;
  margin-top: 15px;
}

.hero__phone-cols {
  lost-flex-container: row;
  margin-top: 20px;

  > div {
    lost-column: 1/2 2 5px;
  }

  @include media('>=tablet') {
    display: none;
  }
}
</style>
