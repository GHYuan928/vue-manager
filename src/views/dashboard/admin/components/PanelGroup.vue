<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <section class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </section>
        <section class="card-panel-description">
          <div class="card-panel-text">新访问者</div>
          <count-to :start-val="0" :end-val="2099" :duration="2000" class="card-panel-num" />人
        </section>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <section class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </section>
        <section class="card-panel-description">
          <div class="card-panel-text">消息</div>
          <count-to :start-val="0" :end-val="81210" :duration="2000" class="card-panel-num" />条
        </section>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <section class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </section>
        <section class="card-panel-description">
          <div class="card-panel-text">成交金额</div>
          <count-to :start-val="0" :end-val="60899" :duration="2000" class="card-panel-num" />元
        </section>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <section class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </section>
        <section class="card-panel-description">
          <div class="card-panel-text">订单数</div>
          <count-to :start-val="0" :end-val="487" :duration="2000" class="card-panel-num" />个
        </section>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(tag) {
      this.$emit('handleSetLineChartData', tag)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group{
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
    .card-panel{
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      .card-panel-icon-wrapper{
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        .card-panel-icon {
          float: left;
          font-size: 48px;
        }
      }
      .card-panel-description{
        float: right;
        font-weight: bold;
        margin: 26px 26px 26px 0;
        .card-panel-text{
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3
      }
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3
        }
      }
    }
  }
}

</style>
