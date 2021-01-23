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
        icon="el-icon-share"
        type="warning"
        style="margin-left: 10px"
        plain
        circle
      ></el-button>
    </el-card>
    <el-card
      shadow="hover"
      v-for="(item, index) in $page.repos.edges"
      :key="'pro' + index"
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
                <i class="el-icon-service"></i>&nbsp;&nbsp; {{ item.node.name }}
              </a>
            </span>
          </el-col>
          <el-col :span="8">
            <div style="text-align: right">
              <el-button
                @click="goGithub(item.node.html_url)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-back"
              >
                前往GitHub
              </el-button>
              <el-button
                @click="$share('/source/detail/' + item.node.name)"
                style="padding: 3px 0"
                type="text"
                icon="el-icon-share"
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
      <div style="font-size: 1.1rem; color: #303133; padding: 10px 0px 0px 0px">
        <el-row>
          <el-col :span="16" style="padding-top: 5px">
            <el-tooltip
              effect="dark"
              :content="'star ' + item.node.stargazers_count"
              placement="bottom"
            >
              <i class="el-icon-star-off" style="margin: 0px 5px 0px 0px"></i>
            </el-tooltip>
            {{ item.node.stargazers_count }}
            <el-tooltip
              effect="dark"
              :content="'watch ' + item.node.watchers_count"
              placement="bottom"
            >
              <i class="el-icon-view" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ item.node.watchers_count }}
            <el-tooltip
              effect="dark"
              :content="'fork ' + item.node.forks_count"
              placement="bottom"
            >
              <i class="el-icon-bell" style="margin: 0px 5px 0px 15px"></i>
            </el-tooltip>
            {{ item.node.forks_count }}
          </el-col>
          <el-col :span="8" style="text-align: right">
            <el-tag size="small" type="danger" v-if="item.node.license">
              {{ item.node.license.spdx_id }}
            </el-tag>
            <el-tag size="small" type="success">
              {{ item.node.language }}
            </el-tag>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="pages">
      <Pager :info="$page.repos.pageInfo" />
    </div>
  </Layout>
</template>
<page-query>
query($page: Int){
  repos:allRepos(perPage: 5, page: $page) @paginate{
    pageInfo{
      totalPages,
      currentPage
    }
    totalCount
    edges{
      node{
        id,
        name,
        html_url,
        stargazers_count,
        watchers_count,
        forks_count,
        license{
          spdx_id
        },
        language,
        created_at,
        updated_at,
        description
      }
    }
  }
}
</page-query>
<script>
import { Pager } from 'gridsome';
export default {
  components: { Pager },
  metaInfo: {
    title: '开源项目',
  },
  data() {
    return {
      searchKey: '',
      token: '',
    };
  },
  methods: {
    search() {
      let list = this.$page.repos.edges;
      for (let i = 0; i < list.length; i++) {
        list[i].node.hide = list[i].node.name.indexOf(this.searchKey) < 0;
      }
      this.$page.repos.edges = [];
      this.$page.repos.edges = list;
    },
    goDetails(name) {
      this.$router.push('/source/detail/' + name);
    },
    goGithub(url) {
      window.open(url);
    },
  },
};
</script>
