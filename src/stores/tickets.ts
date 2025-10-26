import { defineStore } from "pinia";

export type TicketStatus = "open" | "in_progress" | "closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: Date;
}

interface TicketState {
  tickets: Ticket[];
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    title: "Fix login page bug",
    description: "Users are unable to login with correct credentials",
    status: "open",
    createdAt: new Date("2025-10-20"),
  },
  {
    id: "2",
    title: "Update dashboard UI",
    description: "Modernize the dashboard with new design system",
    status: "in_progress",
    createdAt: new Date("2025-10-21"),
  },
  {
    id: "3",
    title: "Database optimization",
    description: "Improve query performance for large datasets",
    status: "closed",
    createdAt: new Date("2025-10-19"),
  },
  {
    id: "4",
    title: "Add export functionality",
    description: "Allow users to export reports to CSV",
    status: "open",
    createdAt: new Date("2025-10-22"),
  },
];

export const useTicketsStore = defineStore("tickets", {
  state: (): TicketState => ({
    tickets: [...mockTickets],
  }),
  actions: {
    addTicket(ticket: Omit<Ticket, "id" | "createdAt">) {
      const newTicket: Ticket = {
        ...ticket,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      this.tickets = [newTicket, ...this.tickets];
    },
    updateTicket(id: string, updates: Partial<Ticket>) {
      const targetIndex = this.tickets.findIndex((ticket) => ticket.id === id);
      if (targetIndex === -1) {
        return;
      }
      const existing = this.tickets[targetIndex];
      if (!existing) {
        return;
      }
      const merged = { ...existing, ...updates };
      this.tickets[targetIndex] = {
        id: existing.id,
        title: merged.title ?? existing.title,
        description: merged.description ?? existing.description,
        status: merged.status ?? existing.status,
        createdAt: merged.createdAt ?? existing.createdAt,
      };
    },
    deleteTicket(id: string) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    },
  },
});
