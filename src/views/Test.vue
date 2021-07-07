<template>
  <div class="test">
    <h1>This is an Test page</h1>
    <h2>{{ test_output }}</h2>
  </div>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      test_output: "hello world",
    };
  },
};
</script>