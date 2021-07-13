<template>
  <div class="test">
    <h1>文章查看</h1>

    <div class="container">
      <table class="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>Auto Generate</td>
          </tr>
          <tr>
            <td>標題</td>
            <td><input type="text" v-model="title" /></td>
          </tr>
          <tr>
            <td>內容</td>
            <td>
                <!-- --> 
              <Slate :value="initialValue" @change="updateContent">
                <Toolbar>
                  <MarkButton format="bold" icon="format_bold" />
                  <MarkButton format="italic" icon="format_italic" />
                  <MarkButton format="underline" icon="format_underlined" />
                  <MarkButton format="code" icon="code" />
                  <BlockButton format="heading-one" icon="looks_one" />
                  <BlockButton format="heading-two" icon="looks_two" />
                  <BlockButton format="block-quote" icon="format_quote" />
                  <BlockButton
                    format="numbered-list"
                    icon="format_list_numbered"
                  />
                  <BlockButton
                    format="bulleted-list"
                    icon="format_list_bulleted"
                  />
                </Toolbar>
                <Editable
                  placeholder="Enter some plain text..."
                  :renderLeaf="renderLeaf"
                  :renderElement="renderElement"
                ></Editable>
              </Slate>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button
                type="button"
                @click="addPost"
                class="btn btn-primary"
              >
                新增
              </button>
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
import { renderLeaf, renderElement } from "./render";
import MarkButton from "../components/markButton.vue";
import BlockButton from "../components/blockButton.vue";
import Toolbar from "../components/toolbar.vue";
const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true, italic: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
];
const ADD_POST = gql`
  mutation create($input: PostCreateInput!) {
    createPost(data: $input) {
      title
      content {
        document
      }
      publishDate
    }
  }
`;
export default {
  name: "PostAdd",
  components: {
    Slate,
    Editable,
    Toolbar,
    MarkButton,
    BlockButton,
  },
  setup() {},
  methods: {
    updateContent() {
        // this package event is dead, no event
        // "another way to get content"
        this.content = this.$editor.children
        console.log(this.content)
    },
    addPost() {
      this.$apollo.mutate({
        mutation: ADD_POST,
        variables: {
          input: {
            title: this.title,
            content: this.content,
            publishDate: new Date().toJSON(),
          },
        },
      });

      this.newPostContent = "";
      this.$router.push({ name: 'Posts' })
    },
  },
  data() {
    return {
      Post: {},
      title: "",
      initialValue: JSON.stringify(initialValue),
      publishDate: "",
      loadingKey: "loading",
      renderLeaf: renderLeaf,
      renderElement: renderElement,
    };
  },
};
</script>