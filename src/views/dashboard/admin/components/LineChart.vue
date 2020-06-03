<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../mixins/resize'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      handler(val) {
        this.setOptions(val)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (!this.chart) {
        // this.$el 表示 当前组件的 dom
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false, // 是否贴坐标轴，true 贴，false 不贴
          axisTick: { // 是否显示坐标刻度
            show: true
          }
        },
        grid: { // 图标位置
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true // 是否包含坐标轴的刻度标签
        },
        tooltip: { // 悬浮框
          trigger: 'axis', // axis 类目轴 ， item 用于无类目轴的图表
          axisPointer: { // 坐标轴指示器，坐标轴触发有效，
            type: 'cross' // 默认为line，line直线，cross十字准星，shadow阴影
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: { // 是否显示坐标刻度
            show: false
          }
        },
        legend: { // 可点击的图例
          data: ['预期数值', '实际数值']
        },
        series: [
          {
            name: '预期数值',
            smooth: true, // 开启平滑
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '实际数值',
            smooth: true, // 开启平滑
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: { // 折线下方区域颜色
                  color: '#f3f8ff'
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>

<style>

</style>
