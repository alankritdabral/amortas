'use client';
import { EligibilityForm } from './EligibilityForm';

export function LeadForm() {
  return (
    <section id="lead-form" className="py-12 md:py-[72px] bg-[#FFE4CC]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <EligibilityForm />
      </div>
    </section>
  );
}
