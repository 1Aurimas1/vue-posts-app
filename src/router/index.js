import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import Authors from "../views/Authors.vue";
import SinglePost from "../views/SinglePost.vue";
import NotFound from "../views/NotFound.vue";

export const routes = [
  { path: "/", component: Posts, alias: "/posts" },
  { path: "/authors", component: Authors },
  { path: "/posts/:id", component: SinglePost },
  { path: "*", component: NotFound },
];

export const router = new VueRouter({
  mode: "history",
  routes,
});
