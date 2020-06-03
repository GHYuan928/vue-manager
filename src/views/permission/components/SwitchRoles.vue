<template>
  <div class="page">
    <div class="cur_role">
      当前角色: {{ roles }}
    </div>
    切换角色
    <el-radio-group v-model="switchRoles" size="medium">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['roles']),
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('user/changeRoles', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  .cur_role {
    margin-bottom: 30px;
  }
}
</style>
