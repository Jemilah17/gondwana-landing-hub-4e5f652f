import { createFileRoute } from "@tanstack/react-router";
import rockImage from "@/assets/rock-layers.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-full bg-stone-bg text-earth-deep font-sans selection:bg-mineral/20">
      {/* Hero Section */}
      <section className="py-24 md:py-32 lg:py-48 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-[56ch]">
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl leading-none text-balance font-medium mb-12">
              Governance is the bedrock of enduring enterprise.
            </h1>
            <p className="text-base md:text-lg text-earth-deep/80 text-pretty leading-relaxed mb-10">
              We advise organizations on the foundational structures that precede
              success. Like the deep geology of the southern supercontinent,
              governance is the quiet strength that holds the surface together.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-mineral text-stone-bg text-sm font-medium py-2.5 pr-4 pl-3 rounded flex items-center gap-2 ring-1 ring-mineral transition-transform active:scale-[0.98]">
                <svg
                  className="size-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M3 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H3zm10 11H3L2 12V4l1-1h10l1 1v8l-1 1z" />
                  <path d="M11 5H5v1h6V5zm0 2H5v1h6V7zm-6 2h3v1H5V9z" />
                </svg>
                View approach
              </button>
              <button className="text-sm font-medium py-2.5 px-5 ring-1 ring-earth-deep/10 rounded hover:ring-earth-deep/20 transition-colors">
                The Gondwana Thesis
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop / Image Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <img
                src={rockImage}
                alt="Layered sedimentary rock with subtle green mineral veins"
                width={1200}
                height={800}
                loading="lazy"
                className="w-full aspect-[4/3] object-cover bg-stone-surface outline outline-1 -outline-offset-1 outline-earth-deep/5 rounded-xl"
              />
            </div>
            <div className="lg:col-span-5 pt-8 lg:pt-0">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-clay block mb-6">
                The Subsurface
              </span>
              <h2 className="font-display text-3xl leading-tight text-balance font-medium mb-8">
                Beneath the surface of strategy lies the architecture of intent.
              </h2>
              <div className="space-y-8">
                <div className="group border-t border-earth-deep/10 pt-6">
                  <h3 className="text-sm font-semibold mb-2">Structural Resilience</h3>
                  <p className="text-sm text-earth-deep/70 max-w-[48ch] text-pretty">
                    We design decision-making frameworks that withstand external
                    volatility and internal transition.
                  </p>
                </div>
                <div className="group border-t border-earth-deep/10 pt-6">
                  <h3 className="text-sm font-semibold mb-2">Ethics by Design</h3>
                  <p className="text-sm text-earth-deep/70 max-w-[48ch] text-pretty">
                    Moving beyond compliance into active stewardship. We align
                    operational reality with stated values.
                  </p>
                </div>
                <div className="group border-t border-earth-deep/10 pt-6">
                  <h3 className="text-sm font-semibold mb-2">Succession Geology</h3>
                  <p className="text-sm text-earth-deep/70 max-w-[48ch] text-pretty">
                    Ensuring institutional knowledge and leadership stability through
                    multi-generational planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Signal */}
      <section className="py-24 bg-stone-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <div className="font-display text-4xl font-medium mb-1">140+</div>
              <div className="text-xs uppercase tracking-widest text-earth-deep/50">
                Boards Advised
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-medium mb-1">$12B</div>
              <div className="text-xs uppercase tracking-widest text-earth-deep/50">
                AUM Protected
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-medium mb-1">18</div>
              <div className="text-xs uppercase tracking-widest text-earth-deep/50">
                Years Stable
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-medium mb-1">4</div>
              <div className="text-xs uppercase tracking-widest text-earth-deep/50">
                Continents
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Statement CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-4xl leading-tight font-medium mb-8">
            Build on solid ground.
          </h2>
          <p className="text-earth-deep/70 mb-12">
            Our partners work with a select cohort of institutions dedicated to
            generational resilience. Inquire to begin the discovery process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-earth-deep text-stone-bg text-sm font-medium py-3 px-8 rounded-full ring-1 ring-earth-deep transition-transform active:scale-[0.98]">
              Inquire for advisory
            </button>
            <button className="text-sm font-medium py-3 px-8 ring-1 ring-earth-deep/10 rounded-full hover:bg-stone-surface transition-colors">
              Review the journal
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-earth-deep/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="size-4 bg-mineral rounded-sm" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Gondwana
            </span>
          </div>
          <div className="flex gap-12">
            <div className="space-y-2">
              <span className="block text-[10px] uppercase tracking-widest text-earth-deep/40">
                Melbourne
              </span>
              <span className="block text-xs">Collins Street, VIC 3000</span>
            </div>
            <div className="space-y-2">
              <span className="block text-[10px] uppercase tracking-widest text-earth-deep/40">
                London
              </span>
              <span className="block text-xs">Marylebone, W1U 4PT</span>
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-earth-deep/40">
            © 2024 Gondwana Governance Partners
          </div>
        </div>
      </footer>
    </div>
  );
}
