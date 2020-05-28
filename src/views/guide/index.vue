<template>
  <div class="guide-container">
    <h4>引导页面</h4>
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      展示引导效果
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css'
import steps from './step'
export default {
  name: 'Guide',
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>

<style scoped>
.guide-container {
  padding: 30px;
}
</style>
