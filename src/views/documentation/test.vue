<template>
  <div>
    {{ $props }}
    abc
  </div>
</template>

<script>
export default {
  props: ['name', 'age'],
  mounted() {
    console.log(this.$props)
  }
}
</script>

<style>

</style>
