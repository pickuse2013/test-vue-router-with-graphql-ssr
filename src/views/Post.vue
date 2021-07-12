
<template>
  <div class="test">
    <h1>文章查看</h1>

    <div class="container">
      <table class="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{{ $route.params.id }}</td>
          </tr>
          <tr>
            <td>標題</td>
            <td>{{ Post.title }}</td>
          </tr>
          <tr>
            <td>作者</td>
            <td>{{ Post.author != undefined ? Post.author.name : "" }}</td>
          </tr>
          <tr>
            <td>發布日期</td>
            <td></td>
            <td>{{ Post.publishDate }}</td>
          </tr>
          <tr>
            <td>內容</td>
            <td>
              <Slate v-if="Post.content != undefined" :value="JSON.stringify(Post.content.document)">
                <Editable placeholder="Enter some plain text..." :readOnly="true"></Editable>
              </Slate>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";
import { Slate, Editable } from "slate-vue2";
// this value is for editor
// const initialValue = [
//   {
//     children: [
//       { text: "This is editable plain text, just like a <textarea>!" },
//     ],
//   },
// ];
export default {
  name: "App",
  components: {
    Slate,
    Editable,
  },
  setup() {},
  data() {
    return {
      Post: {},
      loadingKey: "loading",
      document: "",
    };
  },
  computed: {
    // passedProps() {
    //   return {
    //     document: this.Post.content.document,
    //   };
    // },
  },
  apollo: {
    // Simple query that will update the 'hello' vue property
    // Query 查出來存放的變數名子要和Query Object一樣
    // https://stackoverflow.com/questions/57468031/missing-attribute-on-result-vue-apollo-and-graphql
    Post: {
      query: gql`
        query GetPostById($id: ID) {
          Post(where: { id: $id }) {
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
      variables() {
        return {
          id: this.$route.params.id, // Works here!
        };
      },
      error(error) {
        console.log(error);
      },
    },
  },
};
</script>