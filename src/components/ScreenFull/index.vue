<template>
  <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="screenChange" />
</template>

<script>
import screenfull from 'screenfull'
export default {
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.destory()
  },
  methods: {
    screenChange() {
      console.log(screenfull.isEnabled)
      if (!screenfull.isEnabled) {
        this.$message({
          message: '你的浏览器不支持该功能',
          type: 'warning'
        })
      } else {
        screenfull.toggle()
      }
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
      console.log('screen change', this.isFullscreen)
    },
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    destory() {
      if (screenfull.isEnabled) {
        screenfull.off('change', this.change)
      }
    }
  }
}
</script>

<style>

</style>
