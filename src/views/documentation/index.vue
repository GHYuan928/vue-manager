<template>
  <div>
    document
    <test :name.prop="'Xiaoming'" :age="18" />

  </div>
</template>

<script>
import test from './test'
export default {
  components: {
    test
  }
}
</script>

<style>

</style>
