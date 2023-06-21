<script setup lang="ts">
const props = defineProps({
  video: {
    type: String,
  },
})
</script>

<template>
  <div class="slidev-layout two-columns w-full h-full grid grid-cols-[1fr_230px] gap-4">
    <div class="col-left" style="">
      <slot />
    </div>
    <div class="col-right">
      <slot name="right">
        <v-click>
          <video width="886" height="1920" controls>
            <source :src="props.video" type="video/mp4">
          </video>
        </v-click>
      </slot>
    </div>
  </div>
</template>
