import { createFileRoute } from "@tanstack/react-router";
import SignIn from "@/features/bolt/pages/SignIn";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Gondwana Holdings Governance" },
      { name: "description", content: "Sign in to the Gondwana Holdings governance dashboard by selecting your secretariat or director access level." },
      { property: "og:title", content: "Sign in — Gondwana Holdings Governance" },
      { property: "og:description", content: "Secure entry point to the Gondwana Holdings governance dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignIn,
});
