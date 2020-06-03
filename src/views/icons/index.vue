<template>
  <div class="app_container">
    <aside>
      <a href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html" target="_blank">添加和使用说明</a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="图标">
        <div class="grid">
          <div v-for="item in svgIcons" :key="item" @click.stop="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <svg-icon :icon-class="item" class-name="disabled" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="element-ui 图标">
        <div class="grid">
          <div v-for="item in elementIcons" :key="item" @click.stop="handleClipboard(generateIconCode(item),$event)">
            <el-tooltip class="item" effect="dark" placement="top">
              <div slot="content">
                {{ generateIconCode(item) }}
              </div>
              <div class="icon-item">
                <i :class="'el-icon-'+item" />
                <span>{{ item }}</span>
              </div>
            </el-tooltip>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import svgIconsName from './svg-icons'
import elementIcons from './element-ui-icons'
export default {
  name: 'Icons',
  data() {
    return {
      svgIcons: svgIconsName,
      elementIcons
    }
  },
  mounted() {
    console.log(this.svgIcons)
  },
  methods: {
    generateIconCode(item) {
      return `<svg-icon icon-class='${item}'/>`
    },
    handleClipboard(text, event) {
      console.log(text, event)
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.grid{
  position: relative;
  display: grid;
  // repeat 重复次数，重复的值。 auto-fill: 固定大小，但个数不确定； 1fr 为比例关系；minmax表示列宽不小于120px，不大于1fr
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  .icon-item{
    margin: 10px;
    height: 85px;
    text-align: center;
    width: 100px;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    span{
      margin-top: 10px;
      font-size: 16px;
    }
    .disabled {
      pointer-events: none; // 让鼠标事件失效，如不使用，click事件会有问题
    }
  }
}

</style>
