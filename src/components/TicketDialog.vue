<template>
  <Dialog :open="open" @update:open="handleOpenChange">
    <DialogContent class="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {{ isEditMode ? "Edit Ticket" : "Create New Ticket" }}
        </DialogTitle>
        <DialogDescription>
          {{
            isEditMode
              ? "Update the ticket information below."
              : "Fill in the details to create a new ticket."
          }}
        </DialogDescription>
      </DialogHeader>

      <form class="space-y-4 mt-4" @submit.prevent="handleSubmit">
        <div class="space-y-2">
          <Label for="title">Title</Label>
          <Input
            id="title"
            v-model="title"
            placeholder="Enter ticket title"
            :class="errors.title ? 'border-red-500' : undefined"
            :aria-invalid="errors.title ? 'true' : undefined"
          />
          <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        </div>

        <div class="space-y-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="description"
            placeholder="Describe the issue or task"
            rows="4"
            :class="errors.description ? 'border-red-500' : undefined"
            :aria-invalid="errors.description ? 'true' : undefined"
          />
          <p v-if="errors.description" class="text-red-500 text-sm">
            {{ errors.description }}
          </p>
        </div>

        <div class="space-y-2">
          <Label for="status">Status</Label>
          <Select v-model="status">
            <SelectTrigger id="status">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" @click="closeDialog">
            Cancel
          </Button>
          <Button type="submit" class="bg-[#2563eb] hover:bg-[#1d4ed8]">
            {{ isEditMode ? "Update Ticket" : "Create Ticket" }}
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Ticket, TicketStatus } from "@/stores/tickets";

interface TicketDialogProps {
  open: boolean;
  ticket?: Ticket | null;
  mode: "create" | "edit";
}

const props = defineProps<TicketDialogProps>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
  (
    e: "submit",
    payload: { title: string; description: string; status: TicketStatus }
  ): void;
}>();

const title = ref("");
const description = ref("");
const status = ref<TicketStatus>("open");

const errors = reactive<{ title?: string; description?: string }>({});

const isEditMode = computed(() => props.mode === "edit");

const resetForm = (ticket: Ticket | null | undefined, mode: "create" | "edit") => {
  if (ticket && mode === "edit") {
    title.value = ticket.title;
    description.value = ticket.description;
    status.value = ticket.status;
  } else {
    title.value = "";
    description.value = "";
    status.value = "open";
  }
  errors.title = undefined;
  errors.description = undefined;
};

watch(
  () => [props.ticket, props.mode, props.open] as const,
  ([nextTicket, nextMode]) => {
    resetForm(nextTicket, nextMode);
  },
  { immediate: true }
);

const handleSubmit = () => {
  errors.title = undefined;
  errors.description = undefined;

  const trimmedTitle = title.value.trim();
  const trimmedDescription = description.value.trim();

  const validationErrors: { title?: string; description?: string } = {};

  if (!trimmedTitle) {
    validationErrors.title = "Title is required";
  }

  if (!trimmedDescription) {
    validationErrors.description = "Description is required";
  }

  if (validationErrors.title || validationErrors.description) {
    errors.title = validationErrors.title;
    errors.description = validationErrors.description;
    return;
  }

  emit("submit", {
    title: trimmedTitle,
    description: trimmedDescription,
    status: status.value,
  });
  emit("update:open", false);
};

const handleOpenChange = (value: boolean) => {
  emit("update:open", value);
};

const closeDialog = () => {
  emit("update:open", false);
};
</script>
