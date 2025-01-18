<template>
  <div class="tw-page-container" :class="{ 'dark': isDarkMode }">
    <header class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-center py-20 relative">
      <button
        @click="toggleDarkMode"
        class="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105 transition-transform"
      >
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
      </button>
      <h1 class="tw-heading text-white dark:text-gray-200 text-5xl font-extrabold animate-fadeInDown">Data Privacy</h1>
      <p class="tw-subheading mt-4 text-white dark:text-gray-300 text-lg italic">Your Privacy Matters to Us</p>
    </header>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20 mt-20">
      <h2 class="tw-heading-2 text-blue-700 dark:text-blue-400">Introduction</h2>
      <p class="text-justify leading-relaxed mt-6 text-lg text-gray-800 dark:text-gray-300">
        At <strong class="text-blue-600">Crowd Library</strong>, we take your privacy seriously. This privacy policy outlines the types of information we
        collect, how we use it, and the steps we take to ensure your information is protected.
      </p>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">Information We Collect</h2>
      <ul class="list-disc list-inside text-lg text-gray-700 dark:text-gray-300">
        <li>Personal information such as your name, email address, and contact details.</li>
        <li>Usage data including how you interact with our platform.</li>
        <li>Cookies and tracking data for improving user experience.</li>
      </ul>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">How We Use Your Information</h2>
      <p class="text-justify text-lg text-gray-700 dark:text-gray-300">
        We use your information to provide and improve our services, communicate with you, and ensure a secure and personalized experience on
        <strong class="text-blue-600">Crowd Library</strong>. Your data helps us to:
      </p>
      <ul class="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mt-4">
        <li>Facilitate lending and borrowing interactions.</li>
        <li>Send important updates and notifications.</li>
        <li>Analyze usage trends to improve our platform.</li>
      </ul>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">Your Rights</h2>
      <p class="text-justify text-lg text-gray-700 dark:text-gray-300">
        You have the right to access, update, and delete your personal information. If you have any concerns or questions about how your data is handled,
        please contact us at <a href="mailto:privacy@crowdlibrary.com" class="text-blue-600 dark:text-blue-400 underline">privacy@crowdlibrary.com</a>.
      </p>
    </section>

    <footer class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-white text-center py-20">
      <h2 class="tw-heading-2 text-white">Stay Informed</h2>
      <p class="text-lg mt-6 leading-relaxed max-w-3xl mx-auto">
        For more information about our data privacy practices, please reach out to us at
        <a href="mailto:privacy@crowdlibrary.com" class="underline">privacy@crowdlibrary.com</a>.
      </p>
      <router-link to="/" class="btn-primary btn-blue mt-8 inline-block px-10 py-4 rounded-md text-lg shadow-lg">
        Back to Home
      </router-link>
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
