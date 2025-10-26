<template>
  <div
    class="min-h-screen flex items-center justify-center bg-[#f9fafb] relative overflow-hidden px-4"
  >
    <Card class="w-full max-w-md p-8 shadow-xl relative z-10">
      <div class="text-center mb-8">
        <h1 class="mb-2">
          {{ isLoginMode ? "Welcome Back" : "Create Account" }}
        </h1>
        <p class="text-gray-600">
          {{
            isLoginMode
              ? "Enter your credentials to access your account"
              : "Sign up to start managing your tickets"
          }}
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <div v-if="!isLoginMode" class="space-y-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="name"
            type="text"
            placeholder="John Doe"
            :class="errorClass(errors.name)"
          />
          <p v-if="errors.name" class="text-red-500 text-sm">
            {{ errors.name }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            :class="errorClass(errors.email)"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            :class="errorClass(errors.password)"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>

        <Button
          type="submit"
          class="w-full bg-[#2563eb] hover:bg-[#1d4ed8]"
          :disabled="loading"
        >
          {{ loading ? "Please wait..." : isLoginMode ? "Login" : "Sign Up" }}
        </Button>
      </form>

      <div class="mt-6 text-center">
        <button
          type="button"
          class="text-[#2563eb] hover:underline"
          @click="toggleMode"
        >
          {{
            isLoginMode
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"
          }}
        </button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/composables/useAuth";

type AuthMode = "login" | "signup";

const route = useRoute();
const router = useRouter();
const { login, signup } = useAuth();

const mode = ref<AuthMode>("login");
const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const errors = reactive<{ name?: string; email?: string; password?: string }>(
  {}
);

const isLoginMode = computed(() => mode.value === "login");

const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const resetErrors = () => {
  errors.name = undefined;
  errors.email = undefined;
  errors.password = undefined;
};

const resetForm = () => {
  name.value = "";
  email.value = "";
  password.value = "";
  resetErrors();
};

const applyInitialMode = (initialMode: unknown) => {
  mode.value = initialMode === "signup" ? "signup" : "login";
};

watch(
  () => route.params.initialMode,
  (value) => {
    applyInitialMode(value);
    resetErrors();
  },
  { immediate: true }
);

const toggleMode = () => {
  mode.value = isLoginMode.value ? "signup" : "login";
  resetForm();
  router.replace({
    name: "auth",
    params: { initialMode: isLoginMode.value ? "login" : "signup" },
  });
};

const errorClass = (message?: string) =>
  message ? "border-red-500" : undefined;

const handleSubmit = async () => {
  resetErrors();

  const validationErrors: { name?: string; email?: string; password?: string } =
    {};
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const nameValue = name.value.trim();

  if (!emailValue) {
    validationErrors.email = "Email is required";
  } else if (!validateEmail(emailValue)) {
    validationErrors.email = "Please enter a valid email";
  }

  if (!passwordValue) {
    validationErrors.password = "Password is required";
  } else if (passwordValue.length < 6) {
    validationErrors.password = "Password must be at least 6 characters";
  }

  if (!isLoginMode.value && !nameValue) {
    validationErrors.name = "Name is required";
  }

  if (
    validationErrors.email ||
    validationErrors.password ||
    validationErrors.name
  ) {
    errors.email = validationErrors.email;
    errors.password = validationErrors.password;
    errors.name = validationErrors.name;
    return;
  }

  loading.value = true;

  try {
    if (isLoginMode.value) {
      await login(emailValue, passwordValue);
      toast.success("Welcome back! You're all set.");
    } else {
      await signup(nameValue, emailValue, passwordValue);
      toast.success("Account created successfully! You're now signed in.");
    }

    const redirectTarget = (route.query.redirect as string) || "/dashboard";
    router.replace(redirectTarget);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";
    toast.error(message);
  } finally {
    loading.value = false;
  }
};
</script>
