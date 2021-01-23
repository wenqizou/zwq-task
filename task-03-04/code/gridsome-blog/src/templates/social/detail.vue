<template>
  <Layout>
    <el-card shadow="never" style="min-height: 400px; margin-bottom: 20px">
      <div slot="header" class="clearfix">
        <el-button
          @click="$router.go(-1)"
          type="text"
          icon="el-icon-d-arrow-left"
        >
          返回
        </el-button>
        <span style="margin-left: 10px">{{ detail.login }}</span>
      </div>
      <el-row>
        <el-col :span="9" style="padding: 0px 10px 20px 0px">
          <img
            :src="detail.avatar_url"
            style="width: 100%; border-radius: 5px"
          />
          <div style="padding: 10px">
            <font
              style="
                font-size: 20px;
                font-style: normal;
                font-weight: 300;
                line-height: 35px;
                color: #666;
              "
              >{{ detail.login }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="detail.location"
            >
              <i class="el-icon-location-outline"></i>&nbsp;&nbsp;
              {{ detail.location }}
              <br />
            </font>
            <font
              style="font-size: 14px; line-height: 20px; color: #606266"
              v-if="detail.email"
            >
              <i class="el-icon-message"></i>&nbsp;&nbsp;{{ detail.email }}
              <br />
            </font>
            <font style="font-size: 14px; color: #606266" v-if="detail.blog">
              <i class="el-icon-edit-outline"></i>&nbsp;&nbsp;
              <a :href="addHttp(detail.blog)" target="_blank">
                {{ detail.blog }}
              </a>
              <br />
            </font>
          </div>
        </el-col>
        <el-col :span="15" style="padding: 0px 20px 20px 10px">
          <div
            style="
              width: 100%;
              min-height: 300px;
              border-radius: 5px;
              border: 1px solid #ebeef5;
              padding: 10px;
              font-size: 16px;
              color: #6a737d;
            "
            v-if="detail.bio"
          >
            {{ detail.bio }}
          </div>
          <div
            style="
              width: 100%;
              min-height: 300px;
              border-radius: 5px;
              border: 1px solid #ebeef5;
              padding: 30px;
              text-align: center;
              font-size: 30px;
              color: #dddddd;
            "
            v-else
          >
            <b>◔ ‸◔？没有简介</b>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </Layout>
</template>
<script>
import axios from 'axios';
export default {
  metaInfo: {
    title: '开源项目',
  },
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    addHttp(url) {
      return (url.match(/https?:\/\//i) ? '' : 'https://') + url;
    },
  },
  async created() {
    const { name } = this.$route.query;
    const { data } = await axios.get('https://api.github.com/users/' + name);
    this.detail = data;
  },
};
</script>
