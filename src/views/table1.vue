<template>
  <div class="container">
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        相关文档：
        <a href="https://Ant Design Vue.gitee.io/zh-CN/component/table-v2.html" target="_blank">Ant Design Vue Virtualized Table</a>
      </a-col>
    </a-row>

    <a-divider content-position="left">vxe-table</a-divider>

    <div>
      <el-table-v2 :columns="columns" :data="data" :width="800" :height="400" fixed />
    </div>
  </div>
</template>
<script lang="ts" setup name="DemoTable1">
const generateColumns = (length = 10, prefix = "column-", props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150,
  }));

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = "row-"
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`;
        return rowData;
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null,
      }
    );
  });

const columns = generateColumns(10);
const data = generateData(columns, 1000);
</script>