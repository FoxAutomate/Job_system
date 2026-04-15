"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Bilingual recruitment privacy notice (Estonian + English).
 * Not legal advice — have counsel review for your processes.
 */
export function GDPRConsentModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-h-[min(85vh,720px)] max-w-[min(100%-2rem,42rem)] overflow-y-auto sm:max-w-2xl"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg">
            Isikuandmete töötlemine / Processing of personal data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm leading-relaxed text-neutral-800">
          <section className="space-y-3" lang="et">
            <h3 className="font-heading text-sm font-semibold text-neutral-950">
              Eesti
            </h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                <strong>Andmete vastutav töötleja:</strong> Cannery OÜ
                (Eesti).
              </li>
              <li>
                <strong>Töötluse eesmärk:</strong> värbamisprotsessi
                läbiviimine valitud ametikoha jaoks ning kandidaatide kaasamine
                tulevastesse värbamisprotsessidesse vastavalt teie nõusolekule.
              </li>
              <li>
                <strong>Õiguslik alus:</strong> kandidaadi nõusolek ning
                Eesti tööõigusest tulenevad nõuded, kooskõlas üldise
                andmekaitse määrusega (GDPR).
              </li>
              <li>
                <strong>Säilitamistähtaeg:</strong> kuni 6 kuud pärast
                värbamisprotsessi lõppu, välja arvatud juhul, kui olete andnud
                nõusoleku andmete säilitamiseks ka hilisemate värbamiste jaoks
                — sellisel juhul vastavalt teie nõusolekule ja meie
                dokumenteeritud eesmärkidele.
              </li>
              <li>
                <strong>Teie õigused:</strong> õigus tutvuda andmetega,
                nõuda parandamist või kustutamist, piirata töötlemist, tagasi
                võtta nõusolek ning esitada kaebus Eesti Andmekaitse
                Inspektsioonile (Andmekaitse Inspektsioon).
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-neutral-200 pt-6" lang="en">
            <h3 className="font-heading text-sm font-semibold text-neutral-950">
              English (UK)
            </h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                <strong>Data controller:</strong> Cannery OÜ (Estonia).
              </li>
              <li>
                <strong>Purposes of processing:</strong> carrying out the
                recruitment process for the selected role and, where you have
                agreed, future recruitment processes.
              </li>
              <li>
                <strong>Legal basis:</strong> your consent and applicable
                Estonian employment law, in line with the GDPR.
              </li>
              <li>
                <strong>Retention:</strong> up to 6 months after the
                recruitment process ends, unless you have consented to keeping
                your data for future recruitment — in that case, as described
                in your consent and our documented purposes.
              </li>
              <li>
                <strong>Your rights:</strong> access, rectification, erasure,
                restriction of processing, withdrawal of consent, and the
                right to lodge a complaint with the Estonian Data Protection
                Inspectorate (Andmekaitse Inspektsioon).
              </li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
