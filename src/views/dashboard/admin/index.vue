<template>
  <div class="dashboard-editor-container">
    <github-corner class="github" />
    <panel-group @handleSetLineChartData="changeLineChartData" />
    <el-row style="background-color: #fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        aa
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        ss
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
// PanelGroup 面板组 [新访问者，消息，成交金额， 订单数]
import PanelGroup from './components/PanelGroup'
// LineChart 线性表
import LineChart from './components/LineChart'
// 雷达表
import RaddarChart from './components/RaddarChart'
// 圆形表
import PieChart from './components/PieChart'
// 柱状表
import BarChart from './components/BarChart'
// 表格
import TransactionTable from './components/TransactionTable'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable
  },
  data() {
    return {
      lineData: lineChartData.newVisitis
    }
  },
  methods: {
    changeLineChartData(tag) {
      this.lineData = lineChartData[tag]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container{
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github{
    position: absolute;
    top: 0;
    right: 0;
  }
  .chart-wrapper{
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

</style>
