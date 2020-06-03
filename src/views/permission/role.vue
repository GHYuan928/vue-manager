<template>
  <div class="app_container">
    <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="handleAddRole">添加角色</el-button>
    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column
        align="center"
        label="Role Key"
        width="130"
      >
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Role Name"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column
        label="Description"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="Operations"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogType==='edit'?'编辑角色':'新角色'"
      :visible.sync="dialogVisible"
    >
      <el-form :model="role" label-width="80px">
        <el-form-item label="Name">
          <el-input v-model="role.name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="role.description"
            type="textarea"
            placeholder="Role Description"
            :autosize="{ minRows: 2, maxRows: 6 }"
          />
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="confirmRole">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getRoles, getRoutes, addRole, updateRole, deleteRole } from '@/api/role'
import { deepClone } from '@/utils/index'
import path from 'path'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      rolesList: [],
      dialogVisible: false,
      dialogType: '',
      role: Object.assign({}, defaultRole),
      routes: [], // 处理后的路由
      defaultProps: {
        label: 'title',
        children: 'children'
      },
      checkStrictly: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getRoles()
    this.getRoutes()
  },
  methods: {
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data // 后端返回的路由表
      // 通过路由表生成路由
      this.routes = this.generateRoutes(res.data)
    },
    generateRoutes(routes, basePath = '/') {
      const res = []
      routes.forEach(item => {
        if (!item.hidden) {
          // 当 children 只有1个，或者 没有children, onlyOneShowChild存在
          const onlyOneShowChild = this.onlyOneShowingChild(item.children, item)
          // 当存在 children 且 存在 onlyOneShowChild 且alwaysShow==false
          if (item.children && onlyOneShowChild && !item.alwaysShow) {
            // 替换
            item = onlyOneShowChild
          }

          const data = {
            path: path.resolve(basePath, item.path),
            title: item.meta && item.meta.title
          }
          if (item.children) {
            data.children = this.generateRoutes(item.children, data.path)
          }
          res.push(data)
        }
      })
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }
      return false
    },
    generateTree(routes, basePath, checkedKeys) {
      const res = []
      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }
        // 当前路由存在于checkedKeys中，或者 子路由存在于checkedKeys中，
        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    generateKeys(permissionRoutes) {
      let arr = []
      permissionRoutes.forEach(route => {
        if (route.children) {
          const tmp = this.generateKeys(route.children)
          if (tmp.length > 0) {
            arr = arr.concat(tmp)
          }
        }
        arr.push(route.path)
      })
      return arr
    },
    handleAddRole() {
      this.dialogVisible = true
      this.dialogType = 'new'
    },
    handleEdit(scope) {
      this.role = deepClone(scope.row)
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.$nextTick(() => {
        // 生成 tree能识别的 路由
        const routes = this.generateRoutes(this.role.routes)
        // 获取当前角色路由所有 path
        const keys = this.generateKeys(routes)
        // tree 设置 选中的 keys.
        this.$refs.tree.setCheckedKeys(keys)
        this.checkStrictly = false
      })
    },
    handleDelete(scope) {
      const { $index, row } = scope
      this.$confirm('真的要删除这个角色吗?', 'warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'
      // 得到 选中的路由 path 数组
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 根据 path数组，在路由表中查找到 route 集合
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)
      if (isEdit) {
        // 编辑模式
        await updateRole(this.role, this.role.key)
        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        // 新增
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }
      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>角色Key: ${key}</div>
            <div>角色名: ${name}</div>
            <div>详情: ${description}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.permission-tree{
  margin-bottom: 30px;
}
</style>
