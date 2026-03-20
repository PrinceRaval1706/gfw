type User = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};

const USERS_KEY = "gf_users";
const SESSION_KEY = "gf_session";

function loadUsers(): any[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: any[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getSession(): User | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export async function registerUser(input: {
  name: string;
  identifier: string; // email or phone
  password: string;
}) {
  const users = loadUsers();
  const isEmail = input.identifier.includes("@");

  const exists = users.find((u) =>
    isEmail ? u.email === input.identifier : u.phone === input.identifier
  );
  if (exists) throw new Error("User already exists. Please login.");

  const user: any = {
    id: crypto.randomUUID(),
    name: input.name,
    email: isEmail ? input.identifier : undefined,
    phone: !isEmail ? input.identifier : undefined,
    password: input.password, // frontend demo only (backend will hash)
  };

  users.push(user);
  saveUsers(users);

  const session: User = { id: user.id, name: user.name, email: user.email, phone: user.phone };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function loginUser(input: { identifier: string; password: string }) {
  const users = loadUsers();
  const isEmail = input.identifier.includes("@");

  const user = users.find((u) =>
    isEmail ? u.email === input.identifier : u.phone === input.identifier
  );

  if (!user) throw new Error("No user found. Please register.");
  if (user.password !== input.password) throw new Error("Wrong password.");

  const session: User = { id: user.id, name: user.name, email: user.email, phone: user.phone };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}