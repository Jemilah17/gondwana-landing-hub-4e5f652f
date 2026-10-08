import { createFileRoute } from "@tanstack/react-router";
import BoardPack from "@/features/bolt/pages/BoardPack";

export const Route = createFileRoute("/board-pack")({
  head: () => ({
    meta: [
      { title: "Board pack builder — Meridian Holdings" },
      { name: "description", content: "Compile and distribute board packs for Meridian Holdings Ltd meetings, tracking every required document." },
      { property: "og:title", content: "Board pack builder — Meridian Holdings" },
      { property: "og:description", content: "Compile and distribute board packs for Meridian Holdings Ltd meetings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BoardPack,
});
