<template>
  <!-- eslint-disable vue/require-component-is -->
  <!-- v-bind="{ id: someProp, 'other-attr': otherProp }" 绑定一个全是 attribute 的对象 -->
  <component v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      } else {
        return {
          is: 'router-link',
          to: url
        }
      }
    }
  }
}
</script>

<style>

</style>
