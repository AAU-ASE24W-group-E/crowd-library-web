import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookSearchView from  "@/views/BookSearchView.vue";
import POIMapView from "@/views/POIMapView.vue";
import LocationSettingView from "@/views/LocationSettingView.vue";
import LocationEditView from '@/views/LocationEditView.vue';
import AccountView from '@/views/AccountView.vue'
import UserLibraryView from '@/views/UserLibraryView.vue';
import HomeView from '@/views/HomeView.vue';

// TODO we have to add restrictions
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/account-settings',
      name: 'account-settings',
      component: AccountView,
    },
    {
      path: '/bookish-map',
      name: 'bookish-map',
      component: POIMapView,
    },
    {
      path: '/book-search',
      name: 'book-search',
      component: BookSearchView,
    },
    {
      path: '/set-location',
      name: 'location-setting',
      component: LocationSettingView,
    },
    {
      path: '/edit-location',
      name: 'location-editing',
      component: LocationEditView,
    },
    {
      path: '/my-books',
      name: 'my-books',
      component: UserLibraryView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
