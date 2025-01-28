import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import BookSearchView from '@/views/BookSearchView.vue';
import POIMapView from '@/views/POIMapView.vue';
import LocationSettingView from '@/views/LocationSettingView.vue';
import LocationEditView from '@/views/LocationEditView.vue';
import AccountView from '@/views/AccountView.vue';
import UserLibraryView from '@/views/UserLibraryView.vue';
import HomeView from '@/views/HomeView.vue';
import RequestView from '@/views/RequestView.vue';
import ImprintView from '@/views/static/ImprintView.vue';
import DataPrivacyView from '@/views/static/DataPrivacyView.vue';
import ResetPasswordView from '@/views/ResetPasswordView.vue'
import EnterTokenView from '@/views/EnterTokenView.vue'

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
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
    {
      path: '/enter-token',
      name: 'enter-token',
      component: EnterTokenView,
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
      path: '/my-requests',
      name: 'requests',
      component: RequestView,
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: ImprintView,
    },
    {
      path: '/data-privacy',
      name: 'data-privacy',
      component: DataPrivacyView,
    },
  ],
});

export default router;
