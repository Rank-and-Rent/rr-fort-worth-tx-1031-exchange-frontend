'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const heroImages = [
  '/fort-worth-texas-1031-exchange-homepage-hero-1.jpg',
  '/fort-worth-texas-1031-exchange-homepage-hero-2.jpg',
  '/fort-worth-texas-1031-exchange-homepage-hero-3.jpg',
  '/fort-worth-texas-1031-exchange-homepage-hero-4.jpg',
];

export default function RotatingHeroBackground() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // Rotate every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Fort Worth, Texas skyline ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          {/* Malibu Life style overlay - subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-paper/30 via-paper/50 to-paper/70" />
        </div>
      ))}
    </div>
  );
}
