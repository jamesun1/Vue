<template>

</template>

<script>
export default {
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let data = [{ a: 1 }, { a: 1 }];
            data = this.quchong(data);
            console.log(data);
        },
        quchong(data) {
            let aa = new Set(data);
            return Array.from(aa);
        }
    }
}
</script>

<style>
</style>
