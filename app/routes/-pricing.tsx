import { Link } from "@tanstack/react-router";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function PricingPage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b-2 border-[#1a1a1a] bg-[#f0f0e8] px-6 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-7xl leading-[0.85] font-black tracking-tighter uppercase md:text-9xl">
            PRICING.
          </h1>
          <p className="mt-8 max-w-2xl text-2xl font-bold md:text-3xl">
            $5/month. Not per user. Not per project. <span className="text-[#888]">Total.</span>
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="border-b-2 border-[#1a1a1a] bg-[#e8e8e0] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
            {/* Basic */}
            <div className="flex w-full max-w-md flex-col border-2 border-[#1a1a1a] bg-[#f0f0e8] p-8 shadow-[8px_8px_0px_0px_#1a1a1a] transition-all hover:translate-x-2 hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_#1a1a1a]">
              <div className="mb-2 text-xl font-bold tracking-widest text-[#888] uppercase">
                Basic
              </div>
              <div className="mb-4 text-6xl font-black tracking-tighter">
                $5<span className="text-2xl text-[#888]">/mo</span>
              </div>
              <p className="mb-8 text-lg font-medium text-[#1a1a1a]">
                Unlimited everything, except storage.
              </p>

              <ul className="mb-8 flex-grow space-y-4 text-lg font-bold">
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#2d5a2d]">&#10003;</span> Unlimited seats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#2d5a2d]">&#10003;</span> Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#2d5a2d]">&#10003;</span> Unlimited clients
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#2d5a2d]">&#10003;</span> 100GB Storage
                </li>
              </ul>

              <Link
                to="/sign-up"
                className="border-2 border-[#1a1a1a] bg-[#1a1a1a] py-4 text-center font-black text-[#f0f0e8] uppercase transition-colors hover:bg-[#2d5a2d]"
              >
                Get Basic
              </Link>
            </div>

            {/* Pro */}
            <div className="flex w-full max-w-md transform flex-col border-2 border-[#1a1a1a] bg-[#1a1a1a] p-8 text-[#f0f0e8] shadow-[8px_8px_0px_0px_#1a1a1a] transition-all hover:translate-x-2 hover:-translate-y-6 hover:shadow-[4px_4px_0px_0px_#1a1a1a] md:-translate-y-4">
              <div className="mb-2 flex items-start justify-between">
                <div className="text-xl font-bold tracking-widest text-[#7cb87c] uppercase">
                  Pro
                </div>
                <div className="-rotate-3 bg-[#2d5a2d] px-2 py-1 text-xs font-black tracking-wider uppercase">
                  Big files
                </div>
              </div>
              <div className="mb-4 text-6xl font-black tracking-tighter">
                $25<span className="text-2xl text-[#888]">/mo</span>
              </div>
              <p className="mb-8 text-lg font-medium">
                Literally the exact same thing but more space.
              </p>

              <ul className="mb-8 flex-grow space-y-4 text-lg font-bold">
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#7cb87c]">&#10003;</span> Unlimited seats
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#7cb87c]">&#10003;</span> Unlimited projects
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#7cb87c]">&#10003;</span> Unlimited clients
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-2xl text-[#7cb87c]">&#10003;</span> 1TB Storage
                </li>
              </ul>

              <Link
                to="/sign-up"
                className="border-2 border-[#f0f0e8] bg-[#f0f0e8] py-4 text-center font-black text-[#1a1a1a] uppercase transition-colors hover:bg-[#d8d8d0]"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b-2 border-[#1a1a1a] bg-[#f0f0e8] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            FAQ.
          </h2>

          <div className="divide-y-2 divide-[#1a1a1a] border-y-2 border-[#1a1a1a]">
            {[
              {
                q: "What counts as a seat?",
                a: "Anyone on your team. Invite everyone — editors, producers, clients. No extra charge.",
              },
              {
                q: "Can clients review without an account?",
                a: "Yes. Send a share link. They click, watch, and comment. No sign-up required.",
              },
              {
                q: "What happens if I hit the storage limit?",
                a: "Upgrade to Pro for more space, or delete old projects to free up room.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes. Sign up and try it. No credit card required to start.",
              },
              {
                q: "Is lawn really open source?",
                a: "Fully. Check our GitHub. Read the code, fork it, whatever you want.",
              },
            ].map((item, i) => (
              <div key={i} className="py-8">
                <h3 className="mb-3 text-xl font-black tracking-tight uppercase md:text-2xl">
                  {item.q}
                </h3>
                <p className="text-lg font-medium text-[#888]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a1a1a] px-6 py-32 text-[#f0f0e8]">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h2 className="mb-4 text-5xl leading-none font-black tracking-tighter uppercase md:text-7xl">
            Still reading?
          </h2>
          <p className="mb-12 text-xl font-medium text-[#888]">
            Just try it. No credit card. No commitment.
          </p>
          <Link
            to="/sign-up"
            className="border-2 border-[#f0f0e8] bg-[#f0f0e8] px-12 py-6 text-2xl font-black tracking-wider text-[#1a1a1a] uppercase shadow-[8px_8px_0px_0px_rgba(45,90,45,1)] transition-colors hover:translate-x-[2px] hover:translate-y-[2px] hover:border-[#2d5a2d] hover:bg-[#2d5a2d] hover:text-[#f0f0e8] hover:shadow-[4px_4px_0px_0px_rgba(45,90,45,1)]"
          >
            START FREE TRIAL
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
