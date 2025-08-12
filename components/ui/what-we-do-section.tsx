"use client";

import React from 'react';
import Section from '../Section';
import { SectionHeadline, BodyText } from '../Typography';
import { FeaturesSectionWithHoverEffects } from './feature-section-with-hover-effects';

const WhatWeDoSection = () => {
  return (
    <Section variant="dark" id="what-we-do" style={{ backgroundColor: '#001233' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeadline className="text-white mb-6">
            What We Actually Do
          </SectionHeadline>
          <BodyText className="text-white/70 max-w-3xl mx-auto">
            We don't just write about what you know. We help you know what to write about.
          </BodyText>
        </div>

        <FeaturesSectionWithHoverEffects />
      </div>
    </Section>
  );
};

export default WhatWeDoSection;