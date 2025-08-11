'use client';

import { motion } from 'framer-motion';
import Section from './Section';
import { BodyText, Caption } from './Typography';

const Footer = () => {
  return (
    <footer className="bg-hero text-inverse py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <nav className="flex space-x-8">
            <a href="#about" className="text-inverse hover:text-accent-kiwi transition-colors">About</a>
            <a href="#pricing" className="text-inverse hover:text-accent-kiwi transition-colors">Pricing</a>
            <a href="#resources" className="text-inverse hover:text-accent-kiwi transition-colors">Resources</a>
            <a href="#contact" className="text-inverse hover:text-accent-kiwi transition-colors">Contact</a>
          </nav>
          <BodyText className="text-inverse/60 text-sm">
            © 2025 ContentQ. All rights reserved.
          </BodyText>
        </div>
      </div>
    </footer>
  );
};

export default Footer;