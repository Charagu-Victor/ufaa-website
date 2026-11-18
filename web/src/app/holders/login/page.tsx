import { redirect } from "next/navigation";
import { HOLDERS_PORTAL_URL } from "@/lib/urls";

export default function HoldersPortalRedirect() {
  redirect(HOLDERS_PORTAL_URL);
}
