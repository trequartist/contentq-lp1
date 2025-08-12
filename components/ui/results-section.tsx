import React from 'react';
import Section from '@/components/Section';
import { SectionHeadline, BodyText } from '@/components/Typography';
import { ResultsCardsWithHover } from './results-cards-with-hover';

export default function ResultsSection() {
  return (
    <Section
      variant="white"
      id="results"
      className="relative lg:py-[60px] lg:px-[60px] overflow-hidden bg-gradient-to-b from-zinc-50 to-white"
    >
      <div className="space-y-12 max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <SectionHeadline>
            Results That Matter
          </SectionHeadline>
          <BodyText className="text-xl max-w-3xl mx-auto text-slate-700">
            Real outcomes from companies building systematic content authority
          </BodyText>
        </div>
        
        <ResultsCardsWithHover />
      </div>
    </Section>
  );
}