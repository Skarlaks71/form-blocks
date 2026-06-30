<script setup>
import HelloWorld from './components/examples/HelloWorld.vue'
import MyTest from './components/testes/MyTest.vue'
import { useCore } from '@form-blocks/core';

useCore().registerComponent('my-test', MyTest)
</script>

<template>
  <HelloWorld />
</template>
