<template>
  <div class="apron-qr-code">
    <img :src="dataUrl" />
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

makeQrCode(text.value)

</script>

<style lang="less">
.apron-qr-code {
  position: relative;
  padding: 0!important;
  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>