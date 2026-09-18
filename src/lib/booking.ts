import type { AuthUser } from "@/hooks/useAuth";

export function getBookingPath(user: AuthUser | null): string {
  if (!user) return "/login";
  if (user.role !== "patient") return "/dashboard";
  return "/patient/appointments";
}
