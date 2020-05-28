<template>
  <div class="error">
    <div>
      <h3>Page not found 404</h3>
      <el-button type="primary" @click="$router.push('/')">返回主页</el-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.error{
  padding: 30px;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
