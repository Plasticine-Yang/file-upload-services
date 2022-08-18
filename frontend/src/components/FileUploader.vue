<script setup lang="ts">
import { multipleUploadFile, singleUploadFile } from '~/api'

interface Props {
  multiple?: boolean
}

// withDefaults 可以解决类型声明 props 类型的时候无法声明默认值的问题
withDefaults(defineProps<Props>(), {
  // 默认单文件上传
  multiple: false,
})

// 文件上传表单元素
const uploadFileRef = ref<HTMLInputElement>()

const handleInputFileConfirm = () => {
  // 没选择文件则不调用接口
  if (!uploadFileRef.value?.files?.length) return

  // 根据是否有 multiple 属性来决定调用哪个接口
  console.log(uploadFileRef.value.multiple)
  if (uploadFileRef.value.multiple) {
    const files = uploadFileRef.value.files
    multipleUploadFile('file', files)
  } else {
    // 获取选择的第一个文件并调用接口上传
    const file = uploadFileRef.value.files[0]
    singleUploadFile('file', file)
  }
}
</script>

<template>
  <!-- 文件上传容器 -->
  <div>
    <input
      :multiple="multiple"
      display-none
      type="file"
      accept="image/*"
      ref="uploadFileRef"
      @input="handleInputFileConfirm"
    />
    <button btn @click="uploadFileRef!.click()">上传</button>
  </div>
</template>
