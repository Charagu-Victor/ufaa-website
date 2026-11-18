import { redirect } from "next/navigation";
import { CAREERS_SITE_URL } from "@/lib/urls";

export default function VacanciesPage() {
  redirect(CAREERS_SITE_URL);
}
