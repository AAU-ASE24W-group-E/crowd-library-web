<template>
  <div class="tw-page-container" :class="{ 'dark': isDarkMode }">
    <header class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-center py-20 relative">
      <button
        @click="toggleDarkMode"
        class="absolute top-4 right-4 bg-black dark:bg-white text-white dark:text-black rounded-full p-4 shadow-lg hover:bg-gray-800 dark:hover:bg-gray-300 hover:scale-105 transition-transform"
      >
        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
      </button>
      <h1 class="tw-heading text-white dark:text-gray-200 text-5xl font-extrabold animate-fadeInDown">Imprint</h1>
      <p class="tw-subheading mt-4 text-white dark:text-gray-300 text-lg italic">Legal Information and Contact Details</p>
    </header>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20 mt-20">
      <h2 class="tw-heading-2 text-blue-700 dark:text-blue-400">Responsible Entity</h2>
      <p class="text-justify leading-relaxed mt-6 text-lg text-gray-800 dark:text-gray-300">
        Crowd Library<br />
        John Doe<br />
        Example Street 123<br />
        12345 City, Country
      </p>
      <p class="text-justify leading-relaxed mt-6 text-lg text-gray-800 dark:text-gray-300">
        Phone: +123 456 7890<br />
        Email: <a href="mailto:info@crowdlibrary.com" class="text-blue-600 dark:text-blue-400 underline">info@crowdlibrary.com</a>
      </p>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">Disclaimer</h2>
      <p class="text-justify text-lg text-gray-700 dark:text-gray-300">
        The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct,
        we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability
        with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you
        place on such information is therefore strictly at your own risk.
      </p>
    </section>

    <section class="tw-component-container bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg py-12 px-8 mb-20">
      <h2 class="tw-heading-2 text-blue-600 text-center mb-8">Copyright</h2>
      <p class="text-justify text-lg text-gray-700 dark:text-gray-300">
        All content on this website, including text, graphics, logos, and images, is the property of Crowd Library unless otherwise stated. Unauthorized use
        of any material on this site may violate copyright, trademark, and other laws. Permission is granted to view and print materials from this website
        for personal and non-commercial use only.
      </p>
    </section>

    <footer class="w-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-900 dark:to-gray-700 text-white text-center py-20">
      <h2 class="tw-heading-2 text-white">Need Help?</h2>
      <p class="text-lg mt-6 leading-relaxed max-w-3xl mx-auto">
        If you have any questions or concerns regarding this imprint, feel free to contact us at <a href="mailto:info@crowdlibrary.com" class="underline">info@crowdlibrary.com</a>.
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
