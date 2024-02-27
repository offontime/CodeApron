<template>
  <div class="apron-qr-code">
    <canvas v-if="mode === 'canvas'" ref="renderCanvas" />
    <img v-else :src="dataUrl" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import qrcode from 'qrcode'

defineOptions({
  name: 'ApQrcode'
})
const props = defineProps({
  text: {
    type: String,
    default: 'Apron Design QrCode'
  },
  mode: {
    type: String,
    default: 'image' // use image/canvas
  },
  size: {
    type: [String, Number],
    default: ''
  },
  color: {
    type: String,
    default: '#393939'
  },
  backgroundColor: {
    type: String,
    default: '#FFFFFF'
  },
  margin: Number
})

const text = ref(props.text)
const emits = defineEmits({
  // fail: () => { console.log(fail) }
})

const dataUrl = ref('')

const renderCanvas = ref(null)


function makeQrCode (val) {
  const opts = {
    errorCorrectionLevel: 'H',
    width: props.size,
    margin: props.margin,
    color: {
      light: props.backgroundColor,
      dark: props.color
    }
  }
  if (props.mode === 'canvas') {
    // qrcode.toCanvas(renderCanvas, 'qrVal.value', (err) => {
    //   if (err) {
    //     alert(err)
    //   }
    // })
  } else {
    qrcode.toDataURL(val || props.text, opts, (err, url) => {
      if (err) {
        // 报错
        alert(err)
      }
      else {
        dataUrl.value = url
      }
    })
  }
}

makeQrCode(text.value)

</script>

<style lang="less">
.apron-qr-code {
  position: relative;
  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>