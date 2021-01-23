<template>
  <Layout>
    <div class="login-page">
      <el-card class="box-card">
        <h1>注册</h1>
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="onRegister">注册</el-button>
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
    title: '注册',
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    onRegister() {
      const { username, email, password } = this;
      if (!username) {
        this.$message.error('请输入用户名');
        return;
      }
      if (!email) {
        this.$message.error('请输入邮箱');
        return;
      }
      if (!password) {
        this.$message.error('请输入密码');
        return;
      }
      console.log(username, email, password);
      axios
        .post('http://121.196.182.50:1337/auth/local/register', {
          username,
          email,
          password,
        })
        .then((response) => {
          // Handle success.
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
          sessionStorage.setItem('token', response.data.jwt);
          this.$message.success('注册成功');
          this.$router.go(-1);
        })
        .catch((error) => {
          // Handle error.
          const { data } = error.response;
          console.log(data);
          let message = '';
          data.message.forEach((val) => {
            val.messages.forEach((val1) => {
              message += val1.message + '.';
            });
          });
          message && this.$message.error(message);
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
