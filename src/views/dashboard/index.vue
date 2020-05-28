<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import adminDashboard from './admin'
import editorDashboard from './editor'
import { mapGetters } from 'vuex'
export default {
  components: {
    adminDashboard,
    editorDashboard
  },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters(['roles'])
  },
  created() {
    if (this.roles.includes('admin')) {
      this.currentRole = 'adminDashboard'
    } else if (this.roles.includes('editor')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>

<style>

</style>
