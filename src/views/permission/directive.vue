<template>
  <div class="app_container">
    <switch-roles />
    <div :key="key" style="margin-top: 30px">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          仅仅
          <el-tag size="small">admin</el-tag> 能看到这段文字
        </span>
        <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
          v-permission="['admin']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['editor']" class="permission-alert">
          仅仅
          <el-tag class="permission-tag" size="small">editor</el-tag> 能看到这个
        </span>
        <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">
          v-permission="['editor']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag> and
          <el-tag class="permission-tag" size="small">editor</el-tag> can see this
        </span>
        <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>
    <div :key="'checkPermission'+key" style="margin-top:60px;">
      <aside>
        在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。
        <br> 例如
      </aside>
      <el-tabs type="border-card" :before-leave="beforeLeave" style="width:550px;margin-top:30px">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          admin 能看到这个
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          editor 能看到这个
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin & Editor">
          admin editor 都能看到
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SwitchRoles from './components/SwitchRoles'
import permission from '@/directive/permission/index' // 权限判断指令
import { checkPermission } from '@/utils/permission' // 权限判断函数
export default {
  components: {
    SwitchRoles
  },
  directives: {
    permission
  },
  data() {
    return {
      key: 1
    }
  },
  methods: {
    checkPermission,
    beforeLeave(activeName, oldActiveName) {
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.app_container{
  .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  .permission-sourceCode{
    margin-left: 15px;
  }
}
</style>
