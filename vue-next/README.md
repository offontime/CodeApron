# @code-apron/vue-next

> Apron Design (Vue3) 的一个分支组件，用于在页面上生产各种码。
>
> （原始命名为 @qr-apron，但后续将会继续开发各种其他类型的条形码、二维码，因此更名为 @code-apron）

## 使用
可前往 [二维码 Qrcode - 组件 | Apron Design for Vue3](https://vue-next.apron.design/components/qrcode.html) 查看。

以下是一个简单的 demo：
```vue
<script setup>
import { QrCode } from '@code-apron/vue-next'
</script>

<template>
  <QrCode text="this is a qrcode"></QrCode>
</template>
```

## 开发者
主程：[田昊天](https://www.mitkimi.com/about)：一个说不清是前端还是全栈的“研发人员”。

同时，我们也希望开发者们可以加入进来。

## 新功能开发：

### 步骤
1. 前往 [Github 项目主页](https://github.com/offontime/CodeApron) 克隆代码。
2. 路由进 `CodeApron/vue-next` 安装依赖
    ```sh
    git clone git@github.com:offontime/CodeApron.git
    cd CodeApron/vue-next
    yarn
    ```
3. 启动项目
    > 我们会要求您拉一个自己的开发分支，例如：`feature-xxx`，开发并调试完成新功能后向我们提交 PR
    ```sh
    git checkout -b feature-xxx
    yarn dev
    ```

### 指南
1. 本项目使用基础包 `qrcode` 版本 ^1.5.3 作为渲染工具。在后续开发中如果有实际需求，则会根据情况升级此包。
2. 脚手架使用 vite 搭建，vue3-ts 编写。
3. 参与贡献请先阅读：[参与开发](https://vue-next.apron.design/docs/developer.html) 和 [如何优雅地在 Github 上贡献代码](https://vue-next.apron.design/docs/developer.html)