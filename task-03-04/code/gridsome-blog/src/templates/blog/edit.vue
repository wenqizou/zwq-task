<template>
  <Layout>
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-button
        @click="$router.go(-1)"
        type="text"
        icon="el-icon-d-arrow-left"
      >
        返回
      </el-button>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="ruleValidate"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="简要说明" prop="description">
          <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="博客正文" prop="content">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5 }"
            placeholder="请输入内容"
            v-model="form.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onPublish"
            :loading="submitButton.loading"
            :disabled="submitButton.disabled"
          >
            修改
          </el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </Layout>
</template>
<page-query>
query($id: ID!) {
  post:strapiPost(id: $id){
    title,
    id,
    content,
    description
  }
}
</page-query>
<script>
import axios from 'axios';
export default {
  metaInfo: {
    title: '编辑博客',
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        content: '',
      },
      ruleValidate: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          {
            type: 'string',
            max: 32,
            message: '标题长度不大于32字符',
            trigger: 'change',
          },
        ],
        description: [
          { required: true, message: '请输入博客描述', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输博客入正文', trigger: 'blur' },
        ],
      },
      submitButton: {
        loading: false,
        disabled: false,
      },
    };
  },
  methods: {
    onPublish() {
      const token = sessionStorage.getItem('token');
      if (token) {
        this.$refs['form'].validate(async (valid) => {
          console.log(valid);
          if (valid) {
            this.submitButton.loading = true;
            this.submitButton.disabled = true;
            try {
              const { title, description, content, id } = this.form;
              await axios.put(
                'http://121.196.182.50:1337/posts/' + id,
                { title, description, content },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              this.$message.success('修改成功');
              this.$router.go(-1);
            } catch (e) {
              this.$message.error('修改失败，请稍后重试');
            }
            this.submitButton.loading = false;
            this.submitButton.disabled = false;
          }
        });
      } else {
        this.$message.error('请先登录');
      }
    },
  },
  created() {
    this.form = this.$page.post;
  },
};
</script>
