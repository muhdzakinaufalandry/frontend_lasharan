'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/splash.css';


export default function SplashScreen() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1500); // Mulai fade out setelah 1.5 detik

    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 2000); // Redirect setelah 2 detik

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : 'fade-in'}`}>
      <img src="/logo-smas.png" alt="Logo SMAS" className="splash-logo" />
    </div>
  );
}
