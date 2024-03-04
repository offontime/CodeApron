<script setup lang="ts">
const val = '敏捷的狐狸跳过了懒惰的狗。'
let qrValue = val
setInterval(() => {
  qrValue = val + new Date()
  console.log(qrValue)
}, 1000)
</script>

<template>
  <ap-qrcode :text="qrValue" color="#f90"></ap-qrcode>
  <ap-pdf417 text="64387916487312" color="#f90"></ap-pdf417>
</template>
