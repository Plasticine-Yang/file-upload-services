<script setup lang="ts">
import { useFileUploader } from '~/hooks'
import { vDroppable } from '~/directives'

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

const uploadFileRef = ref<HTMLInputElement>()
const uploadFile = useFileUploader({ directory: props.webkitdirectory })
</script>

<template>
  <input
    display-none
    :multiple="multiple"
    :accept="mime"
    :webkitdirectory="webkitdirectory"
    type="file"
    ref="uploadFileRef"
    @input="uploadFile(uploadFileRef?.files)"
  />
  <div
    flex-col
    flex-center
    w-xl
    h-sm
    border-1
    border-dashed
    rounded-3
    border-gray-6
    cursor-pointer
    hover:border-cyan
    transition-200
    select-none
    v-droppable.highlight="{ highlightClassName: 'custom-highlight' }"
    @click="uploadFileRef?.click()"
    @drop="e => uploadFile(e.dataTransfer?.files)"
  >
    <div i-carbon:cloud-upload text-16></div>
    <span>Drop file here or <span text-cyan>click to upload</span></span>
  </div>
</template>

<style scoped>
.custom-highlight {
  background: rgba(64, 158, 255, 0.2);
  border-color: rgb(64, 158, 255);
}
</style>
