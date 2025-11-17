'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Mic, Camera, MapPin } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Beranda',
      active: pathname === '/',
      color: '#2aa2bc',
      neon: '#2aa2bc'
    },
    {
      href: '/interview',
      icon: Mic,
      label: 'Wawancara',
      active: pathname === '/interview',
      defaultColor: '#3d2883',
      color: '#2aa2bc',
      neon: '#2aa2bc'
    },
    {
      href: '/cv-scanner',
      icon: Camera,
      label: 'Foto Usaha',
      active: pathname === '/cv-scanner',
      color: '#2aa2bc',
      neon: '#2aa2bc'
    },
    {
      href: '/geo-scoring',
      icon: MapPin,
      label: 'Geo Scoring',
      active: pathname === '/geo-scoring',
      color: '#2aa2bc',
      neon: '#2aa2bc'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 mobile-nav">
      <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes shimmerMove {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="flex justify-around items-center px-4 py-2 relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const buttonColor = item.active ? item.color : (item.defaultColor || '#6b7280');
          const buttonNeon = item.active ? item.neon : (item.defaultColor ? '#8A7FD8' : item.neon);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-2xl transition-all duration-300 relative overflow-hidden group ${
                item.active ? 'bg-gradient-to-br from-cyan-50 to-purple-50' : 'hover:bg-gray-50'
              }`}
              style={item.active ? {
                '--item-color': buttonColor,
                '--item-neon': buttonNeon
              } : {}}
            >
              {/* Active glow effect */}
              {item.active && (
                <>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-15"
                    style={{
                      background: `radial-gradient(circle at center, ${buttonNeon}, transparent 70%)`,
                      animation: 'pulseGlow 2s ease-in-out infinite'
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(45deg, transparent, ${buttonNeon}20, transparent)`,
                      animation: 'shimmerMove 2s infinite'
                    }}
                  />
                </>
              )}

              {/* Icon with neon effect */}
              <div className="relative z-10">
                <Icon
                  size={24}
                  color={buttonColor}
                  style={item.active ? {
                    filter: `drop-shadow(0 0 6px ${buttonNeon})`
                  } : {}}
                />
              </div>

              {/* Label with text shadow */}
              <span
                className="relative z-10 text-xs font-semibold"
                style={{
                  color: buttonColor,
                  textShadow: item.active ? `0 0 8px ${buttonNeon}60` : 'none'
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
