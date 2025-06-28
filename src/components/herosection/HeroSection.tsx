'use client'

import Hero from '../hero/Hero';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function HeroSection(props: HeroSectionProps) {
  const handleButtonClick = () => {
    if (props.onButtonClick) {
      props.onButtonClick();
    } else {
      // Default action - scroll to contact section or navigate to contact page
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = '/contact';
      }
    }
  };

  return (
    <Hero
      title={props.title}
      subtitle={props.subtitle}
      buttonText={props.buttonText}
      onButtonClick={handleButtonClick}
    />
  )
}
