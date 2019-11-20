import Vue from 'vue';
import Router from 'vue-router';
import Main from './components/Main.vue';
import Add from './components/Add.vue';
import Update from './components/Update.vue';
import Delete from './components/Delete.vue';
Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "main",
            component: Main
        },
        {
            path: "/add",
            name: "add",
            component: Add
        },
        {
            path: "/update",
            name: "update",
            component: Update
        },
        {
            path: "/delete",
            name: "delete",
            component: Delete
        }
    ]
});
