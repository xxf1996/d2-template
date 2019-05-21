<template>
  <div class="login">
    <el-card>
      <h2 style="text-align: center;">{{appName}}</h2>
      <el-form
        class="login-form"
        ref="loginForm"
        :rules="rules"
        :model="loginData"
        @keyup.enter.native="submit">
        <el-form-item prop="uesrname">
          <el-input type="text" v-model="loginData.username" placeholder="用户名">
            <d2-icon slot="prepend" name="user-circle-o"></d2-icon>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginData.password" placeholder="密码">
            <d2-icon slot="prepend" name="keyboard-o"></d2-icon>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input class="code-input" type="text" v-model="loginData.code" placeholder="- - - -">
            <template slot="prepend">验证码</template>
            <template slot="append">
              <identify :identifyCode="identifyCode" :content-width="80" :content-height="38" @click.native="refreshCode"></identify>
            </template>
          </el-input>
        </el-form-item>
        <el-button size="default" @click="submit" type="primary" class="login-btn">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapActions } from 'vuex'
import util from '@/libs/util'
import Identify from './Identify.vue'
import packageInfo from '../../../package.json'

export default {
  name: 'Login',
  components: {
    Identify
  },
  data () {
    return {
      appName: packageInfo.appName,
      loginData: {
        username: 'admin',
        password: 'admin',
        code: ''
      },
      // 校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      code: '1234567890abcdefghijklmnopqrstuvwsyz',
      identifyCode: ''
    }
  },
  methods: {
    ...mapActions('d2admin/account', {
      loadAccount: 'load'
    }),
    ...mapActions('d2admin/user', {
      setUser: 'set'
    }),
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid && this.loginData.code === this.identifyCode) {
          login({
            username: this.loginData.username,
            password: this.loginData.password
          }).then(async (res) => {
            // 保存token作为登录的凭据
            util.cookies.set('token', res.token)
            await this.setUser({
              name: res.name
            })
            await this.loadAccount()
            // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
            const path = util.cookies.get('redirect')
            // 根据是否存有重定向页面判断如何重定向
            this.$router.replace(path ? { path } : '/index')
            // 删除 cookie 中保存的重定向页面
            util.cookies.remove('redirect')
          })
        }
      })
    },
    makeCode (l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.code[this.randomNum(0, this.code.length)]
      }
    },
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(4)
    }
  },
  created () {
    this.makeCode(4)
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/public.scss';
  .login {
    width: 300px;
  }
  .login-btn {
    width: 100%;
  }
  .code-input .el-input-group__append {
    padding: 0;
  }
</style>
