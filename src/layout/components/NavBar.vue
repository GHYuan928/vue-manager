<template>
  <div class="navbar-container">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <Breadcrumb />
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  components: {
    Hamburger,
    Breadcrumb
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
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
}
</style>
