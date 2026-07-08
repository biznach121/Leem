import type { Metadata } from "next";
import { brand } from "@/lib/brand";

// Exact pin when the brand provides one; otherwise a name+city search works
// for any business without coordinates.
const mapsQuery = encodeURIComponent(`${brand.name} ${brand.contact.city} Ghana`);
const mapsUrl =
  brand.contact.mapsUrl ?? `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
const mapsEmbed =
  brand.contact.mapsEmbed ?? `https://www.google.com/maps?q=${mapsQuery}&z=15&output=embed`;

export const metadata: Metadata = {
  title: `Location — ${brand.name}`,
  description: `Find ${brand.name} in ${brand.contact.city}.`,
};

export default function LocationPage() {
  return (
    <main className="bg-[#dae7f3] text-[#003a37]">
      <section className="mx-auto grid min-h-[calc(100svh-120px)] max-w-6xl gap-10 px-4 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-20">
        <div>
          <p className="m-0 mb-4 text-[12px] font-semibold uppercase text-[#517ea1]">
            Visit us
          </p>
          <h1 className="m-0 font-serif text-[48px] font-light leading-[0.88] tracking-normal sm:text-[76px] lg:text-[92px]">
            {brand.name},
            <br />
            {brand.contact.city}
          </h1>
          <p className="mt-6 max-w-[420px] text-[16px] font-medium leading-[1.4] text-[#004745]/80 sm:mt-7 sm:text-[18px]">
            {brand.microTag}. Tap below to open the shop location in Google Maps.
          </p>

          <div className="mt-9 grid gap-3 text-[17px] font-semibold text-[#003a37]/82">
            <a href={`tel:${brand.contact.phoneTel}`} className="transition-colors hover:text-[#517ea1]">
              Call {brand.contact.phone}
            </a>
            {brand.contact.textPhone ? (
              <a
                href={`sms:${brand.contact.textPhoneTel ?? brand.contact.phoneTel}`}
                className="transition-colors hover:text-[#517ea1]"
              >
                Text {brand.contact.textPhone}
              </a>
            ) : null}
            <p className="m-0">{brand.contact.city}, Ghana</p>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex h-14 items-center justify-center bg-[#003a37] px-7 text-[13px] font-semibold uppercase text-[#e5f2fe] transition-transform hover:scale-105"
          >
            Open in Google Maps
          </a>
        </div>

        <div className="overflow-hidden rounded-[24px] border border-[#003a37]/12 bg-[#bfd7eb] shadow-[0_26px_80px_rgba(0, 58, 55,0.12)] sm:rounded-[28px]">
          <iframe
            title={`${brand.name} location map`}
            src={mapsEmbed}
            className="h-[360px] w-full border-0 sm:h-[560px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
