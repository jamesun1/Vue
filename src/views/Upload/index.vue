<template>
    <div>
        <el-input-number style="margin-left:5%" v-model="paramTip" :min="10" :max="100" label="描述文字"></el-input-number>
        <el-upload class="upload-demo" :headers="getToken" :data="{'paramTip':paramTip}" drag action="http://119.29.108.164:8011/file/upload" :on-success="handleAvatarSuccess" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-dialog title="查看图片" :fullscreen="true" :append-to-body="true" :center="true" :visible.sync="dialogVisible" width="100%" :before-close="handleClose">
            <div style="text-align:center">
                <img :src="imgSrc" />
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="downloadImg">下载图片</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {
            imgSrc: "",
            dialogVisible: false,
            paramTip: 10
        }
    },
    computed: {
        getToken() {
            return { "x-auth-token": getToken() };
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            this.dialogVisible = true;
            this.imgSrc = response.message;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        downloadImg() {
            window.open(this.imgSrc);
        }
    }
}
</script>


