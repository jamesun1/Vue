<template>
  <div v-loading="treeLoading">
    <el-button @click="selectData">确认</el-button>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-row>
          <el-button type="primary" plain @click="buildMenu">新建一级菜单</el-button>
        </el-row>
        <el-tree :props="defaultProps" show-checkbox @check-change="handleCheckChange" :default-expand-all="true" :expand-on-click-node="false" @node-click="treeClick" lazy :data="treedata" :load="loadNode" node-key="id">
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
      </el-col>
      <el-col :span="18">
        <el-row>
          <el-button type="primary" :disabled="treeid===''" plain @click="userDataVisible = true">新建用户数据</el-button>
        </el-row>
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="100" show-sizer show-total />
      </el-col>
    </el-row>

    <el-dialog title="新建一级菜单" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <span>
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="enterClick">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新建用户信息" :visible.sync="userDataVisible" width="60%" :before-close="handleClose">
      <span>
        <el-input v-model="form1.name" placeholder="请输入姓名"></el-input>
        <el-input v-model="form1.adress" placeholder="请输入职位"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDataVisible = false">取 消</el-button>
        <el-button type="primary" @click="createUserData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui';
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
      form1: {},
      treedata: [],
      treeLoading: false,
      columns1: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '职位',
          key: 'adress'
        }
      ],
      data1: [],
      treeid: "",
      userDataVisible: false,
      permission: [],
    }
  },
  created() {
    this.getMessage();
  },
  methods: {
    selectData() {
      console.log("permission", this.permission);
      this.$store
        .dispatch("insertPermission", { treeList: this.permission })
        .then(response => {
          Message.success("新建成功");
        })
        .catch(() => {
          console.log("no");
        });
    },
    handleCheckChange(data, checked, indeterminate) {
      debugger;
      if (checked) {
        this.permission.push(data);
      } else {
        let treeid = data.treeid;
        let date = this.permission;
        for (let i = 0; i < date.length; i++) {
          if (date[i].treeid === treeid) {
            date.splice(i, 1);
            break;
          }
        }
        this.permission = date;
      }

      console.log(data, checked, indeterminate);
    },
    createUserData() {
      this.form1.treeid = this.treeid;
      this.$store
        .dispatch("InsertUserByTreeid", this.form1)
        .then(response => {
          Message.success("新建成功");
          this.userDataVisible = false;
          this.treeClick(this.treeid);
          this.form1 = {};
        })
        .catch(() => {
          console.log("no");
        });
    },
    treeClick(data) {
      if (data.treeid !== undefined) {
        this.treeid = data.treeid;
      }
      this.$store
        .dispatch("SelectUserByTreeid", this.treeid)
        .then(response => {
          this.data1 = response;
        })
        .catch(() => {
          console.log("no");
        });
    },
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