<template>
  <a-table 
    :columns="columns" 
    :data-source="data"
    bordered>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "品牌",
    dataIndex: "carBrand"
  },
  {
    title: "车牌",
    dataIndex: "licensePlateNumber"
  },
  {
    title: "型号",
    dataIndex: "sku"
  },
];

import axios from "axios";

export default {
  data() {
    return {
      data: [],
      columns,
    };
  },

  created() {

    axios
      .get("http://localhost:8080/user/myCars", {
        params: {
          userId: 1,
        },
      })
      .then((res) => {
        console.log(res);
        this.data = res.data.data
      });
  },
};
</script>
