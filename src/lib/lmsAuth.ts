export interface User {
  email: string;
  name: string;
  role: "admin" | "student" | "instructor";
  college?: string;
  discord?: string;
  year?: string;
  reservations?: any[];
}

export function getLoggedInUser(): User | null {
  const data = localStorage.getItem("lms_user");
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function setLoggedInUser(user: User | null) {
  if (user) {
    localStorage.setItem("lms_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("lms_user");
  }
}
