<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { logout } from '@/api/user'
import cookies from '@/libs/cookies'

export default {
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/user', {
      setUser: 'set'
    }),
    /**
     * @description 登出
     */
    logOff () {
      this.$confirm('注销当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
        confirmButtonText: '确定注销',
        cancelButtonText: '放弃',
        type: 'warning'
      }).then(() => {
        logout().then(async () => {
          cookies.remove('token') // 清空token
          await this.setUser({}) // 清空保存的用户信息
          this.$router.push({ name: 'login' }) // 跳转到登录页
        })
      }).catch(() => {
        this.$message('放弃注销用户')
      })
    }
  }
}
</script>
