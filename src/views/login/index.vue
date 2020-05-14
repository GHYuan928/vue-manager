<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="user">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.user"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="大写已开启" placement="right" effect="light" manual>
        <el-form-item prop="pwd">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="password"
            v-model="loginForm.pwd"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
      <div style="position:relative">
        <div class="tips">
          <span>用户名 : admin</span>
          <span>密码 : any</span>
        </div>
        <div class="tips">
          <span>用户名 : editor</span>
          <span>密码 : any</span>
        </div>
        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          使用三方登录
        </el-button>
      </div>
    </el-form>
    <el-dialog
      title="请选择三方登录"
      :visible.sync="showDialog"
    >
      <span>本地不能模拟，请结合自己业务进行模拟</span>
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { validUsername, validPassword } from '@/utils/validate'
import SocialSign from './components/SocialSign'
export default {
  components: {
    SocialSign
  },
  data() {
    const validateUser = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('输入的用户名错误'))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        user: 'admin',
        pwd: '111111'
      },
      loginRules: {
        user: [{ required: true, trigger: 'blur', validator: validateUser }],
        pwd: [{ required: true, trigger: 'change', validator: validatePwd }]
      },
      passwordType: 'password',
      loading: false,
      capsTooltip: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: undefined
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.loading = true
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    checkCapslock(e) {
      // 检测是否开启大写
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
/** 修改 element-ui css */
.login-container{
  .el-input{
    display: inline-block;
    height: 47px;
    width: 85%;
    input{
      background-color: transparent;
      padding: 12px 5px 12px 15px;
      border: 0px;
      border-radius: 0px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
    }
  }
  .el-form-item{
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container{
  width: 100%;
  height: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form{
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container{
      position: relative;
      .title{
        font-size: 26px;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
      }
    }
    .show-pwd{
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span:first-of-type{
        margin-right: 18px;
      }
    }
    .thirdparty-button{
      position: absolute;
      right: 0;
      bottom: 6px;
    }
  }
}
.svg-container{
  padding: 6px 5px 6px 15px;
  color: $dark_gray;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
  line-height: 36px;
}
</style>
