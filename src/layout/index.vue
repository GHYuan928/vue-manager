<template>
  <div class="app-wrapper" :class="classObj">
    <side-bar class="sidebar-container" />
    <div :class="{hasTagsView: needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script>
import RightPanel from '@/components/RightPanel'
import { AppMain, NavBar, Settings, SideBar, TagsView } from './components'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppMain,
    NavBar,
    Settings,
    SideBar,
    TagsView,
    RightPanel
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.app-wrapper{
  @include clearFix;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
