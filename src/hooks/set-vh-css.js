/*
 * use true vh in css for mobile
 * @see https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 * height: calc(var(--vh, 1vh) * 100);
 */

import { useEventListener } from '@vueuse/core'
import { nextTick, ref, onMounted } from 'vue'
import throttle from 'lodash/throttle'

export default function useSetVhCss() {
  const throttledResize = throttle(onResize, 500)
  const vh = ref(0)

  function onResize() {
    vh.value = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh.value}px`)
  }

  onMounted(() => {
    onResize()
    useEventListener(window, 'resize', throttledResize, { passive: true })
  })

  return {
    vh,
  }
}
