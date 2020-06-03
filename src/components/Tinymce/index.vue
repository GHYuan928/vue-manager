<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
  </div>
</template>

<script>
const plugins = ['advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount']
const toolbar = ['searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen']
import load from './dynamicLoadScript'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
export default {
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: () => {
        return 'file edit insert view format table tools '
      }
    }
  },
  data() {
    return {
      fullscreen: false,
      containerWidth: '100%',
      tinymceId: this.id
    }
  },
  mounted() {
    this.init()
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      load(tinymceCDN, (err) => {
        console.log('cb....')
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const self = this
      window.tinymce.init({
        selector: `#${self.tinymceId}`, // 关联的 id
        auto_focus: true, // 自动聚焦
        language: 'zh_CN', // 显示的语言
        height: this.height, // 编辑器高
        body_class: 'panel-body ', // 编辑区body指定类
        object_resizing: false, // 开关图片、表格、媒体对象在编辑区内的调整大小工具。拖拽工具可调整对象大小
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 工具栏
        menubar: this.menubar, // 菜单
        plugins: plugins, // 插件
        end_container_on_empty_block: true, // 空元素回车将其拆分
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        init_instance_callback: editor => { // 初始化成功回调
          if (self.value) { // 如果v-model 存在内容，则设置到 编辑器中
            editor.setContent(self.value)
          }
          self.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => { // 监听编辑器的内容改变
            this.hasChange = true
            this.$emit('input', editor.getContent()) // 获取内容并传递到父组件
          })
        },
        setup(editor) { // 初始化前执行
          editor.on('FullscreenStateChanged', (e) => {
            self.fullscreen = e.state
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container{
  position: relative;
  line-height: normal;
  &.fullscreen{
    z-index: 10000;
  }
}
</style>
