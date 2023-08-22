import { DirectiveBinding } from 'vue'

interface El extends Element {
  clickOutsideEvent: (e: Event) => void
}

export default {
  beforeMount(el: El, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event, el)
      }
    }

    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: El) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
}
