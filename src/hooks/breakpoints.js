/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Use within a composition component:
 *
 * TODO: usage
 */

import im from '@/lib/include-media'
import { useEventListener } from '@vueuse/core'
import debounce from 'lodash/debounce'


import { nextTick, ref, onMounted } from 'vue'

export default function useBreakpoints() {

  const debouncedResize = debounce(onResize, 100)
  const clientWidth = ref(0)
  const clientHeight = ref(0)
  const activeBreakpoint = ref('')
  const breakpointLabels = ref(null)

  function onResize() {

    clientWidth.value = window.innerWidth || 0
    clientHeight.value = window.innerHeight || 0
    activeBreakpoint.value = im.getActive()
    breakpointLabels.value = im.getBreakpointLabels()

    // TODO: add other im props or just expose im object?
    /*const isPhone = active === 'phone'
    const isTablet = active === 'tablet'
    const isTabletLandscape = active === 'tablet-landscape'
    const isDesktop = active === 'desktop'

    const gtTablet = im.greaterThan('tablet')
    const gtTabletLandscape = im.greaterThan('tablet-landscape')
    const gtDesktop = im.greaterThan('desktop')
    const ltTablet = im.lessThan('tablet')
    const ltTabletLandscape = im.lessThan('tablet-landscape')
    const ltDesktop = im.lessThan('desktop')*/
  }

  onMounted(nextTick(() => {
    onResize()
    useEventListener(window, 'resize', debouncedResize, { passive: true })
  }))

  return { 
    clientWidth,
    clientHeight,
    activeBreakpoint,
    breakpointLabels,
  }
}