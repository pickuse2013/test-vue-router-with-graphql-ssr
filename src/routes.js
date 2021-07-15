import Home from './views/Home.vue'
import Posts from './views/Posts.vue'
import Post from './views/Post.vue'
import PostAdd from './views/PostAdd.vue'



export default [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/Test.vue')
    },
    {
        path: '/users',
        name: 'Users',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ './views/Users.vue')
    },
    {
        path: '/posts',
        name: 'Posts',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Posts
    },
    {
        path: '/post/add',
        name: 'PostAdd',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: PostAdd
    },
    {
        name: 'Post',
        path: '/post/:id',
        component: Post
    }
]