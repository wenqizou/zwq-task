<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <el-button
              @click="$router.go(-1)"
              type="text"
              icon="el-icon-d-arrow-left"
            >
              返回
            </el-button>
            <span style="margin-left: 10px">{{ $page.post.title }}</span>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right">
              <el-button
                @click="share()"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-share"
                >分享
              </el-button>
              <el-button
                @click="edit"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-edit"
                v-if="
                  token &&
                  user.username === $page.post.users_permissions_user.username
                "
                >编辑
              </el-button>
              <el-button
                style="padding: 3px 0"
                type="text"
                icon="el-icon-more-outline"
                @click="more"
                >更多博客
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ $page.post.create_time }} <br />
        更新 {{ $page.post.update_time }}
      </div>
      <div
        style="
          font-size: 1.1rem;
          line-height: 1.5;
          color: #303133;
          border-bottom: 1px solid #e4e7ed;
          padding: 5px 0px 5px 0px;
        "
      >
        <pre style="font-family: '微软雅黑'">{{ $page.post.description }}</pre>
      </div>
      <div
        v-html="mdToHtml($page.post.content)"
        class="markdown-body"
        style="padding-top: 20px"
      ></div>
    </el-card>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  post:strapiPost(id: $id){
    title,
    id,
    users_permissions_user{
      username,
      email,
    },
    created_at,
    updated_at,
    content,
    description
  }
}
</page-query>
<script>
let MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
export default {
  metaInfo: {
    title: '博客详情',
  },
  data() {
    return {
      user: {},
      token: '',
    };
  },
  methods: {
    share() {},
    edit() {},
    more() {},
    mdToHtml(mdContent) {
      return md
        .render(mdContent)
        .replace(/src="/g, 'src="http://121.196.182.50:1337');
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
