<script setup lang="ts">
import { multipleUploadFile, singleUploadFile, uploadDirectory } from '~/api'

interface Props {
  // 是否多文件上传
  multiple?: boolean
  // 上传文件的 MIME type
  mime?: string
  // 是否要开启目录上传 -- 非标准特性 有兼容性问题
  webkitdirectory?: boolean
}

// withDefaults 可以解决类型声明 props 类型的时候无法声明默认值的问题
withDefaults(defineProps<Props>(), {
  // 默认单文件上传
  multiple: false,
  // 默认只支持上传图片
  mime: 'image/*',
  // 默认不开启目录上传
  webkitdirectory: false,
})

// 文件上传表单元素
const uploadFileRef = ref<HTMLInputElement>()

const handleInputFileConfirm = () => {
  // 没选择文件则不调用接口
  if (!uploadFileRef.value?.files?.length) return

  // 开启目录上传的话则只调用目录上传接口
  if (uploadFileRef.value.webkitdirectory) {
    const files = uploadFileRef.value.files
    uploadDirectory('file', files)
    return
  }

  // 根据是否有 multiple 属性来决定调用哪个接口
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
