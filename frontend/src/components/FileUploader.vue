<script setup lang="ts">
import { useFileUploader } from '~/hooks'

interface Props {
  // 是否多文件上传
  multiple?: boolean
  // 上传文件的 MIME type
  mime?: string
  // 是否要开启目录上传 -- 非标准特性 有兼容性问题
  webkitdirectory?: boolean
}

// withDefaults 可以解决类型声明 props 类型的时候无法声明默认值的问题
const props = withDefaults(defineProps<Props>(), {
  // 默认单文件上传
  multiple: false,
  // 默认只支持上传图片
  mime: 'image/*',
  // 默认不开启目录上传
  webkitdirectory: false,
})

// 文件上传表单元素
const uploadFileRef = ref<HTMLInputElement>()
const uploadFile = useFileUploader({ directory: props.webkitdirectory })

const handleInputFileConfirm = () => {
  if (uploadFileRef.value?.files) {
    uploadFile(uploadFileRef.value?.files)
  }
}
</script>

<template>
  <!-- 文件上传容器 -->
  <div>
    <input
      display-none
      :multiple="multiple"
      :accept="mime"
      :webkitdirectory="webkitdirectory"
      type="file"
      ref="uploadFileRef"
      @input="handleInputFileConfirm"
    />
    <button btn @click="uploadFileRef!.click()">上传</button>
  </div>
</template>
