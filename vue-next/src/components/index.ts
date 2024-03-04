import Qrcode from './qrcode.vue'
import Pdf417 from './pdf417/index.vue'

const components = [
  Qrcode, Pdf417
]

const install = function (Vue) {
  if (install.installed) {
    return false
  }
  components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Qrcode,
  Pdf417
}