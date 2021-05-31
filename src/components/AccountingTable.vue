<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="accountData"
      :loading="loading"
      bordered
      :pagination="false"
      :row-key="(record) => record.id"
    >
    </a-table>
    <a-pagination
      v-model="page"
      :total="total"
      :page-size-options="pageSizeOptions"
      :page-size="size"
      show-size-changer
      @change="handleTableChange"
    ></a-pagination>
  </div>
</template>

<script>
const columns = [
  {
    title: "账户类型",
    dataIndex: "accountType",
  },
  {
    title: "金额",
    dataIndex: "amount",
  },
  {
    title: "目的",
    dataIndex: "purpose",
  },
  {
    title: "目的类型",
    dataIndex: "purposeType",
  },
  {
    title: "类型",
    dataIndex: "type",
  },
  {
    title: "时间",
    dataIndex: "createTime",
  },
];

export default {
  name: "AccountingTable",
  props: {
    accountData: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 10,
    },
    totalPage:{
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      pageSizeOptions: ["10", "20", "50", "100"],
      loading: false,
      columns,
    };
  },

  methods: {
    handleTableChange(page, size) {
      let pageParams = {
        page,
        size,
      };
      this.$emit("on-change", pageParams);
    },
  },
};
</script>