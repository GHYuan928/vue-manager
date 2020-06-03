<template>
  <div class="navbar-container">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <Breadcrumb />
    <div class="right-menu">
      <search class="right-menu-item" />
      <screen-full class="right-menu-item" />
      <el-dropdown trigger="click">
        <div class="avator-container">
          <img class="user-avatar" src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg" alt="avator">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link :to="'/'"><el-dropdown-item>首页</el-dropdown-item></router-link>
          <router-link :to="'/profile/index'"><el-dropdown-item>个人中心</el-dropdown-item></router-link>
          <a href="https://github.com/GHYuan928" target="_blank"><el-dropdown-item>Github项目</el-dropdown-item></a>
          <a href="https://gitee.com/ioJaJs" target="_blank"><el-dropdown-item>gitee项目</el-dropdown-item></a>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import Search from '@/components/Search'
import ScreenFull from '@/components/ScreenFull'
import { mapGetters } from 'vuex'
export default {
  components: {
    Hamburger,
    Breadcrumb,
    Search,
    ScreenFull
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login?redirect=' + this.$route.fullPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-container{
  height: 50px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .hamburger-container{
    height: 100%;
    line-height: 48px;
    float: left;
    cursor: pointer;
    transition: background .3s;
    &:hover{
      background: rgba(0, 0, 0, .025);
    }
  }
  .right-menu {
    float: right;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    .avator-container{
      margin-top: 5px;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        cursor: pointer;
      }
      .el-icon-caret-bottom {
        transform: translate(10%,-100%)
      }
    }
    .right-menu-item {
      font-size: 18px;
      color: #5a5e66;
      margin-right: 20px;
    }

  }
}
</style>
