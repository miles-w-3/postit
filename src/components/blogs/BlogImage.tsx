'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BlogImage({ image }: {image: string}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust this value to control when the image starts to disappear
      const scrollThreshold = 100;

      if (window.scrollY > scrollThreshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 ease-in-out ${isVisible
          ? 'h-64 opacity-100'
          : 'h-0 opacity-0'
        }`}
    >
      <Image
        src={image}
        alt="Blog header"
        fill
        className="object-cover"
        priority
      />
    </div>
  );

};
