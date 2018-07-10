<template>
  <div v-loading="treeLoading">
    <el-row>
      <el-button type="primary" plain @click="buildMenu">新建一级菜单</el-button>
    </el-row>
    <el-tree :props="defaultProps" :default-expand-all="true" :expand-on-click-node="false" lazy :data="treedata" :load="loadNode" node-key="id">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" icon="el-icon-plus" @click="() => append(data)">
            添加
          </el-button>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <span>
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'treeid'
      },
      dialogVisible: false,
      form: {},
      treedata: [],
      treeLoading: false
    }
  },
  created() {
    this.getMessage();
  },
  methods: {
    enterClick() {
      this.$store
        .dispatch("InsertTreeInfo", this.form)
        .then(response => {
          this.dialogVisible = false;
          this.form = {};
          this.getMessage();
        })
        .catch(() => {
          console.log("no");
        });
    },
    buildMenu() {
      this.dialogVisible = true;
    },
    getMessage() {
      this.treeLoading = true;
      this.$store
        .dispatch("TreeSelectAll")
        .then(response => {
          this.treeLoading = false;
          this.treedata = response;
        })
        .catch(() => {
          console.log("no");
        });
    },
    loadNode(node, resolve) {
      if (node.level > 0) {
        if (node.data.treeid) {
          let parentid = node.data.treeid;
          this.$store
            .dispatch("SelectInfoByParentid", { parentid: parentid })
            .then(response => {
              resolve(response);
            })
            .catch(() => {
              console.log("no");
            });
        }
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    append(data) {
      this.form.parentid = data.treeid;
      this.dialogVisible = true;
    },
    remove(node, data) {
      this.$store
        .dispatch("DeleteTreeInfo", { treeid: data.treeid })
        .then(response => {
          this.getMessage();
        })
        .catch(() => {
        });
    },
  }
};
</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>