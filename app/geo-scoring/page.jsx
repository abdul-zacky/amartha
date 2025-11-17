'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function GeoScoringPage() {
  const primaryColor1 = '#2aa2bc';
  const primaryColor2 = '#3d2883';
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const handleReset = () => {
    setLocation('');
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-white py-6 px-4 flex items-center justify-center pb-24">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{background: `linear-gradient(135deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Analisis Geo Selesai</h1>
              <p className="text-sm text-gray-600">Geo Economic Context Scoring</p>
            </div>

            <div className="rounded-2xl p-6 text-white text-center" style={{background: `linear-gradient(135deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}>
              <div className="text-5xl font-bold mb-2">78</div>
              <div className="text-sm opacity-90 mb-3">Skor Konteks Ekonomi</div>
              <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold" style={{background: 'rgba(255, 255, 255, 0.3)', color: 'white'}}>
                Area: Menengah Mendukung
              </div>
            </div>
          </div>

          {/* Geo Analysis Results */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Analisis Lokasi</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">Akses Pasar</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-green-600">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">Kepadatan Ekonomi</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-teal-600">70%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                <span className="text-sm font-medium text-gray-700">Kualitas Infrastruktur</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">80%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Insights */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Insights Lokasi</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Lokasi Strategis</h3>
                  <p className="text-xs text-gray-600">Area memiliki akses baik ke pasar utama dan jalan desa yang termaintain.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Aktivitas Ekonomi</h3>
                  <p className="text-xs text-gray-600">Terdapat 12+ POI ekonomi dalam radius 1km, menunjukkan ekosistem bisnis aktif.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Kompetisi Sedang</h3>
                  <p className="text-xs text-gray-600">5 bisnis serupa dalam radius 500m, perlu diferensiasi produk yang kuat.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Faktor Risiko Lokasi</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Banjir Musiman</span>
                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">Rendah</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Akses Transportasi</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Baik</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <span className="text-xs font-medium text-gray-700">Stabilitas Ekonomi</span>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Stabil</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleReset}
              className="w-full bg-white border-2 text-white py-4 px-6 rounded-2xl font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
              style={{borderColor: primaryColor1, color: primaryColor1}}
            >
              Analisis Lokasi Baru
            </button>
            <button
              className="w-full text-white py-4 px-6 rounded-2xl font-semibold transition-colors shadow-lg"
              style={{background: `linear-gradient(135deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}
            >
              Lihat Dashboard Risiko →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4 flex items-center justify-center pb-24">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{background: `linear-gradient(135deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text" style={{backgroundImage: `linear-gradient(90deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}>
                Geo Economic Scoring
              </h1>
              <p className="text-xs text-gray-600">Location Context Analysis</p>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs font-semibold text-green-700 mb-1">Panduan Lokasi</div>
                <div className="text-xs text-gray-700">
                  Masukkan alamat lengkap atau koordinat GPS untuk analisis konteks ekonomi area usaha.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Input */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Input Lokasi Usaha</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat Lengkap
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Jl. Desa Makmur No. 12, Cirebon"
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {/* Dummy Map */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peta Lokasi
              </label>
              <div className="w-full h-48 rounded-xl border border-gray-300 overflow-hidden bg-gray-100 relative">
                <Image 
                  src="/map.jpg" 
                  alt="Peta Lokasi" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl">
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs text-blue-700">
                Sistem akan otomatis mendeteksi koordinat dan menganalisis faktor ekonomi sekitar lokasi.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Location Options */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Lokasi Contoh</h3>
          <div className="space-y-2">
            {[
              { name: 'Area Desa', desc: 'Lokasi pedesaan khas', score: '65' },
              { name: 'Area Pinggiran Kota', desc: 'Suburban developing area', score: '78' },
              { name: 'Area Pusat Kota', desc: 'Urban commercial area', score: '85' }
            ].map((option, index) => (
              <button
                key={index}
                onClick={() => setLocation(`Contoh: ${option.name}`)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-800">{option.name}</div>
                  <div className="text-xs text-gray-500">{option.desc}</div>
                </div>
                <div className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                  Skor: {option.score}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Button */}
        {location && (
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full text-white py-4 px-6 rounded-2xl font-semibold transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{background: `linear-gradient(135deg, ${primaryColor1} 0%, ${primaryColor2} 100%)`}}
          >
            {isAnalyzing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menganalisis Lokasi...
              </span>
            ) : (
              'Analisis Konteks Ekonomi'
            )}
          </button>
        )}
      </div>
    </div>
  );
}