import { Hero } from "@/components/sections/hero";
import { Catalog } from "@/components/sections/catalog";
import { RecommendationPanel } from "@/components/recommendation-panel";

export default function HomePage() {
  return (
    <>
      <Hero />
      <RecommendationPanel />
      <Catalog />
    </>
  );
}
