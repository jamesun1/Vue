<template>
    <el-upload class="upload-demo" :headers="getToken" drag action="http://localhost:8011/file/upload" @on-success="handleAvatarSuccess" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
    data() {
        return {

        }
    },
    computed: {
        getToken() {
            return { "x-auth-token": getToken() };
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            debugger;
        }
    }
}
</script>


