'use client';

import Image from 'next/image';
import { MouseEvent } from 'react';

export default function Home() {
  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 0 40px rgba(61, 40, 131, 0.5)';
  };

  const handleMouseLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 0 30px rgba(61, 40, 131, 0.3)';
  };

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 50%, #f0fbff 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(#3d2883 1px, transparent 1px), linear-gradient(90deg, #3d2883 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle, rgba(61, 40, 131, 0.3), transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(40px)'
        }} />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full opacity-30" style={{
          background: 'radial-gradient(circle, rgba(42, 162, 188, 0.3), transparent 70%)',
          animation: 'float 10s ease-in-out infinite reverse',
          filter: 'blur(40px)'
        }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full opacity-20" style={{
          background: 'radial-gradient(circle, rgba(42, 162, 188, 0.25), transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
          filter: 'blur(50px)'
        }} />
      </div>

      {/* Hero Section */}
      <section className="w-full min-h-screen px-4 py-8 sm:px-6 flex items-center justify-center relative z-10">
        <div className="w-full max-w-xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-4 relative">
              <div className="absolute inset-0 rounded-full opacity-30 blur-3xl" style={{
                background: 'radial-gradient(circle, rgba(61, 40, 131, 0.4), transparent 70%)',
                animation: 'float 6s ease-in-out infinite'
              }} />
              <Image 
                src="/logo/smartha-logo.png" 
                alt="Smartha Logo" 
                width={256} 
                height={256}
                className="w-48 h-48 sm:w-64 sm:h-64 relative z-10 object-contain" 
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(61, 40, 131, 0.3))',
                  animation: 'float 8s ease-in-out infinite'
                }}
                priority
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg leading-relaxed" style={{
              color: '#1B1B1E',
              textShadow: '0 0 10px rgba(61, 40, 131, 0.1)'
            }}>
              Mentransformasi penilaian usaha mikro melalui kekuatan Computer Vision dan Geo AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col w-full gap-4 pt-2">
              <a 
                href="/interview"
                className="relative w-full px-8 py-4 text-white font-bold rounded-2xl transition-all duration-300 overflow-hidden group text-base block text-center"
                style={{
                  background: 'linear-gradient(135deg, #3d2883 0%, #2aa2bc 100%)',
                  border: '2px solid rgba(61, 40, 131, 0.4)',
                  boxShadow: '0 0 30px rgba(61, 40, 131, 0.3)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  animation: 'shimmer 2s infinite'
                }} />
                <span className="relative z-10">Mulai Penilaian</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
