<template>
    <el-upload class="upload-demo" :headers="getToken" drag action="http://localhost:8011/file/upload" :on-success="handleAvatarSuccess" multiple>
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
        handleAvatarSuccess(response, file, fileList) {
            debugger;
            var blob = new Blob([response], { type: 'image/jpg;charset=utf-8' }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型

            var downloadElement = document.createElement('a');
            var href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download = file.name; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        }
    }
}
</script>


