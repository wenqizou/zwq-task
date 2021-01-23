<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px">
      <div slot="header">
        <el-row>
          <el-col :span="12">
            <span>{{ $page.posts.edges[0].node.title }}</span>
          </el-col>
        </el-row>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: #606c71">
        发布 {{ $page.posts.edges[0].node.created_at | dateFilter }} <br />
        更新 {{ $page.posts.edges[0].node.updated_at | dateFilter }}
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
        {{ $page.posts.edges[0].node.description }}
      </div>
      <div
        v-html="mdToHtml($page.posts.edges[0].node.content)"
        class="markdown-body"
        style="padding-top: 20px"
      ></div>
    </el-card>
  </Layout>
</template>
<page-query>
query{
  posts:allStrapiPost(sortBy: "updated_at", order: DESC, limit: 1){
    edges{
      node{
        title,
        id,
        created_at,
        updated_at,
        content,
        description
      }
    }
  }
}
</page-query>
<script>
let MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

export default {
  metaInfo: {
    title: '博客列表',
  },
  data() {
    return { token: '' };
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
};
</script>
