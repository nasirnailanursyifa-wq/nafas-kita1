import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    console.log('📨 Pesan:', message)

    const lower = message.toLowerCase()
    let reply = ''

    // ===== 100+ KATA KUNCI & JAWABAN =====
    const keywords: Record<string, string> = {
      // ===== PENGERTIAN CAMPAK =====
      'apa itu campak': '🦠 Campak adalah infeksi virus yang sangat menular yang menyerang sistem pernapasan. Penyebabnya adalah virus paramyxovirus. Gejala awal meliputi demam tinggi, batuk, pilek, mata merah, dan ruam kemerahan. Campak dapat dicegah dengan vaksinasi yang efektif hingga 95%.',
      'campak itu apa': '🦠 Campak adalah penyakit infeksi virus yang sangat menular yang disebabkan oleh virus paramyxovirus. Penyakit ini menyerang sistem pernapasan dan dapat menyebar dengan sangat cepat melalui udara.',
      'definisi campak': '🦠 Campak adalah infeksi virus akut yang sangat menular, ditandai dengan demam, batuk, pilek, konjungtivitis, dan ruam makulopapular yang khas.',
      'pengertian campak': '🦠 Campak adalah penyakit menular yang disebabkan oleh virus paramyxovirus, ditandai dengan demam tinggi dan ruam merah di seluruh tubuh.',
      
      // ===== GEJALA =====
      'gejala': '🌡️ Gejala campak:\n1. Demam tinggi (39-40°C) selama 4-7 hari\n2. Batuk kering yang persisten\n3. Pilek dan hidung tersumbat\n4. Mata merah dan sensitif cahaya (konjungtivitis)\n5. Ruam merah muncul 3-5 hari setelah demam, mulai dari wajah\n6. Kehilangan nafsu makan\n7. Kelelahan dan lesu\n\n⚠️ Segera konsultasi ke dokter jika alami gejala ini!',
      'tanda campak': '🌡️ Tanda-tanda campak: demam tinggi 39-40°C, batuk kering, pilek, mata merah, dan ruam kemerahan yang muncul 3-5 hari setelah gejala awal.',
      'ciri campak': '🌡️ Ciri-ciri campak: demam tinggi, batuk kering, pilek, mata merah (konjungtivitis), ruam merah, kehilangan nafsu makan, dan kelelahan.',
      'demam': '🌡️ Demam campak bisa mencapai 39-40°C dan berlangsung 4-7 hari. Berikan obat penurun demam sesuai resep dokter dan kompres hangat untuk mengurangi ketidaknyamanan.',
      'batuk': '🤧 Batuk campak adalah batuk kering yang persisten dan bisa berlangsung hingga 2 minggu. Batuk ini bisa sangat mengganggu dan menyebabkan nyeri tenggorokan.',
      'pilek': '🤧 Pilek adalah gejala awal campak yang ditandai dengan hidung berair dan bersin-bersin. Ini terjadi karena virus menginfeksi saluran pernapasan atas.',
      'mata merah': '👁️ Mata merah (konjungtivitis) adalah gejala campak yang membuat mata menjadi merah, berair, dan sensitif terhadap cahaya. Ini terjadi pada hampir semua penderita campak.',
      'ruam': '🔴 Ruam campak muncul 3-5 hari setelah demam. Mulai dari wajah, menyebar ke leher, badan, lengan, dan kaki. Ruam biasanya hilang dalam 5-7 hari.',
      'ruam merah': '🔴 Ruam merah campak muncul 3-5 hari setelah gejala awal. Ruam dimulai dari wajah dan menyebar ke seluruh tubuh. Ruam akan berubah warna menjadi cokelat sebelum hilang.',
      'nafsu makan': '🍽️ Kehilangan nafsu makan adalah gejala umum campak, terutama pada anak-anak. Pastikan tetap minum air putih yang cukup dan makan makanan bergizi untuk menjaga daya tahan tubuh.',
      
      // ===== PENULARAN =====
      'menular': '💨 Campak SANGAT menular! Cara penularan:\n1. Droplet udara saat batuk/bersin\n2. Kontak langsung dengan cairan hidung/tenggorokan\n3. Udara terkontaminasi (virus bertahan 2 jam)\n\n⚠️ 1 orang bisa menularkan ke 12-18 orang lainnya!',
      'penularan': '💨 Campak menular melalui droplet udara saat batuk/bersin, kontak langsung dengan cairan, dan udara terkontaminasi. Virus bisa bertahan 2 jam di udara dan permukaan.',
      'cara penularan': '💨 Campak menular melalui:\n1. Droplet udara (batuk/bersin)\n2. Kontak langsung\n3. Udara terkontaminasi (virus bertahan 2 jam)\n\nIsolasi 10-14 hari sangat penting untuk mencegah penularan!',
      'menyebar': '💨 Campak menyebar sangat cepat melalui udara. 1 orang yang terinfeksi dapat menularkan ke 12-18 orang lainnya yang tidak memiliki kekebalan. Inilah mengapa vaksinasi sangat penting!',
      
      // ===== VAKSIN =====
      'vaksin': '💉 Vaksin campak adalah cara paling efektif mencegah campak!\n\nJenis: Vaksin MMR (Measles, Mumps, Rubella)\nJadwal:\n• Dosis 1: usia 9 bulan\n• Dosis 2: usia 18 bulan\n\nEfektivitas:\n• 1 dosis: 93%\n• 2 dosis: 95-97%\n\n💡 Tersedia GRATIS di Posyandu dan Puskesmas!',
      'imunisasi': '💉 Imunisasi campak diberikan 2 dosis: usia 9 bulan dan 18 bulan. Perlindungan 95% setelah 2 dosis. Tersedia gratis di Posyandu dan Puskesmas. Jangan lewatkan jadwal imunisasi anak Anda!',
      'vaksinasi': '💉 Vaksinasi adalah cara terbaik mencegah campak. Efektivitas 95% setelah 2 dosis. Vaksin campak telah menyelamatkan lebih dari 20 juta jiwa dalam 20 tahun terakhir!',
      'vaksin mmr': '💉 Vaksin MMR adalah vaksin kombinasi untuk campak (Measles), gondongan (Mumps), dan rubella. Diberikan 2 dosis: usia 9 bulan dan 18 bulan. Perlindungan 95%!',
      'vaksin anak': '💉 Vaksin campak untuk anak:\n• Dosis 1: usia 9 bulan\n• Dosis 2: usia 18 bulan\n• Perlindungan 95%\n• GRATIS di Posyandu/Puskesmas\n\nJangan tunda vaksinasi anak Anda!',
      'jadwal vaksin': '📅 Jadwal vaksin campak:\n• 9 bulan: dosis pertama\n• 18 bulan: dosis kedua\n• Perlindungan seumur hidup\n\nSegera kunjungi Posyandu/Puskesmas terdekat!',
      'efek samping vaksin': '💉 Efek samping vaksin campak umumnya ringan:\n1. Demam ringan (5-15% kasus)\n2. Ruam ringan (5% kasus)\n3. Nyeri di area suntikan\n\nEfek samping serius SANGAT JARANG terjadi. Vaksin campak AMAN dan TERBUKTI!',
      'vaksin aman': '✅ Vaksin campak AMAN dan efektif! Efektivitas 95% dengan efek samping ringan seperti demam. Vaksin telah digunakan selama puluhan tahun dan menyelamatkan jutaan jiwa.',
      'vaksin gratis': '📍 Vaksin campak GRATIS di Posyandu dan Puskesmas seluruh Indonesia. Program imunisasi nasional menjamin semua anak mendapatkan vaksin campak secara gratis!',
      
      // ===== MENGAPA VAKSIN PENTING =====
      'mengapa vaksin penting': '💉 Mengapa Vaksin Campak Sangat Penting?\n\n1. Perlindungan 95% - Vaksin campak memberikan perlindungan hingga 95% setelah 2 dosis. Ini adalah cara paling efektif untuk mencegah campak!\n\n2. Mencegah Komplikasi Serius - Vaksin melindungi dari komplikasi berbahaya seperti:\n   • Pneumonia (infeksi paru)\n   • Ensefalitis (infeksi otak)\n   • Diare parah\n   • Infeksi telinga\n   • Kematian\n\n3. Melindungi Orang di Sekitar - Ketika banyak orang divaksin, terbentuk herd immunity yang melindungi:\n   • Bayi yang belum bisa divaksin\n   • Ibu hamil\n   • Orang dengan sistem imun lemah\n\n4. Menyelamatkan Nyawa - Vaksin campak telah menyelamatkan lebih dari 20 juta jiwa dalam 20 tahun terakhir!\n\n5. Gratis dan Mudah - Vaksin campak tersedia GRATIS di Posyandu dan Puskesmas seluruh Indonesia.\n\n💡 Jangan tunda vaksinasi! Vaksinasi adalah investasi kesehatan terbaik untuk masa depan yang lebih sehat!',
      
      // ===== PENCEGAHAN =====
      'pencegahan': '🛡️ Pencegahan campak:\n1. Vaksinasi lengkap (2 dosis) - 95% efektif\n2. Cuci tangan dengan sabun secara rutin\n3. Pola hidup sehat (makan bergizi, istirahat cukup)\n4. Isolasi jika terinfeksi (10-14 hari)\n5. Konsultasi dokter jika muncul gejala',
      'cara mencegah': '🛡️ Cara mencegah campak:\n1. Vaksinasi lengkap (2 dosis)\n2. Jaga kebersihan (cuci tangan, gunakan masker)\n3. Pola hidup sehat\n4. Isolasi jika terinfeksi\n5. Konsultasi dokter',
      'mencegah campak': '🛡️ Mencegah campak bisa dilakukan dengan:\n1. Vaksinasi (cara paling efektif)\n2. Menjaga kebersihan diri dan lingkungan\n3. Meningkatkan daya tahan tubuh\n4. Menghindari kontak dengan penderita',
      'isolasi': '🏠 Isolasi mandiri selama 10-14 hari jika terkena campak. Jangan kontak dengan orang lain, terutama ibu hamil, bayi, dan orang dengan sistem imun lemah. Gunakan masker saat di ruangan bersama orang lain.',
      'karantina': '🏠 Karantina selama 10-14 hari jika terkena campak. Hindari kontak dengan orang lain untuk mencegah penularan. Ini adalah langkah penting untuk melindungi orang di sekitar.',
      'kebersihan': '🧼 Menjaga kebersihan sangat penting untuk mencegah campak:\n1. Cuci tangan dengan sabun\n2. Gunakan masker jika sedang sakit\n3. Tutup mulut saat batuk/bersin\n4. Bersihkan permukaan yang sering disentuh',
      'pola hidup sehat': '💪 Pola hidup sehat membantu meningkatkan sistem kekebalan tubuh:\n1. Makan makanan bergizi seimbang\n2. Istirahat cukup (7-8 jam)\n3. Olahraga teratur\n4. Kelola stres dengan baik\n5. Perbanyak minum air putih',
      
      // ===== KOMPLIKASI =====
      'komplikasi': '⚠️ Komplikasi serius campak:\n1. Pneumonia (infeksi paru) - paling sering menyebabkan kematian\n2. Ensefalitis (infeksi otak) - 1 dari 1000 kasus\n3. Diare parah - menyebabkan dehidrasi\n4. Infeksi telinga - bisa menyebabkan gangguan pendengaran\n5. Kematian - terutama anak <5 tahun\n\n💉 VAKSINASI adalah satu-satunya cara mencegah!',
      'bahaya campak': '⚠️ Bahaya campak: pneumonia, ensefalitis, diare parah, infeksi telinga, dan kematian. Campak tidak boleh dianggap remeh! Vaksinasi adalah satu-satunya cara mencegah komplikasi ini.',
      'efek campak': '⚠️ Efek campak dapat berupa komplikasi serius seperti pneumonia dan ensefalitis. Segera konsultasi ke dokter jika muncul gejala untuk mencegah komplikasi.',
      'pneumonia': '⚠️ Pneumonia adalah komplikasi campak yang paling sering menyebabkan kematian (60% kasus). Gejala: sesak napas, batuk berat, demam tinggi. Segera ke dokter jika ada sesak napas!',
      'ensefalitis': '⚠️ Ensefalitis adalah infeksi otak yang bisa terjadi sebagai komplikasi campak (1 dari 1000 kasus). Gejala: kejang, penurunan kesadaran, sakit kepala berat. Segera ke UGD!',
      'diare': '⚠️ Diare parah adalah komplikasi campak yang dapat menyebabkan dehidrasi, terutama pada anak-anak. Pastikan penderita minum air putih yang cukup.',
      'infeksi telinga': '⚠️ Infeksi telinga (otitis media) terjadi pada 1 dari 10 kasus campak. Bisa menyebabkan gangguan pendengaran permanen jika tidak ditangani.',
      
      // ===== ANAK & BAYI =====
      'anak': '👶 Jika anak terkena campak:\n1. Segera konsultasi ke dokter!\n2. Berikan makanan bergizi\n3. Perbanyak minum air putih\n4. Istirahat yang cukup\n5. Isolasi anak (10-14 hari)\n6. Berikan obat penurun demam (resep dokter)\n7. Pantau kondisi dengan ketat\n\n⚠️ JANGAN berikan aspirin pada anak! Bisa menyebabkan sindrom Reye.',
      'bayi': '👶 Bayi (<1 tahun) yang terkena campak SANGAT RENTAN!\n\nLangkah:\n1. Segera bawa ke dokter anak\n2. Jangan berikan obat tanpa resep\n3. Pantau tanda bahaya: sesak napas, kejang, demam sangat tinggi\n4. Berikan ASI eksklusif untuk meningkatkan imunitas\n\n⚠️ Bayi baru bisa divaksin campak di usia 9 bulan!',
      'anakku': '👶 Jika anak Anda terkena campak, segera bawa ke dokter, berikan makanan bergizi, perbanyak minum, istirahat cukup, isolasi 10-14 hari, pantau kondisi, dan jangan berikan aspirin!',
      'bayiku': '👶 Bayi Anda terkena campak? Segera bawa ke dokter anak! Bayi di bawah 1 tahun sangat rentan terhadap komplikasi serius. Jangan tunda!',
      
      // ===== IBU HAMIL =====
      'ibu hamil': '🤰 Ibu hamil yang terkena campak BERISIKO TINGGI!\n\nRisiko:\n1. Keguguran (terutama trimester 1)\n2. Bayi lahir prematur\n3. Berat badan lahir rendah\n4. Bayi lahir dengan cacat bawaan\n\n⚠️ Segera konsultasi ke dokter kandungan!\n💡 Vaksinasi SEBELUM kehamilan adalah perlindungan terbaik.',
      'hamil': '🤰 Ibu hamil harus segera konsultasi ke dokter jika terkena campak! Risiko: keguguran, bayi lahir prematur, berat badan lahir rendah. Vaksinasi 3 bulan sebelum kehamilan adalah perlindungan terbaik.',
      'kehamilan': '🤰 Campak pada kehamilan sangat berbahaya. Segera konsultasi ke dokter kandungan jika Anda hamil dan mengalami gejala campak. Jangan menunda!',
      
      // ===== PENGOBATAN =====
      'obat': '💊 Campak TIDAK ADA OBAT KHUSUS. Pengobatan bertujuan meredakan gejala:\n1. Istirahat total (10-14 hari)\n2. Minum air putih cukup (8 gelas/hari)\n3. Makanan bergizi\n4. Obat penurun demam (paracetamol, resep dokter)\n5. Vitamin A (sesuai resep dokter)\n\n⚠️ JANGAN berikan aspirin pada anak!',
      'pengobatan': '💊 Pengobatan campak bersifat suportif:\n1. Istirahat total\n2. Minum air putih cukup\n3. Makanan bergizi\n4. Obat penurun demam (resep dokter)\n5. Isolasi 10-14 hari\n\nKonsultasi dengan dokter adalah langkah paling penting!',
      'diobati': '💊 Campak diobati dengan istirahat, minum air putih, makanan bergizi, dan obat penurun demam sesuai resep dokter. Tidak ada obat khusus untuk campak.',
      'vitamin a': '💊 Vitamin A dapat membantu mengurangi keparahan campak. Dosis sesuai rekomendasi dokter (biasanya 2 dosis dengan jarak 24 jam). Vitamin A membantu mencegah komplikasi pada mata.',
      
      // ===== HERD IMMUNITY =====
      'herd immunity': '🛡️ Herd Immunity (kekebalan kelompok) terjadi ketika 95% populasi divaksin. Ini melindungi orang yang tidak bisa divaksin:\n• Bayi di bawah 1 tahun\n• Ibu hamil\n• Orang dengan sistem imun lemah\n• Orang alergi vaksin\n\n💡 Vaksinasi bukan hanya melindungi diri sendiri, tapi juga orang lain!',
      'kekebalan kelompok': '🛡️ Kekebalan kelompok terjadi jika 95% populasi divaksin. Ini melindungi bayi, ibu hamil, dan orang dengan sistem imun lemah. Vaksinasi adalah tanggung jawab bersama!',
      
      // ===== MITOS =====
      'mitos': '📌 MITOS vs FAKTA Campak:\n\n❌ Mitos: Campak hanya penyakit ringan\n✅ Fakta: Campak bisa menyebabkan komplikasi serius dan kematian!\n\n❌ Mitos: Vaksin campak tidak aman\n✅ Fakta: Vaksin campak SANGAT AMAN dan efektif!\n\n❌ Mitos: Campak hanya menyerang anak-anak\n✅ Fakta: Orang dewasa yang belum divaksin juga bisa terkena!\n\n❌ Mitos: Imunitas alami lebih baik dari vaksin\n✅ Fakta: Vaksin memberikan perlindungan tanpa risiko komplikasi!\n\n💡 Selalu cek fakta dari sumber terpercaya!',
      
      // ===== SEJARAH =====
      'sejarah': '📜 Sejarah Campak:\n• Abad ke-9: pertama kali dideskripsikan oleh dokter Persia\n• 1954: virus campak berhasil diisolasi\n• 1963: vaksin campak dikembangkan\n• Sejak 1963: vaksin telah menyelamatkan >20 juta jiwa\n\nTarget WHO: eradikasi campak global! Indonesia masih berupaya mencapai target vaksinasi 95%.',
      
      // ===== POSYANDU =====
      'posyandu': '📍 Vaksin campak GRATIS di Posyandu dan Puskesmas! Bawa anak Anda untuk vaksinasi. Program imunisasi nasional memastikan semua anak Indonesia mendapatkan perlindungan dari campak.',
      'puskesmas': '📍 Vaksin campak GRATIS di Puskesmas terdekat. Segera kunjungi Puskesmas untuk imunisasi anak Anda. Jangan tunda!',
      
      // ===== TANYA JAWAB UMUM =====
      'apakah campak berbahaya': '⚠️ Ya, campak BISA BERBAHAYA! Campak dapat menyebabkan komplikasi serius seperti pneumonia, ensefalitis, dan kematian. Vaksinasi adalah satu-satunya cara untuk mencegah bahaya campak!',
      'apakah campak menular': '💨 Ya, campak SANGAT MENULAR! 1 orang bisa menularkan ke 12-18 orang lainnya. Penularan terjadi melalui droplet udara saat batuk/bersin.',
      'apakah vaksin aman': '✅ Ya, vaksin campak SANGAT AMAN! Telah digunakan selama puluhan tahun dan terbukti menyelamatkan jutaan jiwa. Efek samping serius sangat jarang terjadi.',
      'berapa lama': '⏰ Campak biasanya berlangsung 10-14 hari. Isolasi selama 10-14 hari sangat penting untuk mencegah penularan.',
      'berapa lama ruam hilang': '🔴 Ruam campak biasanya hilang dalam 5-7 hari setelah muncul. Ruam akan berubah warna menjadi cokelat sebelum akhirnya hilang.',
      'berapa lama demam': '🌡️ Demam campak berlangsung 4-7 hari. Suhu tubuh bisa mencapai 39-40°C. Berikan obat penurun demam sesuai resep dokter.',
      'kapan vaksin': '💉 Vaksin campak diberikan:\n• Dosis 1: usia 9 bulan\n• Dosis 2: usia 18 bulan\n\nSegera vaksinasi anak Anda!',
      'siapa yang berisiko': '⚠️ Kelompok berisiko tinggi campak:\n• Anak di bawah 5 tahun\n• Orang dengan sistem imun lemah\n• Ibu hamil\n• Bayi di bawah 1 tahun\n• Orang yang belum divaksin\n\n💉 Vaksinasi adalah perlindungan terbaik!',
      'dimana vaksin': '📍 Vaksin campak tersedia GRATIS di:\n• Posyandu\n• Puskesmas\n• Rumah sakit\n• Klinik kesehatan',
      
      // ===== SAPAAN =====
      'halo': '👋 Halo! Selamat datang di AI Sahabat Udara. Ada yang bisa saya bantu tentang campak? Saya siap membantu! 😊',
      'hai': '👋 Hai! Selamat datang! Ada yang bisa saya bantu tentang campak?',
      'assalamualaikum': '☪️ Waalaikumsalam Warahmatullahi Wabarakatuh! Selamat datang di AI Sahabat Udara. Ada yang bisa saya bantu tentang campak?',
      'nama': '🤖 Saya AI Sahabat Udara! Asisten kesehatan virtual yang siap membantu Anda memahami campak. Senang berkenalan dengan Anda!',
      'namamu': '🤖 Nama saya AI Sahabat Udara! Senang berkenalan dengan Anda. Ada yang bisa saya bantu tentang campak?',
      'kab': '😊 Saya baik-baik saja! Terima kasih sudah bertanya. Bagaimana kabar Anda? Ada yang bisa saya bantu tentang campak?',
      'kabar': '😊 Saya baik-baik saja! Bagaimana kabar Anda? Semoga sehat selalu. Ada yang bisa saya bantu tentang campak?',
      'terima kasih': '🙏 Sama-sama! Senang bisa membantu. Jangan ragu bertanya lagi ya! 😊',
      'makasih': '🙏 Sama-sama! Senang bisa membantu. Jangan ragu bertanya lagi ya! 😊',
      
      // ===== BANTUAN =====
      'help': '🤖 Saya AI Sahabat Udara! Saya bisa bantu Anda tentang:\n\n🦠 Apa itu campak\n🌡️ Gejala campak\n💉 Vaksinasi & imunisasi\n🛡️ Pencegahan campak\n⚠️ Komplikasi campak\n👶 Anak & bayi\n🤰 Ibu hamil\n💊 Pengobatan campak\n\nKetik pertanyaan Anda, saya siap membantu!',
      'bantuan': '🤖 Saya siap membantu! Tanyakan apa saja tentang campak. Saya akan memberikan informasi yang Anda butuhkan. 😊',
      'faq': '❓ PERTANYAAN SERING DIAJUKAN:\n\n1. Apa itu campak?\nCampak adalah infeksi virus yang sangat menular.\n\n2. Apakah campak berbahaya?\nYa, bisa menyebabkan komplikasi serius.\n\n3. Kapan anak divaksin?\nUsia 9 bulan dan 18 bulan.\n\n4. Apakah vaksin aman?\nYa, sangat aman!\n\n5. Bagaimana cara mencegah?\nVaksinasi adalah cara terbaik.',
      
      // ===== TAMBAHAN =====
      'penyebab': '🦠 Campak disebabkan oleh virus paramyxovirus. Virus ini sangat menular dan menyebar melalui droplet udara saat batuk atau bersin.',
      'virus': '🦠 Penyebab campak adalah virus paramyxovirus. Virus ini dapat bertahan di udara hingga 2 jam dan sangat mudah menular.',
      'kematian': '⚠️ Campak bisa menyebabkan kematian, terutama pada anak di bawah 5 tahun. Vaksinasi adalah satu-satunya cara mencegah kematian akibat campak!',
      'kejang': '⚠️ Kejang pada campak adalah TANDA DARURAT! Segera bawa ke UGD!',
      'sesak napas': '⚠️ Sesak napas pada campak adalah TANDA DARURAT! Segera bawa ke UGD!',
      'aspirin': '⚠️ JANGAN berikan aspirin pada anak dengan campak! Bisa menyebabkan sindrom Reye yang berbahaya dan mengancam jiwa.',
      'vaksin dewasa': '💉 Orang dewasa yang belum pernah divaksin atau belum pernah terkena campak sebaiknya divaksinasi. Vaksin campak aman untuk dewasa!',
    }

    // Cari jawaban yang cocok
    let found = false
    for (const [key, value] of Object.entries(keywords)) {
      if (lower.includes(key)) {
        reply = value
        found = true
        break
      }
    }

    if (!found) {
      reply = '🤔 Terima kasih atas pertanyaannya! Saya siap membantu tentang campak. Coba tanyakan:\n\n• Apa itu campak?\n• Gejala campak\n• Vaksinasi campak\n• Pencegahan campak\n• Komplikasi campak\n• Anak & bayi\n• Ibu hamil\n\nSaya siap membantu! 😊'
    }

    console.log('✅ Reply:', reply.substring(0, 50) + '...')

    return NextResponse.json({ response: reply })

  } catch (error: any) {
    console.error('❌ Error:', error.message)
    return NextResponse.json(
      { response: 'Maaf, terjadi kesalahan. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}