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
    title: "书名",
    dataIndex: "bookName",
  },
  {
    title: "作者",
    dataIndex: "author",
  },
  {
    title: "简介",
    dataIndex: "shortDescription",
    ellipsis: true,
  },
  {
    title: "出版时间",
    dataIndex: "publishDate"
  },
  {
    title: "获取时间",
    dataIndex: "getDate"
  },
  {
    title: "开始阅读时间",
    dataIndex: "beginReadDate"
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
      .get("http://localhost:8080/user/myBooks", {
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
