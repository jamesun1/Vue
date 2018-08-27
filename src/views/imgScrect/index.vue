<template>
    <div>
        <el-button type="success" @click="createImage">点击更换验证码</el-button>
        <img :src="imgsrc" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgsrc: ""
        }
    },
    methods: {
        createImage() {
            this.$store
                .dispatch("createImage")
                .then((res) => {
                    this.imgsrc = res;
                })
                .catch((error) => {
                    Message.error(error);
                });
        }
    }
}
</script>

<style>
</style>
