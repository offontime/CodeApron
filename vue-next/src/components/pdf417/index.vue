<template>
  <div class="apron-pdf417">
    <img :src="dataUrl" :style="{
      width: `${width}px`,
      height: `${height}px`,
      padding: `${margin}px`
    }" />
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import generateBarcode from './source/main.js'

defineOptions({
  name: 'ApPdf417'
})
const props = defineProps({
  text: {
    type: String,
    default: 'Apron Design pdf417 code'
  },
  width: {
    type: Number,
    default: 300
  },
  height: {
    type: Number,
    default: 150,
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

const dataUrl = generateBarcode(props.text, props.color, props.backgroundColor)

</script>

<style lang="less" scoped>
.apron-pdf417 {
  position: relative;
  padding: 0!important;
  & > * {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>