<script setup lang="ts">
const multiple = ref(false)
const directory = ref(false)
</script>

<template>
  <div flex-col flex-center gap-10px>
    <FileUploader :multiple="multiple" :webkitdirectory="directory" />
    <button btn @click="multiple = !multiple">
      多文件上传: {{ multiple }}
    </button>
    <button btn @click="directory = !directory">
      目录上传: {{ directory }}
    </button>
  </div>
</template>
