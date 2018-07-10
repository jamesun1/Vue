<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="字典">
        <el-select v-model="form.code" placeholder="请选择">
          <el-option v-for="item in options" :key="item.classificationid" :label="item.name" :value="item.classificationid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker type="fixed-time" placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="滑块">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="在线活动" name="type"></el-checkbox>
          <el-checkbox label="推广活动" name="type"></el-checkbox>
          <el-checkbox label="离线活动" name="type"></el-checkbox>
          <el-checkbox label="品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="赞助"></el-radio>
          <el-radio label="地点"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动表单">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: []
    }
  },
  created() {
    this.getAllDic();
  },
  methods: {
    getAllDic() {
      this.$store
        .dispatch("SelectByCode", { code: "unit" })
        .then(response => {
          this.options = response;
        })
        .catch(() => {
          console.log("no");
        });
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>

