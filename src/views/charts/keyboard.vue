<template>
  <div class="app_container">
    <charts height="100%" width="100%" />
  </div>
</template>

<script>
import charts from '@/components/Charts/keyboard'
export default {
  name: 'KeyboardChart',
  components: {
    charts
  }
}
</script>

<style lang="scss" scoped>
.app_container {
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
