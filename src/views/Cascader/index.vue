<template>
    <div v-loading="CascaderLoading">
        <Cascader style="width:20%" v-model="value" change-on-select :data="data" :load-data="loadData"></Cascader>
        <Button type="primary" @click="enterClick">Primary</Button>
    </div>

</template>
<script>
export default {
    data() {
        return {
            data: [],
            value: [],
            CascaderLoading: false
        }
    },
    created() {
        this.CascaderInfo();
    },
    methods: {
        CascaderInfo() {
            this.CascaderLoading = true;
            this.$store
                .dispatch("TreeSelectAll")
                .then(response => {
                    this.CascaderLoading = false;
                    let dataFlag = response;
                    for (let item of dataFlag) {
                        item.value = item.treeid;
                        item.label = item.name;
                        if (item.hasChildren) {
                            item.children = [];
                            item.loading = false;
                        }
                    }
                    this.data = dataFlag;
                })
                .catch(() => {
                    console.log("no");
                });
        },
        loadData(item, callback) {
            item.loading = true;
            let parentid = item.value;
            if (parentid) {
                this.$store
                    .dispatch("SelectInfoByParentid", { parentid: parentid })
                    .then(response => {
                        let dataFlag = response;
                        for (let item of dataFlag) {
                            item.value = item.treeid;
                            item.label = item.name;
                            if (item.hasChildren) {
                                item.children = [];
                                item.loading = false;
                            }
                        }
                        item.children = dataFlag;
                        item.loading = false;
                        callback();
                    })
                    .catch(() => {
                        console.log("no");
                        item.loading = false;
                        callback();
                    });
            }
        },
        enterClick() {
            console.log(this.value)
        }
    }
}
</script>