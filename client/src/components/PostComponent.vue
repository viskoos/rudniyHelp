<template>
  <div class="container">
    <h4>Форма запроса помощи</h4>

    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Вас зовут (ФИО)</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" class="validate" />
            <label for="icon_telephone">Номер телефона</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea1" class="materialize-textarea" v-model="text"></textarea>
            <label for="textarea1">Подробно расскажите чем Вам нужно помочь</label>
          </div>
        </div>

        <label>
          <p>
            Отправляя форму, вы даете
            <a
              href="#"
            >согласие на обработку и хранение ваших персональных данных.</a>
          </p>
          <button
            class="waves-effect waves-light btn green lighten-2"
            v-on:click="createdPost"
          >Отправить</button>
        </label>
      </form>
    </div>
    <div v-if="preloader">
      <div class="progress">
        <div class="indeterminate"></div>
      </div>
      <label>
        Внимание! Отправка может занять длительное время.
        <a href="#">Читать почему</a>
      </label>
    </div>

    <!-- <label>
      New Post
      <input type="text" v-model="text" />
    </label>
    <button v-on:click="createdPost">Create</button>-->
    <p v-if="error">{{error}}</p>
    <!-- <div
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
    >
      {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
      <p>{{post.text}}</p>
    </div>-->

    <div
      class="card"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:dblclick="deletePost(post._id)"
    >
      <div class="card-content">
        <p>{{post.text.name}}</p>
        <p>{{post.text.text}}</p>
        <p>{{post.text.phone}}</p>
      </div>
      <div class="card-tabs"></div>
      <div class="card-content grey lighten-4">
        <div
          id="test4"
        >Дата добавления: {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: "",
      preloader: false
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createdPost(e) {
      e.preventDefault();
      this.preloader = true;
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
      this.text = "";
      this.preloader = false;
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>