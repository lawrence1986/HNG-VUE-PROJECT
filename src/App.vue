<script setup lang="ts">
import { RouterView } from "vue-router";
import { Toaster } from "vue-sonner";
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <main class="max-w-[1440px] mx-auto min-h-dvh relative">
    <Toaster
      position="bottom-right"
      richColors
      close-button
      close-button-position="top-right"
    />
    <NavBar />
    <RouterView />
    <Footer />
  </main>
</template>
