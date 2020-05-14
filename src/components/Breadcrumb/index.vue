<template>
  <el-breadcrumb separator="/" class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="route in levelList" :key="route.path">
        <span v-if="route.path === $route.path || route.redirect==='noRedirect'" class="noredirect">{{ route.meta.title }}</span>
        <router-link v-else :to="route" class="redirect">{{ route.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (first.path !== '/dashboard') {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}, ...matched]
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb{
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
  font-size: 14px;
  .redirect{
    font-weight: 400;
  }
  .noredirect{
    color: #97a8be;
    cursor: text;
  }
}
</style>
