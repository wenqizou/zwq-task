<template>
  <div class="layout">
    <header class="header">
      <nav class="nav" v-if="!token">
        <g-link class="nav__link" to="/register">注册</g-link>
        <g-link class="nav__link" to="/login">登录</g-link>
      </nav>
      <nav class="nav" v-else>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </nav>
      <h2>
        <g-link to="/">博客</g-link>
      </h2>
    </header>
    <el-container class="contain">
      <el-aside width="200px">
        <el-menu :default-active="active" @select="onSelect">
          <el-menu-item index="/">
            <i class="el-icon-star-off"></i>
            <span slot="title">最新动态</span>
          </el-menu-item>
          <el-menu-item index="/social">
            <i class="el-icon-mobile-phone"></i>
            <span slot="title">社交圈</span>
          </el-menu-item>
          <el-menu-item index="/blog">
            <i class="el-icon-service"></i>
            <span slot="title">博客列表</span>
          </el-menu-item>
          <el-menu-item index="/source">
            <i class="el-icon-printer"></i>
            <span slot="title">开源项目</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>
<script>
export default {
  data() {
    return {
      active: '',
      user: {},
      token: '',
    };
  },
  methods: {
    onSelect(index) {
      this.$router.push(index);
    },
    handleCommand(command) {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      this.$router.push('/');
      this.$message.success('退出登录');
    },
  },
  mounted() {
    let arr = this.$route.path.split('/');
    this.active = '/' + arr[1];
  },
  created() {
    let user = process.isClient ? sessionStorage.getItem('user') : '{}';
    let token = process.isClient ? sessionStorage.getItem('token') : '';
    user && (this.user = JSON.parse(user));
    token && (this.token = token);
  },
};
</script>
<style>
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  color: #409eff;
}
html,
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.contain {
  max-width: 1240px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
}

.header {
  margin-bottom: 20px;
  height: 300px;
  background-image: linear-gradient(
    120deg,
    rgb(38, 144, 249),
    rgb(252, 45, 45)
  );
  color: #fff;
}
.header h2 {
  margin: 0;
  padding: 40px 0 20px;
  text-align: center;
  color: #fff;
  font-size: 37px;
}
.header h2 a {
  color: #fff;
}
nav {
  float: right;
  padding:10px;
}
nav a {
  color: #fff;
}
.nav__link {
  margin-left: 20px;
}
.pages nav {
  padding: 10px 0;
}
.pages a {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: rgb(30, 32, 34);
  color: rgb(169, 162, 151);
}

.pages .active {
  background-color: rgb(0, 81, 166);
  color: rgb(232, 230, 227);
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
