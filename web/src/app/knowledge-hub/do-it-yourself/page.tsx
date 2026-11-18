import type { Metadata } from "next";
import { DIYVideoGrid, type DIYVideo } from "@/components/DIYVideoGrid";
import { Container, PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Do It Yourself",
  description: "Step-by-step videos for searching for and claiming unclaimed financial assets, and reporting assets to UFAA.",
};

const videos: DIYVideo[] = [
  {
    id: "3qBdKvmCsaY",
    title: "How to lodge a claim as an administrator of a deceased's estate",
    category: "Claims",
  },
  {
    id: "Gx9FT31_rD8",
    title: "How to lodge a claim as a business entity",
    category: "Claims",
  },
  {
    id: "f57d0J2qle4",
    title: "How to lodge a claim as an agent of the claim's rightful holder",
    category: "Claims",
  },
  {
    id: "xFX5odBfqOY",
    title: "How to submit unclaimed financial assets to UFAA as a holding institution",
    category: "Asset holders",
  },
  {
    id: "ZwMlQJGsl_U",
    title: "How to lodge a claim as the original owner",
    category: "Claims",
  },
  {
    id: "_tCP_1xz5HE",
    title: "How to check if there are any unclaimed financial assets in your name",
    category: "Searching",
  },
];

export default function DoItYourselfPage() {
  return (
    <>
      <PageHeader
        title="How To... Videos"
        intro="Watch step-by-step guides to help you check for assets, lodge a claim, and report assets to UFAA."
        crumbs={[{ label: "Knowledge Hub" }, { label: "Do It Yourself" }]}
      />
      <Container className="py-8 sm:py-10">
        <DIYVideoGrid videos={videos} />
      </Container>
    </>
  );
}
