<script setup lang="ts">
import { QrCode } from './components/'
const val = '敏捷的狐狸跳过了懒惰的狗。'
let qrValue = val
setInterval(() => {
  qrValue = val + new Date()
  console.log(qrValue)
}, 1000)
</script>

<template>
  <qr-code :text="qrValue" color="#f90"></qr-code>
</template>
