<template>
  <div class="test">
    <h1>文章列表dddss</h1>

    <div class="container">
      <router-link
        :to="{
          name: 'PostAdd',
        }"
      >
        NEW
      </router-link>
      <table class="table">
        <thead>
          <tr>
            <td>標題ddd</td>
            <td>作者</td>
            <td>發布日期</td>
            <td>操作</td>
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
            <td>
              <a href="#" @click="deletePost" :id="post.id">刪除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
const DEL_POST = gql`
  mutation deletePost($id: ID!) {
  deletePost(id: $id) {
    id
  }
}`;

const QUERY_POST = gql`
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
}`;

export default {
  name: "App",
  components: {},
  data() {
    return {
      allPosts: [],
    };
  },
  methods: {
      deletePost: function(id) {
          console.log(`id` + id);
          console.log(DEL_POST);
      }
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // Query 查出來存放的變數名子要和Query Object一樣
    // https://stackoverflow.com/questions/57468031/missing-attribute-on-result-vue-apollo-and-graphql
    allPosts: {
      query: QUERY_POST
    },
  },
};
</script>