<script setup lang="ts">
import { uploadFile } from '~/api'

// 文件上传表单元素
const uploadFileRef = ref<HTMLInputElement>()

const handleUploadFileBtnClick = () => {
  // 没选择文件则不调用接口
  if (!uploadFileRef.value?.files?.length) return

  // 获取选择的第一个文件并调用接口上传
  const file = uploadFileRef.value.files[0]
  uploadFile('image', file)
}
</script>

<template>
  <!-- 文件上传容器 -->
  <div>
    <input type="file" accept="image/*" ref="uploadFileRef" />
    <button @click="handleUploadFileBtnClick">上传</button>
  </div>
</template>
