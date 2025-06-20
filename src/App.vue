<template>
  <a
    href="#main"
    class="skip-link"
    >skip to content</a
  >
  <div id="main">
    <div class="l-gutters">
      <div class="l-container">
        <HeroBanner :content="content.hero" />
        <LatestArticles :content="content.latestArticles" />
      </div>
    </div>
  </div>
</template>

<script>
import content from '@/lib/content-provider'
import isTouchDevice from '@/lib/is-touch-device'
import useBreakpoints from '@/hooks/breakpoints'
import useSetVhCss from '@/hooks/set-vh-css'

import HeroBanner from '@/components/HeroBanner.vue'
import LatestArticles from '@/components/LatestArticles.vue'
import { onMounted, watch } from 'vue'

// todo: add/remove is-tabbing

export default {
  components: {
    HeroBanner,
    LatestArticles,
  },
  setup() {
    useSetVhCss()
    const { activeBreakpoint, breakpointLabels } = useBreakpoints()

    // as a rule keep any application state classes on <body.nav-open> and utility classes on <html.has-touch>
    const getHtmlClasses = () => {

      breakpointLabels.value.forEach((bp) => {
        document.documentElement.classList.remove(bp)
      })

      document.documentElement.classList.add(activeBreakpoint.value)
      const hasTouch = isTouchDevice()
      document.documentElement.classList.toggle('no-touch', !hasTouch)
      document.documentElement.classList.toggle('has-touch', hasTouch)
    }

    onMounted(() => {
      window.addEventListener('load', () => {
        document.documentElement.classList.add('ready')
      })

      getHtmlClasses()
    })

    watch(activeBreakpoint, () => {
      getHtmlClasses()
    })

    return { 
      activeBreakpoint, 
      breakpointLabels,
      content, 
    } // return setup() props to template
  },
}
</script>

<style lang="scss">
@import 'scss/globals/_all.scss';

.skip-link {
  @extend %u-accessibility;
  &:focus {
    position: absolute;
    z-index: 500;
    width: auto;
    height: auto;
    left: 0;
    top: 0;
    padding: 10px;
    text-decoration: underline;
    color: white;
    background-color: black;
  }
}
</style>
