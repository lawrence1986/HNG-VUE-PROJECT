<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-[1440px] mx-auto px-5 py-4">
      <div class="flex items-center justify-between gap-4">
        <RouterLink to="/" class="text-blue-600 text-2xl font-semibold">
          Ticcket
        </RouterLink>

        <button
          v-if="isAuthenticated"
          type="button"
          class="md:hidden inline-flex w-10 h-10 items-center justify-center rounded-md border border-slate-200 text-gray-700 transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="toggleMenu"
        >
          <Menu v-if="!menuOpen" class="h-5 w-5" aria-hidden="true" />
          <X v-else class="h-5 w-5" aria-hidden="true" />
        </button>

        <div class="hidden md:flex items-center gap-4">
          <template v-if="isAuthenticated">
            <Button
              variant="secondary"
              class="bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <RouterLink
                to="/dashboard"
                class="flex items-center justify-center gap-1 text-white"
              >
                <LayoutDashboard class="w-4 h-4" />
                Dashboard
              </RouterLink>
            </Button>
            <Button variant="ghost">
              <RouterLink
                to="/dashboard/tickets"
                class="flex items-center justify-center gap-1 text-gray-700"
              >
                <TicketIcon class="w-4 h-4" />
                Tickets
              </RouterLink>
            </Button>
            <div class="flex items-center gap-4">
              <p class="text-sm text-gray-600">Hi, {{ user?.name }}</p>
              <RouterLink
                to="/"
                class="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                @click.prevent="handleLogout"
              >
                <LogOutIcon class="h-4 w-4" />
                Logout
              </RouterLink>
            </div>
          </template>
        </div>
      </div>

      <div v-if="isAuthenticated" id="mobile-menu" class="md:hidden">
        <div
          v-show="menuOpen"
          class="mt-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
        >
          <Button
            variant="secondary"
            class="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            <RouterLink
              to="/dashboard"
              class="flex items-center justify-center gap-2 text-white"
              @click="closeMenu"
            >
              <LayoutDashboard class="w-4 h-4" />
              Dashboard
            </RouterLink>
          </Button>
          <Button variant="ghost" class="w-full">
            <RouterLink
              to="/dashboard/tickets"
              class="flex items-center justify-center gap-2 text-gray-700"
              @click="closeMenu"
            >
              <TicketIcon class="w-4 h-4" />
              Tickets
            </RouterLink>
          </Button>
          <div class="flex flex-col items-center gap-2">
            <p class="text-sm text-gray-600">Hi, {{ user?.name }}</p>
            <button
              type="button"
              class="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-slate-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              @click="handleLogout"
            >
              <LogOutIcon class="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/composables/useAuth";
import {
  LayoutDashboard,
  LogOut as LogOutIcon,
  Menu,
  Ticket as TicketIcon,
  X,
} from "lucide-vue-next";

const router = useRouter();
const route = useRoute();
const { user, logout } = useAuth();

const isAuthenticated = computed(() => Boolean(user.value?.sessionActive));
const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};

watch(
  () => route.fullPath,
  () => {
    closeMenu();
  }
);

const handleLogout = () => {
  closeMenu();
  setTimeout(() => {
    logout();
    router.push("/");
  }, 300);
};
</script>
