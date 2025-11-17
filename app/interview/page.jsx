'use client';

import { useState, useRef, useEffect } from 'react';

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Interview script with questions for field agents
  const interviewQuestions = [
    {
      id: 1,
      category: 'Informasi Dasar',
      question: 'Nama Ibu siapa? Nama usahanya apa?',
      guide: 'Catat nama lengkap peminjam dan nama usaha. Pastikan ejaan yang benar.',
      tips: 'Buat suasana nyaman dan ramah'
    },
    {
      id: 2,
      category: 'Informasi Dasar',
      question: 'Usaha Ibu bergerak di bidang apa? Sudah berapa lama berjalan?',
      guide: 'Identifikasi jenis usaha (warung, makanan, fashion, dll) dan lama operasi.',
      tips: 'Dengarkan dengan seksama untuk memahami jenis usaha sebenarnya'
    },
    {
      id: 3,
      category: 'Keuangan',
      question: 'Kira-kira berapa pendapatan usaha Ibu dalam sebulan?',
      guide: 'Minta perkiraan pendapatan bulanan. Jika ragu, tanyakan pendapatan harian dikalikan 30.',
      tips: 'Berikan contoh: "Misalnya sehari dapat Rp 200.000, berarti sebulan sekitar Rp 6 juta"'
    },
    {
      id: 4,
      category: 'Keuangan',
      question: 'Untuk pengeluaran usaha seperti belanja barang dagangan, berapa kira-kira per bulan?',
      guide: 'Catat pengeluaran operasional bulanan. Pastikan ini hanya untuk usaha, bukan rumah tangga.',
      tips: 'Pisahkan antara pengeluaran usaha dan kebutuhan rumah tangga'
    },
    {
      id: 5,
      category: 'Keuangan',
      question: 'Kalau stok barang dagangan yang ada sekarang, kira-kira nilainya berapa?',
      guide: 'Tanyakan nilai total barang dagangan/inventori yang tersedia saat ini.',
      tips: 'Bantu hitung jika kesulitan: "Ada berapa karung beras? Harga per karung berapa?"'
    },
    {
      id: 6,
      category: 'Pelanggan',
      question: 'Biasanya pelanggan Ibu itu siapa saja? Ada berapa pelanggan tetap?',
      guide: 'Identifikasi basis pelanggan dan jumlah pelanggan rutin.',
      tips: 'Cari tahu segmentasi: tetangga, pedagang, atau campuran'
    },
    {
      id: 7,
      category: 'Tantangan',
      question: 'Apa kesulitan terbesar yang Ibu hadapi dalam menjalankan usaha ini?',
      guide: 'Dengarkan cerita tentang tantangan. Perhatikan apakah tantangan musiman atau struktural.',
      tips: 'Beri waktu untuk bercerita, jangan terburu-buru'
    },
    {
      id: 8,
      category: 'Rencana',
      question: 'Pinjaman ini rencananya akan digunakan untuk apa? Ada rencana pengembangan usaha?',
      guide: 'Tanyakan tujuan pinjaman dan visi pengembangan usaha ke depan.',
      tips: 'Pastikan rencana realistis dan sesuai dengan kondisi usaha'
    }
  ];

  // Hardcoded risk analysis results with transcript
  const riskAnalysis = {
    overallScore: 72,
    riskTier: 'Medium-Low',
    credibilityScore: 78,
    stabilityScore: 68,
    consistencyScore: 75,
    duration: '12 menit 34 detik',
    transcript: [
      { q: 'Nama Ibu siapa?', a: 'Nama saya Sari, usaha saya Warung Sari Rejeki' },
      { q: 'Usaha Ibu bergerak di bidang apa?', a: 'Saya jual sembako, warung kelontong gitu. Sudah 3 tahun berjalan' },
      { q: 'Berapa pendapatan per bulan?', a: 'Kalau sebulan sekitar 5 jutaan, tapi kadang naik pas musim sekolah' },
      { q: 'Pengeluaran usaha per bulan?', a: 'Untuk belanja barang dagangan sekitar 3,5 juta' },
      { q: 'Nilai stok sekarang?', a: 'Stok saya sekarang mungkin ada 2 jutaan' },
      { q: 'Pelanggan tetap berapa?', a: 'Pelanggan tetap ada sekitar 40-50 orang, kebanyakan tetangga dan ibu-ibu PKK' },
      { q: 'Kesulitan terbesar?', a: 'Kadang susah dapat barang murah, modal juga terbatas jadi gabisa stok banyak' },
      { q: 'Rencana pinjaman untuk apa?', a: 'Mau nambah variasi barang, sama mau stok lebih banyak biar bisa dapat harga grosir' }
    ],
    insights: [
      {
        category: 'Konsistensi Jawaban',
        score: 75,
        status: 'good',
        description: 'Informasi pendapatan dan pengeluaran menunjukkan pola yang konsisten dengan jenis usaha warung kelontong.'
      },
      {
        category: 'Stabilitas Usaha',
        score: 68,
        status: 'moderate',
        description: 'Usaha telah berjalan cukup lama namun terdapat fluktuasi pendapatan musiman yang perlu diperhatikan.'
      },
      {
        category: 'Kredibilitas Narasi',
        score: 78,
        status: 'good',
        description: 'Cerita usaha logis dan selaras dengan kondisi bisnis mikro di area pedesaan.'
      },
      {
        category: 'Sinyal Stress',
        score: 82,
        status: 'good',
        description: 'Tidak ditemukan sinyal stress finansial yang signifikan. Peminjam menunjukkan pemahaman yang baik tentang cash flow usaha.'
      }
    ],
    earlyWarnings: [],
    recommendations: [
      'Peminjam menunjukkan profil risiko yang dapat diterima untuk pinjaman kelompok',
      'Disarankan untuk monitoring rutin mengingat fluktuasi pendapatan musiman',
      'Rencana pertumbuhan usaha realistis dan sesuai dengan kapasitas saat ini'
    ]
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        setRecordings(prev => [...prev, {
          questionId: interviewQuestions[currentQuestion].id,
          question: interviewQuestions[currentQuestion].question,
          duration: recordingTime,
          audioUrl: url
        }]);

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Tidak dapat mengakses mikrofon. Pastikan izin mikrofon telah diberikan.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        clearInterval(timerRef.current);
      }
      setIsPaused(!isPaused);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(timerRef.current);
    }
  };

  const handleNext = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setRecordingTime(0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setRecordingTime(0);
    }
  };

  const handleFinish = () => {
    if (isRecording) {
      stopRecording();
    }
    // Simulate AI analysis
    setTimeout(() => {
      setShowResults(true);
    }, 500);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setRecordings([]);
    setShowResults(false);
    setRecordingTime(0);
    setAudioUrl(null);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 py-6 px-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Analisis Selesai</h1>
              <p className="text-sm text-gray-600">Durasi wawancara: {riskAnalysis.duration}</p>
            </div>

            <div className="bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-2xl p-6 text-white text-center">
              <div className="text-5xl font-bold mb-2">{riskAnalysis.overallScore}</div>
              <div className="text-sm opacity-90 mb-3">Skor Risiko Keseluruhan</div>
              <div className="inline-block px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                Tingkat: {riskAnalysis.riskTier}
              </div>
            </div>
          </div>

          {/* Sub Scores */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Skor</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-cyan-50 rounded-xl">
                <div className="text-2xl font-bold text-[#2aa2bc]">{riskAnalysis.credibilityScore}</div>
                <div className="text-xs text-gray-600 mt-1">Kredibilitas</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-2xl font-bold text-[#3d2883]">{riskAnalysis.stabilityScore}</div>
                <div className="text-xs text-gray-600 mt-1">Stabilitas</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-2xl font-bold text-blue-600">{riskAnalysis.consistencyScore}</div>
                <div className="text-xs text-gray-600 mt-1">Konsistensi</div>
              </div>
            </div>
          </div>

          {/* Transcript Preview */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">Transkrip Wawancara</h2>
              <button className="text-xs text-[#2aa2bc] font-semibold">
                Lihat Lengkap
              </button>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {riskAnalysis.transcript.slice(0, 3).map((item, index) => (
                <div key={index} className="border-l-2 border-[#2aa2bc] pl-3 py-2">
                  <div className="text-xs font-semibold text-gray-700 mb-1">{item.q}</div>
                  <div className="text-sm text-gray-600">{item.a}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Analisis AI</h2>
            <div className="space-y-3">
              {riskAnalysis.insights.map((insight, index) => (
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
              {riskAnalysis.recommendations.map((rec, index) => (
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
              className="w-full bg-white border-2 border-[#2aa2bc] text-[#2aa2bc] py-4 px-6 rounded-2xl font-semibold hover:bg-cyan-50 transition-colors shadow-lg"
            >
              Wawancara Baru
            </button>
            <button
              className="w-full bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] text-white py-4 px-6 rounded-2xl font-semibold hover:from-[#239199] hover:to-[#331f6e] transition-colors shadow-lg"
            >
              Lanjut ke Foto Usaha →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = interviewQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / interviewQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-blue-50 py-6 px-4 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2aa2bc] to-[#3d2883]">
                AI Interview Analyzer
              </h1>
              <p className="text-xs text-gray-600">Wawancara berbasis rekaman suara</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Pertanyaan {currentQuestion + 1} dari {interviewQuestions.length}</span>
              <span className="font-semibold text-[#2aa2bc]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-4">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-cyan-100 text-[#2aa2bc] rounded-full text-xs font-semibold mb-3">
              {currentQ.category}
            </span>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{currentQ.question}</h2>
          </div>

          {/* Guide */}
          <div className="bg-blue-50 border-l-4 border-[#2aa2bc] p-4 rounded-r-xl mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#2aa2bc] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs font-semibold text-[#2aa2bc] mb-1">Panduan</div>
                <div className="text-xs text-gray-700">{currentQ.guide}</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-purple-50 border-l-4 border-[#3d2883] p-4 rounded-r-xl">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-[#3d2883] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <div>
                <div className="text-xs font-semibold text-[#3d2883] mb-1">Tips</div>
                <div className="text-xs text-gray-700">{currentQ.tips}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-4">
          {/* Recording Timer */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2 font-mono">
              {formatTime(recordingTime)}
            </div>
            {isRecording && (
              <div className="flex items-center justify-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-red-500 animate-pulse'}`}></span>
                <span className="text-sm text-gray-600">{isPaused ? 'Dijeda' : 'Merekam...'}</span>
              </div>
            )}
          </div>

          {/* Waveform Visualization */}
          {isRecording && !isPaused && (
            <div className="flex items-center justify-center gap-1 mb-6 h-12">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#2aa2bc] to-[#3d2883] rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: '0.8s'
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="w-20 h-20 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={pauseRecording}
                  className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  {isPaused ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  )}
                </button>
                <button
                  onClick={stopRecording}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z"/>
                  </svg>
                </button>
              </>
            )}
          </div>

          {!isRecording && recordings.length > 0 && recordings[recordings.length - 1].questionId === currentQ.id && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-semibold">Rekaman tersimpan ({formatTime(recordings[recordings.length - 1].duration)})</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentQuestion > 0 && (
            <button
              onClick={handlePrevious}
              disabled={isRecording}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              ← Kembali
            </button>
          )}
          {currentQuestion < interviewQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={isRecording}
              className="flex-1 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] text-white py-4 px-6 rounded-2xl font-semibold hover:from-[#239199] hover:to-[#331f6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Lanjut →
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex-1 bg-gradient-to-r from-[#2aa2bc] to-[#3d2883] text-white py-4 px-6 rounded-2xl font-semibold hover:from-[#239199] hover:to-[#331f6e] transition-colors shadow-lg"
            >
              Selesai & Analisis
            </button>
          )}
        </div>

        {/* Recording Count */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">
            {recordings.length} dari {interviewQuestions.length} pertanyaan telah direkam
          </span>
        </div>
      </div>
    </div>
  );
}
