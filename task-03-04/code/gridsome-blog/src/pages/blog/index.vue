<template>
  <Layout>
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input
        placeholder="请输入关键字"
        v-model="searchKey"
        clearable
        style="width: 300px"
      ></el-input>
      <el-button
        @click="search"
        icon="el-icon-search"
        style="margin-left: 10px"
        circle
        plain
      ></el-button>
      <el-button
        @click="$share()"
        style="margin-left: 10px"
        icon="el-icon-share"
        type="warning"
        plain
        circle
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        round
        plain
        style="float: right"
        @click="goAdd"
      >
        写博文
      </el-button>
    </el-card>
    <el-card
      shadow="hover"
      v-for="(item, index) in $page.posts.edges"
      :key="'p' + index"
      style="margin-bottom: 20px"
      v-if="!item.node.hide"
    >
      <div slot="header">
        <el-row>
          <el-col :span="16">
            <span>
              <a
                style="text-decoration: none; cursor: pointer"
                @click="goDetails(item.node.id)"
              >
                <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
                {{ item.node.title }}
              </a>
            </span>
          </el-col>
          <el-col :span="8">
            <div style="text-align: right">
              <el-button
                @click="$share('/blog/detail/' + item.node.id)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-share"
              ></el-button>
              <el-button
                @click="editBlog(item.node.id)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-edit"
                v-if="
                  token &&
                  user.username === item.node.users_permissions_user.username
                "
              ></el-button>
              <el-button
                @click="deleteBlog(item.node.id)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-delete"
                v-if="
                  token &&
                  user.username === item.node.users_permissions_user.username
                "
              ></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        最近更新 {{ item.node.updated_at | dateFilter }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          line-height: 1.5;
          color: #303133;
          padding: 10px 0px 0px 0px;
        "
      >
        {{ item.node.description }}
      </div>
    </el-card>
    <div class="pages">
      <Pager :info="$page.posts.pageInfo" />
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
  posts:allStrapiPost(perPage: 5, page: $page) @paginate{
    pageInfo{
      totalPages,
      currentPage
    }
    edges{
      node{
        id,
        users_permissions_user{
          username,
          email,
        },
        title,
        created_at,
        updated_at,
        content,
        description
      }
    }
    totalCount
  }
}
</page-query>
<script>
import { Pager } from 'gridsome';
import axios from 'axios';
export default {
  components: { Pager },
  metaInfo: {
    title: '博客列表',
  },
  data() {
    return {
      user: {},
      searchKey: '',
      token: '',
    };
  },
  methods: {
    search() {
      let list = this.$page.posts.edges;
      for (let i = 0; i < list.length; i++) {
        list[i].node.hide = list[i].node.title.indexOf(this.searchKey) < 0;
      }
      this.$page.posts.edges = [];
      this.$page.posts.edges = list;
    },
    goAdd() {
      if (!this.token) {
        this.$message({
          message: '请先登录！',
          type: 'warning',
        });
        return;
      }
      this.$router.push('/blog/add');
    },
    goDetails(id) {
      this.$router.push('/blog/detail/' + id);
    },
    editBlog(id) {
      if (!this.token) {
        this.$message({
          message: '请先登录！',
          type: 'warning',
        });
        return;
      }
      this.$router.push('/blog/edit/' + id);
    },
    deleteBlog(id) {
      this.$confirm('是否永久删除该博客?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          await axios.delete('http://121.196.182.50:1337/posts/' + id, {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          });
          this.$message.success('删除成功');
        } catch (e) {
          this.$message.error('删除失败，请稍后重试');
        }
      });
    },
  },
  created() {
    let user = process.isClient ? sessionStorage.getItem('user') : '{}';
    let token = process.isClient ? sessionStorage.getItem('token') : '';
    user && (this.user = JSON.parse(user));
    token && (this.token = token);
  },
};
</script>
