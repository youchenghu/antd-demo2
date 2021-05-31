<template>
  <div>
    <a-button type="primary" @click="showModal">新增</a-button>
    <a-modal
      title="新增记录"
      :visible="visible"
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
    <AccountingTable 
      :accountData='accountData' 
      @on-change='handleChange' 
      :total='total' 
      :page='page' 
      :size='size' />
  </div>
</template>

<script>
import AccountingTable from "@/components/AccountingTable.vue";
import axios from "axios";

export default {
  name: "Accounting",
  components: {
    AccountingTable,
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,

      selectOptionsData: [],
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      accountData: [],
      pagination: {
        page: 1,
        size: 10,
      },
      total: 0,
      page: 1,
      size: 10
    };
  },
  created() {
    this.queryApi(this.page, this.size);
  },
  methods: {
    showModal() {
      this.visible = true;
    },

    handleCancel() {
      this.visible = false;
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
          console.log(res)
          this.visible = false;
          this.pagination = {
            page: 1,
            size: 10
          }
          this.page = 1
          this.size = 10
          this.queryApi(this.pagination);
          
        });
    },
    handleChange(params) {
      this.pagination = {
        page: params.current,
        size: params.pageSize
      }
      this.queryApi(this.pagination)
    },
    queryApi(params) {
      axios
        .get("http://localhost:8080/user/myAccounting", {
          params: {
            userId: 1,
            type: "EXPENSE",
            page: params.page,
            size: params.size,
          },
        })
        .then((res) => {
          this.accountData = res.data.data.data;
          this.total = res.data.data.total;
          // const returnPagination = { ...this.pagination };
          // this.data = res.data.data.data;
          // returnPagination.total = res.data.data.total;
          // this.pagination = returnPagination;
          // this.loading = false;
        });
    },
  },
};
</script>