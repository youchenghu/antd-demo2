<template>
  <div>
    <a-button type="primary" @click="showModal">新增</a-button>
    <a-modal
      title="新增记录"
      :visible="modalVisible"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="账户类型">
          <a-select
            v-decorator="[
              'accountType',
              {
                rules: [{ required: true, message: '请选择账户类型!' }],
              },
            ]"
            placeholder="请选择账户类型"
          >
            <a-select-option value="WECHAT"> 微信 </a-select-option>
            <a-select-option value="ALIPAY"> 支付宝 </a-select-option>
            <a-select-option value="CASH"> 现金 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="收支类型">
          <a-select
            v-decorator="[
              'type',
              {
                rules: [{ required: true, message: '请选择收支类型!' }],
              },
            ]"
            placeholder="请选择收支类型"
          >
            <a-select-option value="EXPENSE"> 支出 </a-select-option>
            <a-select-option value="INCOME"> 收入 </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="金额">
          <a-input
            v-decorator="[
              'amount',
              {
                rules: [{ required: true, message: '请输入金额!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="目的">
          <a-input
            v-decorator="[
              'purpose',
              {
                rules: [{ required: true, message: '请输入使用目的!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="目的类型">
          <a-input
            v-decorator="[
              'purposeType',
              {
                rules: [{ required: true, message: '目的类型!' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> 提交 </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-table
      :columns="columns"
      :data-source="accountData"
      bordered
      :pagination="pagination"
      :row-key="(record) => record.id"
      @change='handleChange'
    >
    </a-table>
  </div>
</template>

<script>
import axios from "axios";

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
  name: "Accounting",
  data() {
    return {
      columns,
      modalVisible: false,
      form: this.$form.createForm(this, { name: "coordinated" }),
      accountData: [],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 50,  
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total) => `共${total}条数据`,
        showSizeChanger: true
      }
    };
  },
  created() {
    this.queryApi(this.pagination);
  },
  methods: {
    showModal() {
      this.modalVisible = true;
    },

    handleCancel() {
      this.modalVisible = false;
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });

      const param = this.form.getFieldsValue();
      param.userId = 1;

      this.submitData(param);
    },

    submitData(params) {
      axios
        .post("http://localhost:8080/user/addAccounting", params)
        .then((res) => {
          console.log(res);
          this.modalVisible = false;
          this.pagination = {
            current: 1,
            pageSize: 10,
          };
          this.queryApi(this.pagination);
        });
    },
    handleChange(pagination) {
      this.pagination.current = pagination.current
      this.queryApi(pagination);
    },
    queryApi(params) {
      axios
        .get("http://localhost:8080/user/myAccounting", {
          params: {
            userId: 1,
            type: "EXPENSE",
            page: params.current,
            size: params.pageSize,
          },
        })
        .then((res) => {
          this.accountData = res.data.data.data;
          this.pagination.total = res.data.data.total;
        });
    },
  },
};
</script>