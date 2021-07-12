<template>
  <div class="test">
    <h1>文章列表</h1>

    <div class="container">
      <router-link
        :to="{
          name: 'PostAdd'
        }"
      >
        NEW
      </router-link>
      <table class="table">
        <thead>
          <tr>
            <td>標題</td>
            <td>作者</td>
            <td>發布日期</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="allPosts.length === 0">
            <td>No data</td>
          </tr>
          <tr v-else v-for="post in allPosts" :key="post.id">
            <td>
              <router-link
                :to="{
                  name: 'Post',
                  params: { id: post.id },
                }"
              >
                {{ post.title }}
              </router-link>
            </td>
            <td>{{ post.author != undefined ? post.author.name : "" }}</td>
            <td>{{ post.publishDate }}</td>
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
      allPosts: [],
    };
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // Query 查出來存放的變數名子要和Query Object一樣
    // https://stackoverflow.com/questions/57468031/missing-attribute-on-result-vue-apollo-and-graphql
    allPosts: {
      query: gql`
        {
          allPosts {
            id
            title
            status
            content {
              document
            }
            author {
              name
            }
            publishDate
          }
        }
      `,
    },
  },
};
</script>