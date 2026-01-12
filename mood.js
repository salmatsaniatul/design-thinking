let selectedMood = null;
        let selectedMoodText = '';
        let entries = [];
        let motivations = [];

        const quotes = [
            { text: "Setiap hari adalah kesempatan baru untuk menjadi versi terbaik dari dirimu.", author: "Anonim" },
            { text: "Kamu lebih kuat dari yang kamu pikirkan.", author: "Winnie the Pooh" },
            { text: "Hidup adalah 10% apa yang terjadi padamu dan 90% bagaimana kamu meresponnya.", author: "Charles R. Swindoll" },
            { text: "Percayalah pada dirimu sendiri dan semua yang kamu lakukan.", author: "Anonim" },
            { text: "Jangan takut gagal, takutlah tidak mencoba.", author: "Anonim" },
            { text: "Kebahagiaan bukanlah sesuatu yang siap jadi. Itu datang dari tindakanmu sendiri.", author: "Dalai Lama" },
            { text: "Fokus pada hal baik dalam hidupmu dan kamu akan menemukan lebih banyak hal baik.", author: "Anonim" },
            { text: "Kamu tidak bisa mengubah masa lalu, tapi kamu bisa membentuk masa depan.", author: "Anonim" },
            { text: "Setiap pencapaian besar dimulai dengan keputusan untuk mencoba.", author: "Anonim" },
            { text: "Jaga pikiranmu tetap positif karena pikiranmu menjadi kata-katamu.", author: "Mahatma Gandhi" }
        ];

        const solutions = {
            'Senang': 'Bagus sekali! Manfaatkan energi positif ini untuk melakukan hal-hal produktif. Bagikan kebahagiaanmu dengan orang lain, atau tuliskan apa yang membuatmu senang hari ini agar bisa dikenang.',
            'Tenang': 'Mood yang sempurna untuk refleksi diri. Ini saat yang tepat untuk meditasi, membaca buku, atau merencanakan tujuan jangka panjangmu dengan pikiran jernih.',
            'Biasa': 'Hari yang netral bisa menjadi kanvas kosong. Coba lakukan sesuatu yang kecil tapi bermakna - telepon teman lama, jalan-jalan sebentar, atau coba hobi baru untuk menambah warna pada harimu.',
            'Sedih': 'Tidak apa-apa merasa sedih. Beri dirimu waktu untuk merasakan emosi ini. Coba berbicara dengan orang yang kamu percaya, tulis tentang perasaanmu, atau lakukan self-care seperti mandi air hangat atau mendengarkan musik favorit.',
            'Cemas': 'Tarik napas dalam-dalam. Coba teknik 5-4-3-2-1: sebutkan 5 hal yang kamu lihat, 4 yang kamu sentuh, 3 yang kamu dengar, 2 yang kamu cium, dan 1 yang kamu rasakan. Fokus pada hal yang bisa kamu kontrol, bukan yang di luar kendalimu.',
            'Kesal': 'Wajar untuk merasa kesal. Jangan simpan sendiri - tulis di jurnal atau bicarakan dengan seseorang. Olahraga ringan atau aktivitas fisik bisa membantu melepas ketegangan. Ingat, perasaan ini tidak permanen.'
        };

        // Solusi berdasarkan kata kunci dalam cerita
        const keywordSolutions = {
            // Kata kunci kesedihan
            sedih: "Saya mengerti kamu sedang merasa sedih. Ingat bahwa perasaan ini sementara dan akan berlalu. Cobalah berbicara dengan teman atau keluarga yang kamu percaya. Kadang hanya dengan didengarkan sudah bisa meringankan beban.",
            putus: "Putus cinta memang sangat menyakitkan. Beri dirimu waktu untuk berduka dan merasakan semua emosi ini. Fokus pada dirimu sendiri, lakukan hal-hal yang kamu suka. Dengan waktu, kamu akan sembuh dan menemukan kebahagiaan lagi.",
            kecewa: "Kekecewaan itu wajar ketika harapan tidak terpenuhi. Namun ingat, setiap kekecewaan mengajarkan sesuatu. Coba lihat apa yang bisa kamu pelajari dari situasi ini, dan gunakan sebagai bahan untuk tumbuh lebih kuat.",
            gagal: "Kegagalan bukan akhir dari segalanya, tapi bagian dari proses menuju kesuksesan. Banyak orang sukses mengalami kegagalan berkali-kali sebelum berhasil. Evaluasi apa yang salah, perbaiki, dan coba lagi dengan strategi berbeda.",
            
            // Kata kunci kecemasan
            cemas: "Kecemasan bisa sangat menganggu. Cobalah teknik grounding: fokus pada 5 hal yang kamu lihat, 4 yang kamu dengar, 3 yang kamu sentuh, 2 yang kamu cium, 1 yang kamu rasakan. Ini membantu membawa pikiranmu kembali ke saat ini.",
            takut: "Ketakutan adalah respon alami tubuh. Tanyakan pada dirimu: apa yang paling buruk yang bisa terjadi? Seringkali ketakutan kita lebih besar dari kenyataan. Buat rencana untuk menghadapi ketakutanmu langkah demi langkah.",
            khawatir: "Kekhawatiran berlebihan bisa menguras energi. Coba tuliskan semua kekhawatiranmu, lalu bagi menjadi: yang bisa kamu kontrol dan yang tidak. Fokus hanya pada yang bisa kamu kontrol, lepaskan yang lainnya.",
            panik: "Saat panik, fokus pada pernapasanmu. Tarik napas dalam 4 hitungan, tahan 4 hitungan, buang 4 hitungan. Ulangi 5 kali. Ingat, ini akan berlalu. Kamu pernah melewati ini sebelumnya, dan kamu akan melewatinya lagi.",
            
            // Kata kunci kemarahan
            marah: "Kemarahan adalah emosi yang valid. Namun penting untuk menyalurkannya dengan sehat. Coba olahraga, pukul bantal, atau tulis semua yang kamu rasakan. Setelah tenang, baru pikirkan solusinya.",
            kesal: "Perasaan kesal menumpuk bisa meledak. Identifikasi apa yang sebenarnya membuatmu kesal. Apakah ada pola? Komunikasikan perasaanmu dengan tenang pada orang yang terlibat, atau cari cara sehat untuk melepaskan emosi ini.",
            benci: "Kebencian bisa meracuni dirimu sendiri. Bukan berarti kamu harus memaafkan atau lupa, tapi lepaskan beban emosional ini untuk kebaikanmu sendiri. Fokus pada hal positif dalam hidupmu.",
            
            // Kata kunci masalah hubungan
            bertengkar: "Pertengkaran dalam hubungan itu normal. Yang penting adalah bagaimana kalian menyelesaikannya. Setelah tenang, ajak bicara dengan kepala dingin. Gunakan 'saya merasa...' bukan 'kamu selalu...'. Fokus pada solusi, bukan menyalahkan.",
            selingkuh: "Pengkhianatan seperti ini sangat menyakitkan. Kamu tidak sendirian, dan ini bukan salahmu. Beri dirimu waktu untuk merasakan semua emosi. Berbicara dengan orang yang kamu percaya atau profesional bisa sangat membantu.",
            
            // Kata kunci masalah pekerjaan/sekolah
            kerja: "Stress kerja bisa sangat menguras. Pastikan kamu punya work-life balance. Jangan bawa masalah kerja ke rumah. Lakukan hobi atau aktivitas yang menyenangkan di luar pekerjaan untuk mengisi ulang energimu.",
            
            // Kata kunci BELAJAR & AKADEMIK - DIPERLUAS
            snbt: "SNBT memang menantang, tapi kamu bisa melakukannya! Tips: 1) Buat jadwal belajar realistis dengan target harian, 2) Fokus pada materi yang sering keluar (pelajari pola soal tahun lalu), 3) Latihan soal rutin lebih efektif daripada hanya baca materi, 4) Jaga kesehatan - tidur 7-8 jam, makan bergizi, olahraga ringan, 5) Join try-out untuk terbiasa dengan sistem dan waktu. Ingat: konsistensi lebih penting daripada belajar marathon. 30 menit fokus setiap hari lebih baik dari 5 jam sekali-kali. Kamu punya waktu, gunakan dengan bijak!",
            utbk: "Persiapan UTBK butuh strategi yang tepat! 1) Pelajari SKL (Standar Kompetensi Lulusan) - fokus pada materi yang pasti keluar, 2) Latihan soal HOTS (Higher Order Thinking Skills) - jangan hanya hafal rumus, 3) Atur waktu: TPS 20 menit/subtes, TKA sesuaikan dengan jumlah soal, 4) Jangan stuck di satu soal - skip dan kembali lagi, 5) Try-out minimal 2 minggu sekali untuk track progress. Pro tip: Pagi hari otak lebih fresh - manfaatkan untuk belajar materi berat. Sore untuk latihan soal. Kamu bisa!",
            sbmptn: "Persiapan SBMPTN/SNBT itu marathon, bukan sprint! Strategi jitu: 1) Buat study plan 3-6 bulan sebelumnya, breakdown per minggu, 2) Fokus pada saintek/soshum sesuai jurusan impian, 3) Pahami konsep, jangan hanya hafal - soal akan bervariasi, 4) Belajar dari kesalahan - setiap try-out dicatat soal yang salah dan dipelajari lagi, 5) Bergabung dengan study group online/offline untuk motivasi. Mental health penting: jangan overload diri, istirahat juga bagian dari persiapan. Percaya pada prosesmu!",
            ujian: "Stress ujian itu wajar, tapi bisa diatasi! Tips anti-stress: 1) Mulai belajar jauh-jauh hari, jangan SKS (Sistem Kebut Semalam) - otak butuh waktu untuk memproses informasi, 2) Gunakan teknik Pomodoro: belajar 25 menit, istirahat 5 menit, 3) Buat ringkasan/mind map - lebih mudah diingat daripada baca textbook, 4) Tidur cukup sebelum ujian (minimal 7 jam) - otak yang fresh perform lebih baik, 5) Sarapan bergizi di hari H. Pro tip: Sebelum tidur, review materi 15 menit - otak akan memproses saat tidur. Kamu sudah berusaha, percaya pada dirimu!",
            uts: "UTS datang tiba-tiba ya? Tenang! Strategi last minute: 1) Prioritaskan materi yang paling sering ditanya atau yang skornya besar, 2) Review catatan kuliah dan tugas - biasanya dosen pakai referensi dari situ, 3) Belajar bareng teman - ajari mereka = kamu jadi lebih paham, 4) Buat cheat sheet (untuk dipelajari, bukan dibawa ujian!) - tulis poin penting di 1 kertas, 5) Jangan begadang - 1 malam tidur cukup lebih efektif dari belajar sampai pagi. Ingat: UTS bukan penentu segalanya. Do your best, Allah akan atur the rest!",
            uas: "UAS adalah final battle semester ini! Strategi matang: 1) Mulai review dari minggu ke-8 atau ke-9, jangan tunggu UTS selesai, 2) Buat rangkuman per bab - lebih ringkas lebih baik, 3) Latih soal tahun lalu kalau ada - pola soal biasanya mirip, 4) Atur jadwal: mata kuliah sulit dapat porsi waktu lebih banyak, 5) Study break penting - setiap 2 jam belajar, istirahat 30 menit. Nutrisi penting: makan makanan bergizi, minum air putih cukup, hindari junk food yang bikin ngantuk. Kamu sudah sejauh ini, tinggal sprint terakhir. Semangat!",
            tugas: "Tugas menumpuk bisa bikin overwhelm. Strategi efektif: 1) List semua tugas dengan deadline-nya, 2) Break down tugas besar jadi sub-task kecil (misalnya: riset, outline, draft, revisi), 3) Tackle yang paling urgent dulu atau yang paling mudah (untuk momentum), 4) Time blocking: alokasikan waktu spesifik untuk setiap tugas, 5) Eliminasi distraksi - matikan notif, pakai fokus mode. Jangan perfeksionis - done is better than perfect. Kerjakan dulu, sempurnakan nanti kalau masih ada waktu. Istirahat juga produktif - jangan paksa diri sampai burnout!",
            skripsi: "Skripsi adalah projek besar, wajar kalau merasa overwhelmed! Game plan: 1) Pecah jadi milestone: proposal, bab 1-5, revisi, sidang - celebrate setiap milestone, 2) Konsultasi rutin dengan dospem - jangan takut, mereka ada untuk membantu, 3) Tulis setiap hari meskipun sedikit - momentum itu kunci, 500 kata per hari = draft selesai dalam 3 bulan, 4) Join komunitas skripsi - support system penting, mereka ngerti struggle kamu, 5) Jaga mental health - olahraga, hobi, quality time dengan teman/keluarga. Remember: skripsi bukan tentang sempurna, tapi tentang selesai. Banyak orang sudah melewati ini, kamu juga pasti bisa!",
            thesis: "Thesis/skripsi itu perjalanan panjang yang menguji mental. Survival tips: 1) Set realistic timeline - jangan terlalu ambisius, kasih buffer untuk revisi, 2) Research tools: Mendeley/Zotero untuk referensi, Grammarly untuk grammar, 3) Buat writing routine - pagi/malam, tentukan waktu terbaikmu, 4) Feedback loop: kirim draft ke dospem berkala, jangan tunggu 'sempurna', 5) Self-care is NOT selfish - burnout bikin progress malah lambat. Frustrasi itu normal, writer's block itu wajar. Ambil break, reset, lanjutkan. Kamu sudah invest begitu banyak, jangan menyerah di tengah jalan. One chapter at a time!",
            
            // Kata kunci materi pelajaran
            matematika: "Matematika memang challenging! Tips belajar: 1) Pahami konsep dasar dulu sebelum latihan soal, 2) Latihan soal rutin - matematika butuh practice, bukan hafalan, 3) Buat catatan rumus dengan contoh aplikasinya, 4) Kalau stuck, coba approach berbeda atau tanya teman/guru, 5) YouTube banyak tutorial bagus (Zenius, Ruangguru, Khan Academy). Matematika itu skill yang diasah. Semakin sering latihan, semakin terbiasa dengan pola soalnya. Jangan mudah menyerah!",
            fisika: "Fisika itu tentang memahami alam semesta! Strategi: 1) Visualisasi konsep - gambar diagram, bayangkan prosesnya, 2) Pahami rumus: darimana asalnya, kapan dipakai, 3) Latihan soal berbagai tipe - essay dan pilihan ganda, 4) Hubungkan dengan kehidupan nyata - lebih mudah diingat, 5) Konsep > Hafalan. Kalau paham konsepnya, rumus bisa diturunkan sendiri. Fisika sulit di awal, tapi seru kalau sudah 'klik'. Keep trying!",
            kimia: "Kimia adalah puzzle yang seru! Learning hacks: 1) Pahami tabel periodik - ini fondasi kimia, 2) Stoikiometri: banyak latihan soal, 3) Buat flashcard untuk reaksi-reaksi penting, 4) Visualisasi struktur molekul - gunakan model 3D atau apps, 5) Praktikum penting - lihat teori dalam action. Kimia itu ada pola. Semakin banyak latihan, semakin keliatan polanya. Organic chemistry memang tricky, tapi kalau sudah paham mekanisme, jadi lebih mudah!",
            biologi: "Biologi itu banyak hafalan tapi bisa fun! Study tips: 1) Buat mind map - hubungkan konsep satu sama lain, 2) Gunakan mnemonics untuk ingat urutan (misal: taksonomi), 3) Gambar diagram - sistem pencernaan, peredaran darah, dll, 4) Nonton video animasi - lebih mudah paham proses dalam tubuh, 5) Relate dengan tubuhmu - personally relevant. Biologi itu story tentang kehidupan. Kalau dipahami sebagai cerita, bukan hafalan, jadi lebih menarik dan lebih gampang diingat!",
            bahasa: "Belajar bahasa (Indonesia/Inggris) bisa ditingkatkan! Tips: 1) Banyak baca - artikel, novel, essay untuk vocabulary dan struktur kalimat, 2) Tulis setiap hari - journal, essay, caption - practice makes perfect, 3) Grammar: pahami pola kalimat, bukan hafal aturan, 4) Listening & Speaking: nonton film/podcast tanpa subtitle, 5) Jangan takut salah - kesalahan adalah bagian dari proses belajar. Bahasa adalah alat komunikasi. Semakin sering dipakai, semakin lancar. Konsistensi adalah kunci!",
            
            // Kata kunci motivasi belajar
            malas: "Malas belajar itu sangat manusiawi! Cara mengatasinya: 1) Start small - 10 menit aja dulu, momentum akan datang, 2) Matikan distraksi - HP mode pesawat, jauh dari tempat tidur, 3) Study dengan teman - peer pressure positif, 4) Reward system - setelah 1 jam belajar, treat yourself, 5) Cari 'why' kamu - ingatkan diri kenapa kamu harus belajar (cita-cita, ortu, masa depan). Motivasi tidak selalu ada, yang penting disiplin. Disiplin > Motivasi. Force yourself untuk mulai, nanti akan terbiasa. Kamu bisa!",
            bosan: "Bosan belajar adalah alarm bahwa metode perlu diganti! Solusi: 1) Variasi metode - video, podcast, mind map, bukan cuma baca, 2) Pindah lokasi - cafe, taman, perpus, suasana baru refresh otak, 3) Pomodoro technique - 25 menit fokus, 5 menit break, 4) Study group - diskusi lebih engaging daripada belajar sendirian, 5) Gamify - buat challenge, set timer, bikin leaderboard dengan teman. Bosan itu natural. Yang penting cari cara belajar yang cocok untukmu. Learning bisa fun kalau caranya tepat!",
            sulit: "Materi sulit itu challenge yang bisa ditaklukkan! Approach: 1) Break down - jangan lihat keseluruhan, fokus per bagian kecil, 2) Teach others - kalau bisa menjelaskan, berarti sudah paham, 3) Cari sumber lain - YouTube, Medium, artikel - mungkin penjelasannya lebih cocok, 4) Bertanya tanpa malu - ke guru, teman, forum online, 5) Practice repeatedly - repeat exposure bikin familiar. Difficulty is temporary. Yang tadinya sulit, kalau sudah paham jadi mudah. Don't give up! Otak kamu lebih powerful dari yang kamu kira. Keep pushing!",
            nilai: "Nilai jelek bukan akhir segalanya! Perspective: 1) Evaluasi: apa yang salah? Kurang paham materi? Kurang latihan? Careless? 2) Action plan: perbaiki yang kurang, minta feedback dari guru, 3) Growth mindset: ini kesempatan belajar, bukan kegagalan, 4) Nilai bukan ukuran kepintaran - ada banyak faktor (hari H, soal, keberuntungan), 5) Move forward - fokus ke depan, jangan terjebak di masa lalu. Banyak orang sukses yang dulu nilainya biasa saja. Yang penting effort dan progression. You're more than your grades!",
            
            // Kata kunci masalah kesehatan
            sakit: "Kondisi fisik yang tidak fit mempengaruhi mental. Istirahat yang cukup, makan bergizi, minum air putih. Jika perlu, konsultasi ke dokter. Jangan abaikan kesehatan fisikmu.",
            lelah: "Kelelahan bisa mental atau fisik. Dengarkan tubuhmu. Mungkin kamu butuh tidur lebih banyak, atau mungkin butuh waktu untuk dirimu sendiri. Jangan merasa bersalah untuk istirahat. Burnout itu real - lebih baik cegah daripada mengobati!",
            burnout: "Burnout adalah kondisi serius! Recovery steps: 1) STOP - ambil break total 1-2 hari, no guilt, 2) Reconnect dengan hobi non-akademik - gaming, olahraga, seni, 3) Social support - curhat ke orang terdekat, 4) Reset expectations - lowered standards sementara okay, 5) Professional help kalau perlu - konselor/psikolog bisa bantu. Burnout terjadi karena overwork tanpa istirahat cukup. Prevention: work-life balance, regular breaks, self-care routine. Kamu bukan robot. Rest is productive!",
            
            // Kata kunci kesepian
            sendiri: "Merasa sendiri itu berat. Ingat bahwa sendirian tidak sama dengan kesepian. Coba hubungi teman atau keluarga. Atau join komunitas dengan minat yang sama. Ada banyak orang di luar sana yang juga ingin berteman.",
            kesepian: "Kesepian adalah perasaan yang valid. Coba reach out ke orang-orang. Kadang orang lain juga merasa kesepian tapi tidak tahu bagaimana memulai. Berani mengambil langkah pertama untuk berkomunikasi bisa membuka banyak pintu.",
            
            // Kata kunci umum positif
            bahagia: "Senang mendengar kamu bahagia! Nikmati momen ini, dan ingat perasaan ini ketika nanti ada hari yang berat. Buat catatan tentang apa yang membuatmu bahagia hari ini.",
            bersyukur: "Rasa syukur adalah kunci kebahagiaan. Kamu sudah di jalan yang benar. Terus latih mindfulness dan appreciate hal-hal kecil dalam hidup.",
            semangat: "Energi positifmu luar biasa! Pertahankan semangat ini. Channeling energy ke hal produktif akan membawa hasil yang luar biasa. Kamu lagi on fire, teruskan!"
        };

        function selectMood(emoji, moodText) {
            const buttons = document.querySelectorAll('.mood-btn');
            buttons.forEach(btn => btn.classList.remove('selected'));
            event.target.closest('.mood-btn').classList.add('selected');
            selectedMood = emoji;
            selectedMoodText = moodText;
            
            // Tampilkan solusi berdasarkan mood
            const solutionBox = document.getElementById('solutionBox');
            const solutionText = document.getElementById('solutionText');
            solutionBox.style.display = 'block';
            solutionText.textContent = solutions[moodText];
            
            // Update AI solution jika ada teks jurnal
            updateAISolution();
        }

        function updateAISolution() {
            const journalText = document.getElementById('journalText').value.toLowerCase();
            const aiSolutionBox = document.getElementById('aiSolutionBox');
            const aiSolutionText = document.getElementById('aiSolutionText');
            
            if (!journalText.trim()) {
                aiSolutionBox.style.display = 'none';
                return;
            }

            // Cari kata kunci dalam cerita
            let foundSolution = null;
            for (let keyword in keywordSolutions) {
                if (journalText.includes(keyword)) {
                    foundSolution = keywordSolutions[keyword];
                    break;
                }
            }

            if (foundSolution) {
                aiSolutionBox.style.display = 'block';
                aiSolutionText.textContent = foundSolution;
            } else if (selectedMood && ['Sedih', 'Cemas', 'Kesal'].includes(selectedMoodText)) {
                // Solusi umum untuk mood negatif
                aiSolutionBox.style.display = 'block';
                aiSolutionText.textContent = "Terima kasih sudah berbagi ceritamu. Ingat bahwa tidak apa-apa untuk tidak baik-baik saja. Perasaanmu valid. Coba ambil napas dalam-dalam, istirahat sejenak. Berbicara dengan orang terdekat atau profesional bisa membantu. Kamu tidak sendiri dalam menghadapi ini.";
            } else {
                aiSolutionBox.style.display = 'none';
            }
        }

        // Update solusi saat mengetik
        document.addEventListener('DOMContentLoaded', function() {
            const journalTextarea = document.getElementById('journalText');
            journalTextarea.addEventListener('input', updateAISolution);
        });

        function saveEntry() {
            const text = document.getElementById('journalText').value.trim();
            
            if (!selectedMood && !text) {
                alert('Pilih mood atau tulis jurnal terlebih dahulu!');
                return;
            }

            const entry = {
                mood: selectedMood || '📝',
                moodText: selectedMoodText || 'Jurnal',
                text: text || '-',
                date: new Date().toLocaleString('id-ID')
            };

            entries.unshift(entry);
            if (entries.length > 10) entries.pop();

            document.getElementById('journalText').value = '';
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
            document.getElementById('solutionBox').style.display = 'none';
            document.getElementById('aiSolutionBox').style.display = 'none';
            selectedMood = null;
            selectedMoodText = '';

            displayEntries();
            updateStats();
            updateSummary();
            alert('Jurnal berhasil disimpan! 🎉');
        }

        function saveMotivation() {
            const text = document.getElementById('motivationInput').value.trim();
            
            if (!text) {
                alert('Tulis motivasi terlebih dahulu!');
                return;
            }

            motivations.unshift(text);
            if (motivations.length > 5) motivations.pop();

            document.getElementById('motivationInput').value = '';
            displayMotivations();
            alert('Motivasi berhasil disimpan! 💪');
        }

        function displayMotivations() {
            const container = document.getElementById('myMotivations');
            
            if (motivations.length === 0) {
                container.innerHTML = '<div class="no-entries">Belum ada motivasi pribadi. Mulai tambahkan sekarang!</div>';
                return;
            }

            container.innerHTML = motivations.map(mot => `
                <div class="motivation-item">💪 ${mot}</div>
            `).join('');
        }

        function displayEntries() {
            const list = document.getElementById('entriesList');
            
            if (entries.length === 0) {
                list.innerHTML = '<div class="no-entries">Belum ada jurnal. Mulai menulis hari ini!</div>';
                return;
            }

            list.innerHTML = entries.map(entry => `
                <div class="entry">
                    <div class="entry-header">
                        <span class="entry-mood">${entry.mood} ${entry.moodText}</span>
                        <span>${entry.date}</span>
                    </div>
                    <div class="entry-text">${entry.text}</div>
                </div>
            `).join('');
        }

        function updateStats() {
            document.getElementById('totalEntries').textContent = entries.length;
            document.getElementById('happyCount').textContent = entries.filter(e => e.mood === '😊').length;
            document.getElementById('calmCount').textContent = entries.filter(e => e.mood === '😌').length;
            document.getElementById('sadCount').textContent = entries.filter(e => e.mood === '😔').length;
        }

        function updateSummary() {
            if (entries.length === 0) {
                document.getElementById('dominantMood').textContent = '-';
                document.getElementById('emotionPattern').textContent = 'Belum cukup data untuk analisis. Mulai catat moodmu minimal 3 hari untuk melihat pola emosi.';
                document.getElementById('recommendation').textContent = 'Terus catat perasaanmu setiap hari untuk memahami dirimu lebih baik.';
                return;
            }

            // Hitung mood dominan
            const moodCount = {};
            entries.forEach(e => {
                moodCount[e.moodText] = (moodCount[e.moodText] || 0) + 1;
            });
            
            const dominant = Object.keys(moodCount).reduce((a, b) => moodCount[a] > moodCount[b] ? a : b);
            const dominantEmoji = entries.find(e => e.moodText === dominant).mood;
            
            document.getElementById('dominantMood').textContent = `${dominantEmoji} ${dominant} (${moodCount[dominant]} dari ${entries.length} hari)`;

            // Analisis pola
            let pattern = '';
            const positiveCount = entries.filter(e => ['Senang', 'Tenang'].includes(e.moodText)).length;
            const negativeCount = entries.filter(e => ['Sedih', 'Cemas', 'Kesal'].includes(e.moodText)).length;
            const percentage = Math.round((positiveCount / entries.length) * 100);

            if (percentage >= 70) {
                pattern = `Luar biasa! ${percentage}% hari-harimu dalam kondisi positif. Kamu sedang dalam fase yang baik. Pertahankan pola ini dengan terus melakukan hal-hal yang membuatmu bahagia.`;
            } else if (percentage >= 50) {
                pattern = `Cukup seimbang. ${percentage}% hari-harimu positif. Ada naik turun yang wajar dalam hidup. Fokus pada hal-hal kecil yang membawa kebahagiaan setiap hari.`;
            } else {
                pattern = `Sepertinya kamu sedang menghadapi periode yang cukup berat. ${percentage}% hari-harimu positif. Ingat bahwa ini tidak permanen. Pertimbangkan untuk berbicara dengan orang terdekat atau profesional jika merasa perlu.`;
            }
            
            document.getElementById('emotionPattern').textContent = pattern;

            // Rekomendasi
            let recommendation = '';
            if (negativeCount > positiveCount) {
                recommendation = 'Coba tambahkan satu aktivitas kecil yang membuatmu senang setiap hari. Bisa sesederhana mendengarkan lagu favorit atau jalan pagi 10 menit. Jika perasaan negatif terus berlanjut, jangan ragu untuk mencari dukungan profesional.';
            } else if (moodCount['Cemas'] >= 2) {
                recommendation = 'Kamu sering merasa cemas akhir-akhir ini. Coba praktikkan teknik pernapasan atau meditasi 5 menit setiap hari. Batasi konsumsi kafein dan media sosial. Olahraga teratur juga sangat membantu mengurangi kecemasan.';
            } else {
                recommendation = 'Kamu mengelola emosimu dengan baik! Terus pertahankan journaling ini sebagai kebiasaan. Refleksi diri adalah kunci untuk kesehatan mental yang baik.';
            }
            
            document.getElementById('recommendation').textContent = recommendation;
        }

        function changeQuote() {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            document.getElementById('quoteText').textContent = `"${randomQuote.text}"`;
            document.getElementById('quoteAuthor').textContent = `- ${randomQuote.author}`;
        }

        // Initialize
        displayEntries();
        displayMotivations();
        updateStats();
        updateSummary();