import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Input from '../views/Input.vue';
import Publish from '../views/Publish.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/input',
    name: 'Input',
    component: Input,
  },
  {
    path: '/publish',
    name: 'Publish',
    component: Publish,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
