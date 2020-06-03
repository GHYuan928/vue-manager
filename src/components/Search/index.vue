<template>
  <div class="header-search" :class="{'show':show}">
    <svg-icon class-name="search-icon" icon-class="search" @click.native="toggleShow" />
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="搜索"
      class="header-search-select"
      @change="change"
      @blur="blur"
    >
      <el-option v-for="i in options" :key="i.item.path" :value="i.item" :label="i.item.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script>
import Fuse from 'fuse.js'
import path from 'path'
import { log } from 'util'
export default {
  data() {
    return {
      show: false,
      search: '',
      options: [],
      searchPool: [],
      fuse: undefined
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    searchPool(list) {
      this.initFuse(list)
    }
    // show(v) {
    //   console.log(v)
    // if (v) {
    //   document.body.addEventListener('click', this.close)
    // } else {
    //   document.body.removeEventListener('click', this.close)
    // }
    // }
  },
  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const route of routes) {
        if (route.hidden) { continue }
        const data = {
          path: path.resolve(basePath, route.path),
          title: [...prefixTitle]
        }
        if (route.meta && route.meta.title) {
          data.title = [...data.title, route.meta.title]
          if (route.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }
        if (route.children) {
          const tempRoutes = this.generateRoutes(route.children, route.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    initFuse(list) {
      const data = {
        shouldSort: true, // 是否按分数对结果列表排序
        includeScore: true, //  是否应将分数包含在结果集中。0分表示完全匹配，1分表示完全不匹配。
        threshold: 0.4, // 匹配算法阈值。阈值为0.0需要完全匹配（字母和位置），阈值为1.0将匹配任何内容。
        /**
         * 确定匹配与模糊位置（由位置指定）的距离。一个精确的字母匹配，即距离模糊位置很远的字符将被视为完全不匹配。
         *  距离为0要求匹配位于指定的准确位置，距离为1000则要求完全匹配位于使用阈值0.8找到的位置的800个字符以内。
         */
        location: 0, // 确定文本中预期找到的模式的大致位置。
        distance: 100,
        maxPatternLength: 32, // 模式的最大长度
        minMatchCharLength: 1, // 模式的最小字符长度
        // 搜索标题与作者名
        keys: [{
          name: 'title',
          weight: 0.7
        }, {
          name: 'path',
          weight: 0.3
        }]
      }
      // 参数：1 搜索的所有数据 2 设置：比如搜索那个以及权重等
      this.fuse = new Fuse(list, data)
    },
    toggleShow() {
      if (this.show === false) {
        this.$refs.headerSearchSelect.focus()
      }
      this.show = !this.show
    },
    querySearch(query) {
      if (query) {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    },
    change(item) {
      this.search = ''
      this.$router.push(item.path)
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    blur() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
// .header-search-select {
//   .el-input__inner{
//     background-color: red;
//   }
// }
</style>
<style lang="scss" scoped>
.header-search {
  .search-icon {
    vertical-align: middle;
    font-size: 18px;
  }
  .header-search-select {
    transition: width .3s ease-in;
    width: 0;
    overflow: hidden;
    background: transparent;
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    ::v-deep .el-input__inner{
      border: none;
      padding-left: 0;
      padding-right: 0;
      border-radius: 0;
      border-bottom: 1px solid #d9d9d9;
    }
  }
  &.show{
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
