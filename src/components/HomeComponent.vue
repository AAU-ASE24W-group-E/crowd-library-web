<template>
  <div class="tw-page-container p-6 bg-white dark:bg-black text-gray-800 dark:text-gray-200">

    <main class="tw-component-container mt-10 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <!-- Welcome Section -->
      <section id="welcome" class="text-center">
        <h2 class="text-4xl font-bold text-black dark:text-gray-200">Welcome to Crowd Library!</h2>
        <p class="mt-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Your community-powered resource for sharing knowledge and ideas.
        </p>
        <div class="mt-6">
          <img src="/images/bookshelf.jpg" alt="Community library image" class="w-full rounded-lg shadow-md">
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="mt-12">
        <div class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 class="text-3xl font-semibold text-black dark:text-gray-200">About Us</h2>
          <p class="mt-4 text-left leading-relaxed text-gray-700 dark:text-gray-300">
            Crowd Library is a collaborative platform where individuals can contribute, share, and explore a wide variety of resources. Our mission is to foster a culture of collective learning and growth by providing a space where knowledge is freely accessible to everyone. Whether you're a student, a professional, or simply a curious learner, you'll find valuable resources tailored to your interests.
          </p>
          <p class="mt-4 text-left leading-relaxed text-gray-700 dark:text-gray-300">
            By joining Crowd Library, you're not just accessing a library; you're becoming part of a vibrant community that values open knowledge, collaboration, and innovation. Explore topics, share your expertise, and discover new ideas that broaden your horizons.
          </p>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="mt-12">
        <div class="bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
        <h2 class="text-3xl font-semibold text-black dark:text-gray-200">Why Choose Crowd Library?</h2>
        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div class="relative flex items-start space-x-4">
            <div class="w-12 h-12 relative">
              <img src="/images/collaboration1.png" alt="Sharing icon" class="w-full h-full">
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Community Contributions</h3>
              <p class="mt-2 text-gray-700 dark:text-white">Access a library enriched by user-generated content, ensuring a diverse and ever-growing collection of resources.</p>
            </div>
          </div>
          <div class="relative flex items-start space-x-4">
            <div class="w-12 h-12 relative">
              <img src="/images/clock.png" alt="Accessibility icon" class="w-full h-full">
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Accessible Anytime, Anywhere</h3>
              <p class="mt-2 text-gray-700 dark:text-white">Enjoy unlimited access to resources from anywhere in the world, at any time.</p>
            </div>
          </div>
          <div class="relative flex items-start space-x-4">
            <div class="w-12 h-12 relative">
              <img src="/images/research.png" alt="Discover icon" class="w-full h-full">
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Explore & Discover</h3>
              <p class="mt-2 text-gray-700 dark:text-white">Discover unique resources, from niche topics to trending ideas, curated by a global community.</p>
            </div>
          </div>
          <div class="relative flex items-start space-x-4">
            <div class="w-12 h-12 relative">
              <img src="/images/customer-service.png" alt="Support icon" class="w-full h-full">
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">Dedicated Support</h3>
              <p class="mt-2 text-gray-700 dark:text-white">Our team is always here to help, ensuring you have a seamless experience.</p>
            </div>
          </div>
        </div>
        </div>
      </section>


      <!-- How It Works Section -->
      <section id="how-it-works" class="mt-12 w-full">
        <div class="w-full bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 class="text-3xl font-semibold text-black dark:text-gray-200">How It Works</h2>
          <div class="mt-6 space-y-6">
            <div class="flex items-start space-x-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              <p class="text-gray-700 dark:text-gray-300">Sign up for free and create your personalized profile.</p>
            </div>
            <div class="flex items-start space-x-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              <p class="text-gray-700 dark:text-gray-300">Browse and contribute to our diverse library of resources.</p>
            </div>
            <div class="flex items-start space-x-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              <p class="text-gray-700 dark:text-gray-300">Collaborate with others by sharing your knowledge and insights.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Information -->
      <section id="contact" class="mt-12 w-full">
        <div class="w-full bg-gray-100 dark:bg-gray-900 p-6 rounded-lg">
          <h2 class="text-3xl font-semibold text-black dark:text-gray-200">Contact Information</h2>
          <p class="mt-4 text-left leading-relaxed text-gray-700 dark:text-gray-300">
            For any inquiries or suggestions, feel free to reach out to us:
          </p>
          <ul class="mt-4 list-disc list-outside pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Email:</strong> <a href="mailto:info@crowdlibrary.com" class="text-blue-600 dark:text-blue-400 underline">info@crowdlibrary.com</a></li>
            <li><strong>Phone:</strong> +123 456 7890</li>
            <li><strong>Address:</strong> Crowd Library, Example Street 123, 12345 City, Country</li>
          </ul>
        </div>
      </section>

    </main>
  </div>
</template>
<script setup lang="ts">
</script>
