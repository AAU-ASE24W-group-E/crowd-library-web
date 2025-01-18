<template>
  <div class="tw-page-container" :class="{ 'dark': isDarkMode }">
    <header class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-center py-20 relative">
      <button
        @click="toggleDarkMode"
        class="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105 transition-transform"
      >
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
      </button>


      <h1 class="tw-heading text-white dark:text-gray-200 text-5xl font-extrabold animate-fadeInDown">Welcome to Crowd Library</h1>
      <p class="tw-subheading mt-4 text-white dark:text-gray-300 text-lg italic">Connecting book lovers, one story at a time.</p>
    </header>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20 mt-20">
      <h2 class="tw-heading-2 text-blue-700 dark:text-blue-400">Who Are We?</h2>
      <p class="text-justify leading-relaxed mt-6 text-lg text-gray-800 dark:text-gray-300">
        At <strong class="text-blue-600">Crowd Library</strong>, we believe in the power of stories to connect and inspire. We're a community of book lovers
        who are passionate about sharing our collections and discovering new favorites. By lending and borrowing books, we aim to build
        a network of readers who support each other's literary journeys.
      </p>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">Our Mission</h2>
      <p class="text-lg text-center text-gray-700 dark:text-gray-300 mb-8">
        Our mission is simple: to make books more accessible and create a sustainable way to share knowledge and entertainment. We strive to:
      </p>
      <ul class="list-none flex flex-col lg:flex-row justify-center items-start gap-12 text-lg">
        <li class="flex items-start gap-6">
          <span class="text-blue-600 text-3xl">
            <i class="fas fa-handshake"></i>
          </span>
          <p class="text-gray-700 dark:text-gray-300">
            Foster a community of trust among book lovers.
          </p>
        </li>
        <li class="flex items-start gap-6">
          <span class="text-blue-600 text-3xl">
            <i class="fas fa-recycle"></i>
          </span>
          <p class="text-gray-700 dark:text-gray-300">
            Encourage the reuse and sharing of resources.
          </p>
        </li>
        <li class="flex items-start gap-6">
          <span class="text-blue-600 text-3xl">
            <i class="fas fa-users"></i>
          </span>
          <p class="text-gray-700 dark:text-gray-300">
            Bring readers closer together through shared interests.
          </p>
        </li>
      </ul>
    </section>

    <footer class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-white text-center py-20">
      <h2 class="tw-heading-2 text-white">Join Us Today</h2>
      <p class="text-lg mt-6 leading-relaxed max-w-3xl mx-auto">
        Whether you’re looking to share your collection or discover your next great read, Crowd Library is here for you.
      </p>
      <router-link to="/" class="btn-primary btn-blue mt-8 inline-block px-10 py-4 rounded-md text-lg shadow-lg">
        Get Started
      </router-link>
      <div class="flex justify-center mt-10 space-x-8">
        <router-link to="/imprint" class="underline hover:text-gray-200">Imprint</router-link>
        <router-link to="/data-privacy" class="underline hover:text-gray-200">Data Privacy</router-link>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
  },
};
</script>

<style scoped>
.text-justify {
  text-align: justify;
}

.shadow-lg {
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
}

.animate-fadeInDown {
  animation: fadeInDown 0.8s ease-in-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dark {
  background-color: #121212;
  color: #f0f0f0;
}
</style>
