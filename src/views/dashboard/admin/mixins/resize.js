import { debounce } from '@/utils/index'

export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted() {
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    // 监听 resize
    this.$_initResizeEvent()
  },
  beforeDestory() {
    this.$_destroyResizeEvent()
  },
  /** keep-alive 激活方法 */
  activated() {

  },
  deactivated() {

  },
  methods: {
    $_initResizeEvent() {
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    }
  }
}
