<template>
  <Layout>
    <div class="login-page">
      <el-card class="box-card">
        <h1>登录</h1>
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="identifier" placeholder="请输入用户名或邮箱" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="onLogin">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </Layout>
</template>

<script>
import axios from 'axios';

export default {
  metaInfo: {
    title: '登录',
  },
  data() {
    return {
      identifier: '',
      password: '',
    };
  },
  methods: {
    onLogin() {
      const { identifier, password } = this;
      if (!identifier) {
        this.$message.error('请输入用户名或邮箱');
        return;
      }
      if (!password) {
        this.$message.error('请输入密码');
        return;
      }
      axios
        .post('http://121.196.182.50:1337/auth/local', {
          identifier,
          password,
        })
        .then((response) => {
          // Handle success.
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          sessionStorage.setItem('token', response.data.jwt);
          this.$message.success('登录成功');
          this.$router.go(-1);
        })
        .catch((error) => {
          // Handle error.
          error.response && this.$message.error('用户名或密码错误');
          console.log('An error occurred:', error.response);
        });
    },
  },
};
</script>
<style scoped>
.login-page {
  display: flex;
  justify-content: center;
}
.login-page .box-card {
  width: 480px;
}
.login-page .box-card h1 {
  text-align: center;
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-button {
  width: 70%;
}
</style>
