<template>
  <el-table :data="list" style="width:100%;padding-top:15px" size="mini">
    <el-table-column
      label="订单号"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="价格"
      width="195"
      align="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="100"
      align="center"
    >
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter" size="mini">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    toThousandFilter(price) {
      return price.toFixed(2)
    },
    orderNoFilter(orderno) {
      return orderno.slice(0, 30)
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>

<style>

</style>
