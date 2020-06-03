<template>
  <div id="tags-view" class="tags-view-container">
    <ScrollPane class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        :key="tag.path"
        ref="tag"
        tag="span"
        class="tags-view-item"
        :class="isActive(tag)?'active':''"
        :to="{path:tag.path,query:tag.query,fullPath:tag.fullPath}"
      >
        {{ tag.title }}
        <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </ScrollPane>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
export default {
  components: {
    ScrollPane
  },
  data() {
    return {
      affixTags: []
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    initTags() {
      // 得到 affix == true 的所有路由
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    filterAffixTags(routes, asePath = '/') {
      // 所有路由拍平 && affix=true 会固定在 不会删除
      let tags = []
      routes.forEach(item => {
        if (item.meta && item.meta.affix) {
          const tagPath = path.resolve(asePath, item.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: item.name,
            meta: { ...item.meta }
          })
        }
        if (item.children) {
          const tmpTags = this.filterAffixTags(item.children, item.path)
          if (tmpTags.length >= 1) {
            tags = [...tags, ...tmpTags]
          }
        }
      })
      return tags
    },
    isAffix(tag) {
      return tag.meta.affix
    },
    isActive(route) {
      if (route.path === this.$route.path) {
        return true
      }
      return false
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(() => {
        // 选择路由
        const lastRoute = this.visitedViews.pop()
        if (lastRoute) {
          this.$router.push(lastRoute)
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container{
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    height: 100%;
    .tags-view-item {
      display: inline-block;
      border: 1px solid #d8dce5;
      cursor: pointer;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      margin-left: 15px;
      margin-top: 4px;
      &.active{
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background-color: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 2px;
          vertical-align: 1px;
        }
      }
      .el-icon-close{
        width: 16px;
        height: 16px;
        text-align: center;
        transition: background-color 0.3s cubic-bezier(.645, .045, .355, 1);
        border-radius: 50%;
        &::before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -1px;
        }
        &:hover{
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

}
</style>
