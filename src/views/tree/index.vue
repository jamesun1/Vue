<template>
  <div class="app-container">
    <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>

    <!-- <el-tree class="filter-tree" :data="data2" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2"></el-tree> -->
    <el-tree :props="defaultProps" :load="loadNode" @current-change="currentChange" lazy show-checkbox>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: "",
      defaultProps: {
        label: "name",
        children: "zones",
        isLeaf: "leaf"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region" }]);
      }
      if (node.level >= 1) {
        return resolve([]);
      }
    },
    currentChange(data, node) {
      debugger
    }
  }
};
</script>