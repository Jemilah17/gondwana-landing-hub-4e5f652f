// NOTE: this app has no real backend authentication. The sign-in screen
// (features/bolt/pages/SignIn.tsx) is a user picker — it sets an active session
// from a seed list, it does not check credentials. Anyone with the link can
// select any identity, including CoSec and director accounts.
//
// Before this is shared with an actual external consultant (rather than used
// internally for review/testing), real authentication (e.g. Supabase) must
// replace this picker.
import { createFileRoute } from "@tanstack/react-router";
import SignIn from "@/features/bolt/pages/SignIn";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — Gondwana Holdings Governance" },
      { name: "description", content: "Sign in to the Gondwana Holdings governance dashboard by selecting your secretariat, director, or consultant access level." },
      { property: "og:title", content: "Sign in — Gondwana Holdings Governance" },
      { property: "og:description", content: "Secure entry point to the Gondwana Holdings governance dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignIn,
});
