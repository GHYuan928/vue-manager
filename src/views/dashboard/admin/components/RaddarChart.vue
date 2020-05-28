<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '../mixins/resize'

const animationDuration = 3000
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default() {
        return 'chart'
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  },
  methods: {
    initChart() {
      if (!this.chart) {
        this.chart = echarts.init(this.$el, 'macarons')
        // 模拟请求返回
        setTimeout(() => {
          this.setOptions()
        }, 1500)
      }
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['分配预算', '预计开销', '实际开销']
        },
        radar: {
          radius: '66%', // 半径
          center: ['50%', '42%'], // 中心（圆心）坐标
          splitNumber: 8, // 指示器轴的分割段数,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '销售', max: 10000 },
            { name: '管理', max: 20000 },
            { name: '信息技术', max: 20000 },
            { name: '客服', max: 20000 },
            { name: '研发', max: 20000 },
            { name: '市场', max: 20000 }
          ]
        },
        series: [{
          type: 'radar',
          symbolSize: 0, // 标记点的大小
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 0.8
            }
          },
          data: [
            {
              value: [5000, 17000, 12000, 11000, 15000, 14000],
              name: '分配预算'
            },
            {
              value: [9000, 2000, 15000, 15000, 13000, 11000],
              name: '预计开销'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: '实际开销'
            }
          ]
        }],
        animationDuration: animationDuration
      })
    }
  }
}
</script>

<style>

</style>
