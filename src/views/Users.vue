<template>
  <div class="test">
    <h1>This is an Test page</h1>
    <h2>{{ test_output }}</h2>

    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <td>ID</td>
            <td>帳號</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="allUsers.length === 0">
            <td>No data</td>
          </tr>
          <tr v-else v-for="user in allUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

export default {
  name: "App",
  components: {},
  data() {
    return {
      allUsers: [],
      test_output: "hello world",
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // Query 查出來存放的變數名子要和Query Object一樣
    // https://stackoverflow.com/questions/57468031/missing-attribute-on-result-vue-apollo-and-graphql
    allUsers: {
      query: gql`
        {
          allUsers {
            id
            name
          }
        }
      `,
    },
  },
};
</script>