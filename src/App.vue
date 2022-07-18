<template>
  <a href="#main" class="skip-link">skip to content</a>
  <div id="main">
    <div class="l-gutters">
      <div class="l-container">
        <Hero :content="content.hero" />
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

import Hero from '@/components/Hero.vue'
import LatestArticles from '@/components/LatestArticles.vue'

// todo: add/remove is-tabbing

export default {
  setup() {
    useSetVhCss()
    const {  activeBreakpoint, breakpointLabels } = useBreakpoints()
    return { activeBreakpoint, breakpointLabels } // return setup() props to template
  },
  components: {
    Hero,
    LatestArticles,
  },
  data() {
    return {
      content,
    }
  },
  watch: {
    activeBreakpoint() {
      this.getHtmlClasses()
    }
  },  
  methods: {
    // as a rule keep any application state classes on <body.nav-open> and utility classes on <html.has-touch>
    getHtmlClasses() {
      this.breakpointLabels.forEach(bp => {
        document.documentElement.classList.remove(bp)
      })
      document.documentElement.classList.add(this.activeBreakpoint)
      const hasTouch = isTouchDevice()
      document.documentElement.classList.toggle('no-touch', !hasTouch)
      document.documentElement.classList.toggle('has-touch', hasTouch)
    },
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
