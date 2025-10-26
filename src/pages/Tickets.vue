<template>
  <div class="min-h-screen flex flex-col bg-[#f9fafb]">
    <main class="flex-1 relative overflow-hidden">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 class="mb-2">Tickets</h1>
            <p class="text-gray-600">Manage and track all your support tickets</p>
          </div>
          <Button class="bg-[#2563eb] hover:bg-[#1d4ed8]" @click="handleCreateTicket">
            <Plus class="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>

  <div v-if="tickets.length === 0" class="text-center py-20">
          <p class="text-gray-600 mb-4">No tickets yet. Create your first ticket to get started!</p>
          <Button class="bg-[#2563eb] hover:bg-[#1d4ed8]" @click="handleCreateTicket">
            <Plus class="w-4 h-4 mr-2" />
            Create Ticket
          </Button>
        </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TicketCard
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
            :on-edit="handleEditTicket"
            :on-delete="handleDeleteClick"
          />
        </div>
      </div>
    </main>

    <TicketDialog
      v-model:open="dialogOpen"
      :mode="dialogMode"
      :ticket="selectedTicket"
      @submit="handleSubmit"
    />

    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="handleDeleteCancel">Cancel</AlertDialogCancel>
          <AlertDialogAction class="bg-red-500 hover:bg-red-600" @click="handleDeleteConfirm">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import TicketCard from "@/components/Ticket.vue";
import TicketDialog from "@/components/TicketDialog.vue";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTicketsStore, type Ticket, type TicketStatus } from "@/stores/tickets";
import { Plus } from "lucide-vue-next";
import { toast } from "vue-sonner";

const router = useRouter();
const route = useRoute();

const ticketsStore = useTicketsStore();
const { tickets } = storeToRefs(ticketsStore);

const dialogOpen = ref(false);
const dialogMode = ref<"create" | "edit">("create");
const selectedTicket = ref<Ticket | null>(null);
const deleteDialogOpen = ref(false);
const ticketToDelete = ref<string | null>(null);

const handleCreateTicket = () => {
  dialogMode.value = "create";
  selectedTicket.value = null;
  dialogOpen.value = true;
};

const handleEditTicket = (ticket: Ticket) => {
  dialogMode.value = "edit";
  selectedTicket.value = ticket;
  dialogOpen.value = true;
};

const handleDeleteClick = (id: string) => {
  ticketToDelete.value = id;
  deleteDialogOpen.value = true;
};

const handleDeleteConfirm = () => {
  if (ticketToDelete.value) {
    ticketsStore.deleteTicket(ticketToDelete.value);
    toast.success("Ticket deleted successfully");
    ticketToDelete.value = null;
  }
  deleteDialogOpen.value = false;
};

const handleDeleteCancel = () => {
  ticketToDelete.value = null;
  deleteDialogOpen.value = false;
};

const handleSubmit = (data: { title: string; description: string; status: TicketStatus }) => {
  if (dialogMode.value === "create") {
    ticketsStore.addTicket(data);
    toast.success("Ticket created successfully");
  } else if (selectedTicket.value) {
    ticketsStore.updateTicket(selectedTicket.value.id, data);
    toast.success("Ticket updated successfully");
  }
  selectedTicket.value = null;
};

const clearCreateQuery = () => {
  router.replace({ query: { ...route.query, create: undefined } });
};

watch(
  () => route.query.create,
  (createFlag) => {
    if (createFlag === "true") {
      handleCreateTicket();
      clearCreateQuery();
    }
  },
  { immediate: true }
);
</script>
