import { redirect } from "next/navigation";
import { CLAIM_PORTAL_URL } from "@/lib/urls";

export default function FindClaimRedirect() {
  redirect(CLAIM_PORTAL_URL);
}
