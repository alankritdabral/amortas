import Image from "next/image";

// Only lenders that actually appear in lib/lenderEngine.ts's LENDERS table —
// the marquee previously also showed IDFC FIRST Bank, Bajaj Finserv, YES
// Bank, Credit Saison and Shriram, none of which are in that data.
import axisFinanceLogo from '@/public/logos/AXISFINANCE.svg';
import tataLogo from '@/public/logos/TATA.svg';
import ltFinanceLogo from '@/public/logos/L&T.svg';
import smfgLogo from '@/public/logos/SMFG.svg';
import kotakBankLogo from '@/public/logos/KOTAK_BANK.png';
import iciciBankLogo from '@/public/logos/ICICI.png';
import hdfcLogo from '@/public/logos/hdfc.webp';

/** Partner-lender strip shown right under the hero. The count matches the LENDERS table (13). */
export function HeroLogos() {
  return (
    <div className="w-full bg-white relative z-20">
      <p className="px-4 pt-6 text-center text-lg font-bold text-[#2E2E2E] sm:pt-8 sm:text-xl">
        13 partner banks and NBFCs compared in one place
      </p>
      <div className="max-w-[1220px] mx-auto flex flex-col xl:flex-row xl:items-center py-4 sm:py-6 overflow-hidden">

        <div className="flex-1 flex items-center min-w-0 logo-strip">
          <div className="flex w-max animate-marquee opacity-100 transition-all duration-500 items-center">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-8 sm:gap-14 pr-8 sm:pr-14">
                <Image src={axisFinanceLogo} alt="Axis Finance" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={hdfcLogo} alt="HDFC Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={tataLogo} alt="Tata Capital" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={ltFinanceLogo} alt="L&T Finance" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={smfgLogo} alt="SMFG India Credit" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={kotakBankLogo} alt="Kotak Mahindra Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
                <Image src={iciciBankLogo} alt="ICICI Bank" className="shrink-0 h-[25px] sm:h-10 w-auto object-contain opacity-100 mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
