import { defineStore } from "pinia";

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  sessionActive?: boolean;
}

interface AuthState {
  user: User | null;
  users: User[];
}

const USER_STORAGE_KEY = "ticketapp_user";
const USERS_STORAGE_KEY = "ticketapp_session";

const isBrowser = typeof window !== "undefined";

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

const sanitizeUser = (
  candidate: Partial<User> | null | undefined
): User | null => {
  if (!candidate) {
    return null;
  }
  const id = candidate.id ? String(candidate.id) : "";
  const email = candidate.email ? String(candidate.email) : "";
  const name = candidate.name ? String(candidate.name) : "";
  if (!id || !email) {
    return null;
  }
  return {
    id,
    email,
    name,
    password:
      typeof candidate.password === "string" ? candidate.password : undefined,
    sessionActive: Boolean(candidate.sessionActive),
  };
};

const sanitizeUsers = (value: unknown): User[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((entry) => sanitizeUser(entry as Partial<User>))
    .filter((entry): entry is User => entry !== null);
};

const loadUser = (): User | null => {
  if (!isBrowser) {
    return null;
  }
  const stored = safeParse<Partial<User> | null>(
    localStorage.getItem(USER_STORAGE_KEY),
    null
  );
  return sanitizeUser(stored);
};

const loadUsers = (): User[] => {
  if (!isBrowser) {
    return [];
  }
  const stored = safeParse<unknown>(
    localStorage.getItem(USERS_STORAGE_KEY),
    []
  );
  return sanitizeUsers(stored);
};

const persistUser = (user: User | null) => {
  if (!isBrowser) {
    return;
  }
  if (!user) {
    localStorage.removeItem(USER_STORAGE_KEY);
    return;
  }
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
};

const persistUsers = (users: User[]) => {
  if (!isBrowser) {
    return;
  }
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: loadUser(),
    users: loadUsers(),
  }),
  actions: {
    async login(email: string, password: string) {
      await delay();
      const existingUser = this.users.find((record) => record.email === email);
      if (!existingUser) {
        throw new Error("No account found for that email address.");
      }
      if (existingUser.password !== password) {
        throw new Error("Incorrect password. Please try again.");
      }
      const activeUser: User = { ...existingUser, sessionActive: true };
      this.user = activeUser;
      this.users = this.users.map((record) =>
        record.id === existingUser.id
          ? { ...record, sessionActive: true }
          : record
      );
      persistUser(activeUser);
      persistUsers(this.users);
    },
    async signup(name: string, email: string, password: string) {
      await delay();
      const isEmailTaken = this.users.some((record) => record.email === email);
      if (isEmailTaken) {
        throw new Error("An account with that email already exists.");
      }
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        sessionActive: true,
      };
      this.users = [...this.users, newUser];
      this.user = newUser;
      persistUser(newUser);
      persistUsers(this.users);
    },
    logout() {
      const currentId = this.user?.id;
      if (currentId) {
        this.users = this.users.map((record) =>
          record.id === currentId ? { ...record, sessionActive: false } : record
        );
        persistUsers(this.users);
      }
      this.user = null;
      persistUser(null);
    },
  },
});
