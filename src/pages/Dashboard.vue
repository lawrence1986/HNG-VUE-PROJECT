<template>
  <div class="min-h-screen flex flex-col bg-[#f9fafb]">
    <main class="flex-1 relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div class="mb-8">
          <h1 class="mb-2">Dashboard</h1>
          <p class="text-gray-600">Overview of your ticket management system</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card
            v-for="stat in stats"
            :key="stat.title"
            class="p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="flex items-start justify-between">
              <div>
                <p class="text-gray-600 mb-2">{{ stat.title }}</p>
                <p class="text-4xl">{{ stat.value }}</p>
              </div>
              <div :class="[stat.color, 'p-3 rounded-lg']">
                <component :is="stat.icon" class="w-8 h-8" />
              </div>
            </div>
          </Card>
        </div>

        <div class="mt-12">
          <div class="flex w-full items-center justify-between">
            <h2 class="mb-6">Recent Tickets</h2>
            <Button class="bg-[#2563eb] hover:bg-[#1d4ed8] cursor-pointer" @click="goToCreateTicket">
              <Plus class="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              v-for="ticket in recentTickets"
              :key="ticket.id"
              class="p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div class="flex items-start justify-between mb-3">
                <h3>{{ ticket.title }}</h3>
                <span :class="['px-3 py-1 rounded-full text-sm', statusColor(ticket.status)]">
                  {{ formatStatus(ticket.status) }}
                </span>
              </div>
              <p class="text-gray-600 mb-4">{{ ticket.description }}</p>
              <p class="text-sm text-gray-500">{{ formatDate(ticket.createdAt) }}</p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTicketsStore } from "@/stores/tickets";
import { CheckCircle2, Clock, Plus, Ticket as TicketIcon, XCircle } from "lucide-vue-next";

const router = useRouter();
const ticketsStore = useTicketsStore();
const { tickets } = storeToRefs(ticketsStore);

const totalTickets = computed(() => tickets.value.length);
const openTickets = computed(() => tickets.value.filter((t) => t.status === "open").length);
const inProgressTickets = computed(() => tickets.value.filter((t) => t.status === "in_progress").length);
const closedTickets = computed(() => tickets.value.filter((t) => t.status === "closed").length);

const stats = computed(() => [
  {
    title: "Total Tickets",
    value: totalTickets.value,
  icon: TicketIcon,
    color: "bg-blue-50",
  },
  {
    title: "Open Tickets",
    value: openTickets.value,
    icon: CheckCircle2,
    color: "bg-green-50",
  },
  {
    title: "In Progress",
    value: inProgressTickets.value,
    icon: Clock,
    color: "bg-amber-50",
  },
  {
    title: "Resolved Tickets",
    value: closedTickets.value,
    icon: XCircle,
    color: "bg-gray-50",
  },
]);

const recentTickets = computed(() => tickets.value.slice(0, 4));

const formatStatus = (status: string) => status.replace("_", " ");
const formatDate = (date: Date) => new Date(date).toLocaleDateString();

const statusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-[#22c55e] text-white";
    case "in_progress":
      return "bg-[#f59e0b] text-white";
    case "closed":
      return "bg-[#9ca3af] text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const goToCreateTicket = () => {
  router.push({ path: "/dashboard/tickets", query: { create: "true" } });
};
</script>
