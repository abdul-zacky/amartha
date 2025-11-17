'use client';

import { useState, useRef, useEffect } from 'react';
import { Home, Store, Check, RotateCw, Image as ImageIcon } from 'lucide-react';

export default function CVScannerPage() {
  const [scanMode, setScanMode] = useState('business'); // 'business' or 'household'
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Dummy analysis results for business
  const businessAnalysis = {
    overallScore: 76,
    category: 'Warung Kelontong',
    insights: [
      {
        category: 'Kedalaman Stok',
        score: 78,
        status: 'good',
        description: 'Stok barang dagangan terlihat cukup lengkap dan tertata dengan baik. Variasi produk menunjukkan kapasitas modal yang sehat.'
      },
      {
        category: 'Kualitas Etalase',
        score: 72,
        status: 'good',
        description: 'Display produk rapi dan mudah dijangkau pelanggan. Pencahayaan cukup baik untuk menarik perhatian.'
      },
      {
        category: 'Kondisi Barang',
        score: 80,
        status: 'good',
        description: 'Barang dagangan dalam kondisi baik, tidak ada tanda-tanda produk kadaluarsa atau rusak yang terlihat.'
      },
      {
        category: 'Kebersihan & Organisasi',
        score: 74,
        status: 'good',
        description: 'Area usaha terjaga kebersihannya dan produk terorganisir dengan sistem yang jelas.'
      }
    ],
    indicators: [
      { label: 'Kapasitas Operasional', value: 'Tinggi', color: 'green' },
      { label: 'Kesiapan Bisnis', value: 'Siap Ekspansi', color: 'green' },
      { label: 'Resiliensi Finansial', value: 'Stabil', color: 'blue' }
    ],
    recommendations: [
      'Usaha menunjukkan manajemen stok yang baik dan siap untuk ekspansi modal',
      'Pertimbangkan peningkatan variasi produk premium untuk meningkatkan margin',
      'Kondisi fisik usaha mendukung untuk pinjaman dengan nilai lebih tinggi'
    ]
  };

  // Dummy analysis results for household
  const householdAnalysis = {
    overallScore: 68,
    category: 'Rumah Tangga',
    insights: [
      {
        category: 'Kondisi Bangunan',
        score: 70,
        status: 'good',
        description: 'Struktur bangunan dalam kondisi baik dan terawat. Tidak ada tanda-tanda kerusakan struktural yang signifikan.'
      },
      {
        category: 'Kelengkapan Aset',
        score: 65,
        status: 'moderate',
        description: 'Aset rumah tangga cukup lengkap dengan peralatan dasar yang memadai. Beberapa perabotan menunjukkan usia pakai yang wajar.'
      },
      {
        category: 'Kebersihan & Kerapian',
        score: 72,
        status: 'good',
        description: 'Rumah tangga terjaga kebersihannya dengan baik. Area common menunjukkan perawatan yang konsisten.'
      },
      {
        category: 'Stabilitas Tempat Tinggal',
        score: 66,
        status: 'moderate',
        description: 'Kondisi lingkungan sekitar stabil dan mendukung. Akses ke fasilitas umum memadai.'
      }
    ],
    indicators: [
      { label: 'Stabilitas Domisili', value: 'Stabil', color: 'blue' },
      { label: 'Kapasitas Finansial', value: 'Menengah', color: 'yellow' },
      { label: 'Resiliensi Rumah Tangga', value: 'Baik', color: 'green' }
    ],
    recommendations: [
      'Kondisi rumah tangga menunjukkan stabilitas yang cukup untuk mendukung usaha',
      'Pertimbangkan untuk memisahkan area usaha dan rumah tangga jika memungkinkan',
      'Rumah tangga yang terorganisir mencerminkan manajemen yang baik'
    ]
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  // Initialize camera on mount
  useEffect(() => {
    if (!capturedImage && !showResults) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedImage, showResults]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      stopCamera();
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        handleAnalyze();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryClick = () => {
    fileInputRef.current?.click();
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      stopCamera();
      setCapturedImage(imageData);
      handleAnalyze();
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults(scanMode === 'business' ? businessAnalysis : householdAnalysis);
      setShowResults(true);
    }, 3000);
  };

  const handleReset = () => {
    setCapturedImage(null);
    setShowResults(false);
    setAnalysisResults(null);
    setIsAnalyzing(false);
    startCamera();
  };

  // Camera View (Default Screen)
  if (!showResults && !isAnalyzing) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Hidden canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Scan frame overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[60%] border-4 border-dashed border-white border-opacity-50 rounded-3xl"></div>
        </div>

        {/* Top Overlay Controls */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 pb-8">
          {/* Tab Switch */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setScanMode('business')}
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all ${
                scanMode === 'business'
                  ? 'bg-white text-[#2aa2bc] shadow-lg'
                  : 'bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              <Store className="w-5 h-5 inline-block mr-2" />
              Scan Usaha
            </button>
            <button
              onClick={() => setScanMode('household')}
              className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-all ${
                scanMode === 'household'
                  ? 'bg-white text-[#3d2883] shadow-lg'
                  : 'bg-white/20 text-white backdrop-blur-sm'
              }`}
            >
              <Home className="w-5 h-5 inline-block mr-2" />
              Scan Rumah
            </button>
          </div>

          {/* Description Text */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              {scanMode === 'business' ? (
                <>
                  <span className="font-semibold text-[#2aa2bc]">Foto area usaha:</span> Fokus pada etalase, stok barang, kondisi tempat usaha, dan area pelayanan pelanggan.
                </>
              ) : (
                <>
                  <span className="font-semibold text-[#3d2883]">Foto rumah tangga:</span> Fokus pada ruang utama, peralatan rumah tangga, kondisi bangunan, dan kerapian.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-12 pb-24">
          <div className="flex items-center justify-center gap-8">
            {/* Gallery Button */}
            <button
              onClick={handleGalleryClick}
              className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/40 transition-all active:scale-95"
            >
              <ImageIcon className="w-7 h-7 text-white" />
            </button>

            {/* Capture Button */}
            <button
              onClick={handleCapture}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all active:scale-95 border-4 border-white/50"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full"></div>
            </button>

            {/* Placeholder for symmetry */}
            <div className="w-14 h-14"></div>
          </div>
        </div>
      </div>
    );
  }

  // Analyzing Screen
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 py-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {/* Captured Image Preview */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={scanMode === 'business' ? '/cv-dummy/warung-kelontong.webp' : '/cv-dummy/rumah-tangga.webp'}
                alt={scanMode === 'business' ? 'Warung Kelontong' : 'Rumah Tangga'}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2aa2bc]/30 to-[#3d2883]/30 flex items-center justify-center">
                <div className="text-white">
                  <RotateCw className="w-16 h-16 animate-spin mx-auto mb-4" />
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Menganalisis...</h2>
            <p className="text-sm text-gray-600 mb-4">
              AI sedang memproses {scanMode === 'business' ? 'foto usaha' : 'foto rumah tangga'} Anda
            </p>
            
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-[#2aa2bc] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-[#3d2883] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-[#2aa2bc] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults && analysisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 py-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Analisis Selesai</h1>
              <p className="text-sm text-gray-600">{analysisResults.category}</p>
            </div>

            <div className="bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-2xl p-6 text-white text-center">
              <div className="text-5xl font-bold mb-2">{analysisResults.overallScore}</div>
              <div className="text-sm opacity-90 mb-3">Skor Visual Keseluruhan</div>
              <div className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2aa2bc] to-[#3d2883]">
                  {scanMode === 'business' ? 'Kondisi Usaha' : 'Kondisi Rumah Tangga'}
                </span>
              </div>
            </div>
          </div>

          {/* Captured Image Preview */}
          <div className="bg-white rounded-3xl shadow-xl p-4 mb-4">
            <h2 className="text-sm font-bold text-gray-800 mb-3">Foto yang Dianalisis</h2>
            <div className="relative rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={scanMode === 'business' ? '/cv-dummy/warung-kelontong.webp' : '/cv-dummy/rumah-tangga.webp'}
                alt={scanMode === 'business' ? 'Warung Kelontong' : 'Rumah Tangga'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 px-3 py-1 bg-white bg-opacity-90 rounded-full text-xs font-semibold text-gray-700">
                {scanMode === 'business' ? 'Usaha' : 'Rumah'}
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Indikator Utama</h2>
            <div className="space-y-3">
              {analysisResults.indicators.map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-sm font-medium text-gray-700">{indicator.label}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    indicator.color === 'green' ? 'bg-green-100 text-green-700' :
                    indicator.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {indicator.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Analisis Detail</h2>
            <div className="space-y-3">
              {analysisResults.insights.map((insight, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">{insight.category}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#2aa2bc]">{insight.score}</span>
                      <span className={`w-2 h-2 rounded-full ${
                        insight.status === 'good' ? 'bg-green-500' :
                        insight.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Rekomendasi</h2>
            <ul className="space-y-3">
              {analysisResults.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#2aa2bc] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] text-white py-4 px-6 rounded-2xl font-semibold hover:from-[#239199] hover:to-[#331f6e] transition-colors shadow-lg"
            >
              Scan Baru
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
}
