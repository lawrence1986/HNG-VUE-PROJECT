<template>
  <Card class="p-6 shadow-lg hover:shadow-xl transition-all">
    <div class="flex items-start justify-between mb-3">
      <h3>{{ ticket.title }}</h3>
      <span class="px-3 py-1 rounded-full text-sm" :class="statusColor">
        {{ statusLabel }}
      </span>
    </div>

    <p class="text-gray-600 mb-4 line-clamp-2">
      {{ ticket.description }}
    </p>

    <div class="flex items-center justify-between">
      <p class="text-sm text-gray-500">Created: {{ createdAtLabel }}</p>
      <div class="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          class="hover:bg-[#2563eb] hover:text-white transition-colors"
          @click="handleEdit"
        >
          <Pencil class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
          @click="handleDelete"
        >
          <Trash2 class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Ticket } from "@/stores/tickets";
import { Pencil, Trash2 } from "lucide-vue-next";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const props = defineProps<TicketCardProps>();

const getStatusColor = (status: Ticket["status"]) => {
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

const getStatusLabel = (status: Ticket["status"]) =>
  status.replace("_", " ").toUpperCase();

const statusColor = computed(() => getStatusColor(props.ticket.status));
const statusLabel = computed(() => getStatusLabel(props.ticket.status));
const createdAtLabel = computed(() =>
  new Date(props.ticket.createdAt).toLocaleDateString()
);

const handleEdit = () => props.onEdit(props.ticket);
const handleDelete = () => props.onDelete(props.ticket.id);
</script>
