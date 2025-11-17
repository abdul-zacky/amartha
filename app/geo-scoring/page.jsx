'use client';

import { MapPin } from 'lucide-react';

export default function GeoScoringPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 py-6 px-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2aa2bc] to-[#3d2883]">
                Geo Economic Scoring
              </h1>
              <p className="text-xs text-gray-600">Analisis konteks ekonomi berbasis lokasi</p>
            </div>
          </div>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
            <MapPin className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fitur Geo Economic Context Scoring sedang dalam pengembangan. 
            Fitur ini akan menganalisis kondisi ekonomi sekitar peminjam untuk 
            memberikan konteks yang lebih lengkap dalam penilaian risiko.
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Fitur yang Akan Datang</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Analisis kepadatan titik ekonomi</li>
                <li>• Evaluasi akses pasar dan jalan</li>
                <li>• Penilaian tekanan kompetitif area</li>
                <li>• Scoring resiliensi ekonomi lokasi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
