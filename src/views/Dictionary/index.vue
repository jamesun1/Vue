<template>
    <div>
        <el-row :gutter="30">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>分类名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="buildCat">新建分类</el-button>
                    </div>
                    <div v-for="item in MessageList" :key="item.classificationid">
                        <div @click="enterClick(item)" style="font-size: 2em;margin-top: 1%;">
                            <span>CODE:{{item.code}}</span>
                            <span style="float:right">名字：{{item.name}}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>字典名称</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="buildDic">新建字典</el-button>
                    </div>
                    <el-table :data="tableData">
                        <el-table-column prop="name" label="名字">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-dialog title="新建分类" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
            <div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item prop="code" label="code">
                        <el-input v-model="form.code" />
                    </el-form-item>
                    <el-form-item prop="name" label="分类名">
                        <el-input v-model="form.name" />
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="newCat">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="新建字典" :visible.sync="dicVisible" width="60%" :before-close="dicClose">
            <div>
                <el-form ref="dicForm" :model="dicForm" label-width="80px">
                    <el-form-item prop="name" label="分类名">
                        <el-input v-model="dicForm.name" />
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dicVisible = false">取 消</el-button>
                <el-button type="primary" @click="newDic">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from 'element-ui';
export default {
    data() {
        return {
            MessageList: [],
            tableData: [],
            dialogVisible: false,
            form: {},
            dicForm: {},
            dicVisible: false,
            classificationid: "",
        }
    },
    created() {
        this.getAllMessage();
    },
    methods: {
        newDic() {
            this.dicForm.classificationid = this.classificationid;
            this.$store
                .dispatch("InsertDictionary", this.dicForm)
                .then(response => {
                    Message.success("创建成功");
                    this.$refs["dicForm"].resetFields();
                    this.dicVisible = false;
                    this.enterClick({ classificationid: this.classificationid });
                })
                .catch(() => {
                    console.log("no");
                });
        },
        dicClose() {
            this.dicVisible = false;
        },
        buildDic() {
            this.dicVisible = true;
        },
        newCat() {
            this.$store
                .dispatch("ClassificationInsert", this.form)
                .then(response => {
                    Message.success("创建成功");
                    this.dialogVisible = false;
                    this.getAllMessage();
                })
                .catch(() => {
                    console.log("no");
                });
        },
        buildCat() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        getAllMessage() {
            this.$store
                .dispatch("ClassificationSelectAll")
                .then(response => {
                    this.MessageList = response;
                })
                .catch(() => {
                    console.log("no");
                });
        },
        enterClick(item) {
            this.classificationid = item.classificationid;
            this.$store
                .dispatch("ClassificationSelectById", { classificationid: item.classificationid })
                .then(response => {
                    this.tableData = response;
                })
                .catch(() => {
                    console.log("no");
                });
        }
    }
}
</script>

