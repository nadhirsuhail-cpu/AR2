/* ============================================================
   KATA+ AR — KANDUNGAN PEMBELAJARAN
   KSSR Bahasa Melayu Tahun 3
   Standard Kandungan 5.1 / Standard Pembelajaran 5.1.3
   Kata adjektif: jarak, perasaan, pancaindera
   ============================================================ */
"use strict";

window.DataApp = {

  INFO: {
    tajuk: "KATA+ AR — Misi Kata Adjektif",
    sub: "Aplikasi pembelajaran interaktif Bahasa Melayu Tahun 3",
    kssr: "KSSR (Semakan 2017) Bahasa Melayu Tahun 3",
    sk: "5.1",
    skTeks: "Memahami fungsi dan menggunakan golongan kata mengikut konteks.",
    sp: "5.1.3",
    spTeks: "Memahami dan menggunakan kata adjektif mengikut konteks: (i) jarak, (ii) perasaan, (iii) pancaindera.",
    privasi: "Kamera hanya digunakan untuk mengesan pergerakan tangan. Rakaman tidak disimpan atau dihantar ke server.",
    privasiPenuh: "Kamera digunakan hanya untuk mengesan pergerakan tangan (hand tracking). Tiada gambar atau video disimpan. Semua pemprosesan berlaku di dalam peranti anda dan tiada data dihantar ke server."
  },

  KATEGORI: {
    jarak: {
      id: "jarak", label: "Jarak", ikon: "pembaris",
      kata: ["jauh", "dekat", "hampir", "rapat"],
      desc: "Menerangkan jarak antara dua benda atau tempat."
    },
    perasaan: {
      id: "perasaan", label: "Perasaan", ikon: "jantung",
      kata: ["gembira", "sedih", "takut", "marah", "kecewa", "bangga"],
      desc: "Menerangkan perasaan yang dialami seseorang."
    },
    pancaindera: {
      id: "pancaindera", label: "Pancaindera", ikon: "mata",
      kata: ["manis", "masam", "masin", "pahit", "harum", "busuk", "lembut", "kasar", "terang", "gelap", "merdu", "bising"],
      desc: "Menerangkan apa yang dilihat, didengar, dirasa, dihidu atau disentuh."
    }
  },

  /* ---------- MODUL PEMBELAJARAN ---------- */
  MODUL: {
    jarak: {
      id: "jarak",
      tajuk: "Kata Adjektif Jarak",
      intro: "Kata adjektif jarak menerangkan kedudukan dua benda atau tempat. Gerakkan Objek B dan perhatikan perkataan yang sesuai!",
      kataJarak: [
        { kata: "rapat", min: 0, max: 18 },
        { kata: "dekat", min: 18, max: 40 },
        { kata: "hampir", min: 40, max: 65 },
        { kata: "jauh", min: 65, max: 100 }
      ],
      aksi: [
        { label: "Rapat", nilai: 8 },
        { label: "Dekat", nilai: 28 },
        { label: "Hampir", nilai: 52 },
        { label: "Jauh", nilai: 88 }
      ],
      soalan: [
        {
          soalan: "Rumah Ali sangat ______ dari sekolah.",
          jarakNilai: 88, pilihan: ["dekat", "jauh"], jawab: "jauh",
          penjelasan: "Jauh bermaksud jarak yang besar. Rumah Ali berada sangat jauh dari sekolah."
        },
        {
          soalan: "Kerusi Amin duduk ______ dengan meja cikgu.",
          jarakNilai: 8, pilihan: ["rapat", "jauh"], jawab: "rapat",
          penjelasan: "Rapat bermaksud sangat dekat, hampir bersentuhan. Kerusi Amin rapat dengan meja cikgu."
        },
        {
          soalan: "Kedai buku itu ______ dengan masjid.",
          jarakNilai: 52, pilihan: ["hampir", "jauh"], jawab: "hampir",
          penjelasan: "Hampir bermaksud jarak yang sederhana — tidak terlalu dekat dan tidak terlalu jauh."
        }
      ]
    },
    perasaan: {
      id: "perasaan",
      tajuk: "Kata Adjektif Perasaan",
      intro: "Kata adjektif perasaan menerangkan perasaan yang dialami seseorang. Sentuh setiap wajah untuk membaca ceritanya.",
      wajah: [
        { emosi: "gembira", ayat: "Aina mendapat hadiah hari jadi." },
        { emosi: "sedih", ayat: "Kucing Aiman lari dari rumah." },
        { emosi: "takut", ayat: "Adam terdengar bunyi guruh yang kuat." },
        { emosi: "marah", ayat: "Buku Azim dikoyakkan oleh adiknya." },
        { emosi: "kecewa", ayat: "Pasukan Fauzi kalah dalam perlawanan bola." },
        { emosi: "bangga", ayat: "Siti menang tempat pertama dalam pertandingan mewarna." }
      ],
      soalan: [
        {
          cerita: "Aina mendapat hadiah hari jadi.",
          soalan: "Aina berasa ______.",
          pilihan: ["gembira", "sedih", "marah"], jawab: "gembira",
          penjelasan: "Gembira ialah kata adjektif perasaan kerana menerangkan perasaan Aina apabila mendapat hadiah."
        },
        {
          cerita: "Adam terdengar bunyi guruh yang kuat.",
          soalan: "Adam berasa ______.",
          pilihan: ["takut", "gembira", "bangga"], jawab: "takut",
          penjelasan: "Takut ialah kata adjektif perasaan kerana menerangkan perasaan Adam apabila mendengar guruh."
        },
        {
          cerita: "Siti menang tempat pertama dalam pertandingan mewarna.",
          soalan: "Siti berasa ______.",
          pilihan: ["bangga", "kecewa", "sedih"], jawab: "bangga",
          penjelasan: "Bangga ialah kata adjektif perasaan kerana menerangkan perasaan Siti yang berjaya dalam pertandingan."
        }
      ]
    },
    pancaindera: {
      id: "pancaindera",
      tajuk: "Kata Adjektif Pancaindera",
      intro: "Kata adjektif pancaindera berkaitan lima deria kita. Sentuh setiap objek untuk mengenali katanya. Gunakan deria kamu!",
      deria: [
        { id: "limau", nama: "Limau", kata: "masam", deria: "Lidah (rasa)", ayat: "Limau ini rasanya masam.", audio: null },
        { id: "madu", nama: "Madu", kata: "manis", deria: "Lidah (rasa)", ayat: "Madu ini rasanya manis.", audio: null },
        { id: "garam", nama: "Garam", kata: "masin", deria: "Lidah (rasa)", ayat: "Garam ini rasanya masin.", audio: null },
        { id: "kopi", nama: "Kopi", kata: "pahit", deria: "Lidah (rasa)", ayat: "Kopi tanpa gula rasanya pahit.", audio: null },
        { id: "bunga", nama: "Bunga", kata: "harum", deria: "Hidung (hidu)", ayat: "Bunga ini baunya harum.", audio: null },
        { id: "sampah", nama: "Sampah", kata: "busuk", deria: "Hidung (hidu)", ayat: "Sampah ini baunya busuk.", audio: null },
        { id: "kapas", nama: "Kapas", kata: "lembut", deria: "Kulit (sentuh)", ayat: "Kapas ini terasa lembut.", audio: null },
        { id: "batu", nama: "Batu", kata: "kasar", deria: "Kulit (sentuh)", ayat: "Batu ini terasa kasar.", audio: null },
        { id: "lampu", nama: "Lampu", kata: "terang", deria: "Mata (lihat)", ayat: "Bilik itu terang apabila lampu dibuka.", audio: null },
        { id: "malam", nama: "Malam", kata: "gelap", deria: "Mata (lihat)", ayat: "Pada waktu malam, suasana menjadi gelap.", audio: null },
        { id: "gitar", nama: "Gitar", kata: "merdu", deria: "Telinga (dengar)", ayat: "Bunyi gitar itu merdu.", audio: "merdu" },
        { id: "pembinaan", nama: "Tapak Bina", kata: "bising", deria: "Telinga (dengar)", ayat: "Bunyi tapak pembinaan itu bising.", audio: "bising" }
      ],
      soalan: [
        {
          soalan: "Limau ini rasanya ______.",
          objek: "limau", pilihan: ["masam", "manis"], jawab: "masam",
          penjelasan: "Masam ialah kata adjektif pancaindera kerana kita rasa dengan lidah."
        },
        {
          soalan: "Dengar bunyi ini. Bunyi yang kamu dengar ialah ______.",
          audio: "bising", pilihan: ["bising", "merdu"], jawab: "bising",
          penjelasan: "Bising ialah kata adjektif pancaindera kerana kita dengar dengan telinga."
        },
        {
          soalan: "Bunga ini baunya ______.",
          objek: "bunga", pilihan: ["harum", "busuk"], jawab: "harum",
          penjelasan: "Harum ialah kata adjektif pancaindera kerana kita hidu dengan hidung."
        },
        {
          soalan: "Batu ini terasa ______.",
          objek: "batu", pilihan: ["kasar", "lembut"], jawab: "kasar",
          penjelasan: "Kasar ialah kata adjektif pancaindera kerana kita sentuh dengan kulit."
        }
      ]
    }
  },

  /* ---------- MISI ---------- */
  MISI: [
    { no: 1, id: "m1", nama: "Kenali", pendek: "Kenali tiga jenis kata adjektif melalui modul pembelajaran.", ikon: "buku", xp: 40, laluan: "#/belajar" },
    { no: 2, id: "m2", nama: "Sentuh & Pilih", pendek: "Kenal pasti kata adjektif berdasarkan visual dan cerita.", ikon: "mata", xp: 30, laluan: "#/misi/2" },
    { no: 3, id: "m3", nama: "Gerakkan Tangan", pendek: "Gunakan kamera dan gerakan tangan untuk menangkap kata adjektif.", ikon: "kamera", xp: 50, laluan: "#/misi/3" },
    { no: 4, id: "m4", nama: "Bina Ayat", pendek: "Masukkan kata ke tempatnya dan lengkapkan ayat dengan betul.", ikon: "pensel", xp: 40, laluan: "#/misi/4" },
    { no: 5, id: "m5", nama: "Cabaran Akhir", pendek: "Kuiz yang menggabungkan semua jenis kata adjektif.", ikon: "trofi", xp: 60, laluan: "#/misi/5" }
  ],

  /* ---------- MISI 02: SENTUH & PILIH ---------- */
  SENTUH: [
    {
      kategori: "jarak", jenis: "jarak", jarakNilai: 85,
      soalan: "Pilih kata yang sesuai untuk kedudukan kedua-dua objek ini.",
      pilihan: ["jauh", "dekat"], jawab: "jauh",
      penjelasan: "Jauh bermaksud jarak yang besar. Objek A dan B sangat berjauhan."
    },
    {
      kategori: "perasaan", jenis: "wajah", emosi: "sedih",
      soalan: "Kucing Aiman lari dari rumah. Aiman berasa ______.",
      pilihan: ["sedih", "gembira"], jawab: "sedih",
      penjelasan: "Sedih ialah kata adjektif perasaan yang menggambarkan perasaan Aiman."
    },
    {
      kategori: "pancaindera", jenis: "objek", objek: "madu",
      soalan: "Madu ini rasanya ______.",
      pilihan: ["manis", "masin"], jawab: "manis",
      penjelasan: "Manis ialah kata adjektif pancaindera kerana dirasa dengan lidah."
    },
    {
      kategori: "jarak", jenis: "jarak", jarakNilai: 12,
      soalan: "Pilih kata yang sesuai untuk kedudukan kedua-dua objek ini.",
      pilihan: ["dekat", "jauh"], jawab: "dekat",
      penjelasan: "Dekat bermaksud jarak yang kecil antara dua objek."
    },
    {
      kategori: "perasaan", jenis: "wajah", emosi: "marah",
      soalan: "Buku Azim dikoyakkan oleh adiknya. Azim berasa ______.",
      pilihan: ["marah", "takut"], jawab: "marah",
      penjelasan: "Marah ialah kata adjektif perasaan yang menggambarkan perasaan Azim."
    },
    {
      kategori: "pancaindera", jenis: "objek", objek: "lampu",
      soalan: "Bilik itu ______ apabila lampu dibuka.",
      pilihan: ["terang", "gelap"], jawab: "terang",
      penjelasan: "Terang ialah kata adjektif pancaindera kerana dilihat dengan mata."
    }
  ],

  /* ---------- MISI 04: DRAG & DROP ---------- */
  DND: {
    tajuk: "Masukkan Kata ke Tempatnya",
    arahan: "Seret setiap kad kata ke kawasan kategori yang betul. Pada telefon, ketik kad dahulu, kemudian ketik kawasan.",
    perkataan: [
      { kata: "jauh", kategori: "jarak" },
      { kata: "gembira", kategori: "perasaan" },
      { kata: "masam", kategori: "pancaindera" },
      { kata: "dekat", kategori: "jarak" },
      { kata: "takut", kategori: "perasaan" },
      { kata: "harum", kategori: "pancaindera" },
      { kata: "sedih", kategori: "perasaan" },
      { kata: "pahit", kategori: "pancaindera" }
    ]
  },

  /* ---------- MISI 04: BINA AYAT ---------- */
  AYAT: [
    {
      ayat: "Ali berasa ______ apabila mendapat hadiah.",
      pilihan: ["gembira", "masam", "jauh"], jawab: "gembira",
      penjelasan: "Gembira ialah kata adjektif perasaan kerana menerangkan perasaan Ali."
    },
    {
      ayat: "Limau ini rasanya sangat ______.",
      pilihan: ["masam", "jauh", "gembira"], jawab: "masam",
      penjelasan: "Masam ialah kata adjektif pancaindera kerana dirasa dengan lidah."
    },
    {
      ayat: "Rumah nenek sangat ______ dari bandar.",
      pilihan: ["jauh", "manis", "sedih"], jawab: "jauh",
      penjelasan: "Jauh ialah kata adjektif jarak kerana menerangkan jarak rumah nenek dari bandar."
    },
    {
      ayat: "Bunga di taman itu sangat ______.",
      pilihan: ["harum", "bising", "kasar"], jawab: "harum",
      penjelasan: "Harum ialah kata adjektif pancaindera kerana dihidu dengan hidung."
    }
  ],

  /* ---------- MISI 05: CABARAN AKHIR (10 soalan, 6 jenis) ---------- */
  KUIZ: [
    {
      jenis: "mcq", kategori: "jarak",
      soalan: "Rumah Ali sangat ______ dari sekolah.",
      media: { jenis: "jarak", jarakNilai: 88 },
      pilihan: ["dekat", "jauh"], jawab: "jauh",
      penjelasan: "Jauh ialah kata adjektif jarak — jarak yang besar antara dua tempat."
    },
    {
      jenis: "dnd", kategori: "perasaan",
      soalan: "Seret atau ketik perkataan GEMBIRA ke kawasan kategori yang betul.",
      perkataan: "gembira", jawab: "perasaan",
      penjelasan: "Gembira menerangkan perasaan seseorang, jadi ia kata adjektif perasaan."
    },
    {
      jenis: "imej", kategori: "pancaindera",
      soalan: "Limau ini rasanya ______.",
      media: { jenis: "objek", objek: "limau" },
      pilihan: ["masam", "manis"], jawab: "masam",
      penjelasan: "Masam ialah kata adjektif pancaindera kerana dirasa dengan lidah."
    },
    {
      jenis: "ayat", kategori: "perasaan",
      soalan: "Ali berasa ______ apabila mendapat hadiah.",
      pilihan: ["gembira", "masam", "jauh"], jawab: "gembira",
      penjelasan: "Gembira ialah kata adjektif perasaan kerana menerangkan perasaan Ali."
    },
    {
      jenis: "isyarat", kategori: "jarak",
      soalan: "Tangan dalam gambar menunjuk ke salah satu kad. Ketik kad yang ditunjuk oleh tangan itu.",
      media: { jenis: "isyarat", kad: ["DEKAT", "JAUH"], tunjuk: 0 },
      pilihan: ["DEKAT", "JAUH"], jawab: "DEKAT",
      penjelasan: "Tangan menunjuk ke kad DEKAT. Dekat ialah kata adjektif jarak."
    },
    {
      jenis: "audio", kategori: "pancaindera",
      soalan: "Dengar bunyi ini. Bunyi yang kamu dengar ialah ______.",
      media: { jenis: "audio", audio: "merdu" },
      pilihan: ["merdu", "bising"], jawab: "merdu",
      penjelasan: "Merdu ialah kata adjektif pancaindera kerana didengar dengan telinga."
    },
    {
      jenis: "mcq", kategori: "perasaan",
      soalan: "Kucing Aiman lari dari rumah. Aiman berasa ______.",
      media: { jenis: "wajah", emosi: "sedih" },
      pilihan: ["sedih", "bangga"], jawab: "sedih",
      penjelasan: "Sedih ialah kata adjektif perasaan yang menggambarkan perasaan Aiman."
    },
    {
      jenis: "dnd", kategori: "pancaindera",
      soalan: "Seret atau ketik perkataan HARUM ke kawasan kategori yang betul.",
      perkataan: "harum", jawab: "pancaindera",
      penjelasan: "Harum berkaitan deria hidu, jadi ia kata adjektif pancaindera."
    },
    {
      jenis: "imej", kategori: "jarak",
      soalan: "Kedudukan kedua-dua objek ini sangat ______.",
      media: { jenis: "jarak", jarakNilai: 10 },
      pilihan: ["rapat", "jauh"], jawab: "rapat",
      penjelasan: "Rapat bermaksud sangat dekat, hampir bersentuhan."
    },
    {
      jenis: "mcq", kategori: "pancaindera",
      soalan: "Kopi tanpa gula rasanya ______.",
      media: { jenis: "objek", objek: "kopi" },
      pilihan: ["pahit", "manis"], jawab: "pahit",
      penjelasan: "Pahit ialah kata adjektif pancaindera kerana dirasa dengan lidah."
    }
  ],

  /* ---------- AR: TANGKAP KATA ADJEKTIF ---------- */
  AR: {
    tajuk: "Tangkap Kata Adjektif",
    arahanAwal: "Kamera akan dibuka. Angkat tangan ke hadapan kamera, kemudian tunjuk ke kad jawapan.",
    pusingan: [
      {
        kategori: "perasaan",
        kad: ["JAUH", "GEMBIRA", "MASAM", "MARAH", "HARUM", "DEKAT"],
        sasaran: ["GEMBIRA", "MARAH"]
      },
      {
        kategori: "pancaindera",
        kad: ["GEMBIRA", "HARUM", "DEKAT", "MASAM", "JAUH", "MARAH"],
        sasaran: ["MASAM", "HARUM"]
      },
      {
        kategori: "jarak",
        kad: ["MERDU", "JAUH", "SEDIH", "DEKAT", "PAHIT", "TAKUT"],
        sasaran: ["JAUH", "DEKAT"]
      },
      {
        kategori: "pancaindera",
        kad: ["MERDU", "SEDIH", "PAHIT", "TAKUT", "KASAR", "RAPAT"],
        sasaran: ["MERDU", "PAHIT", "KASAR"]
      }
    ],
    hintKat: {
      jarak: "Kata adjektif jarak menerangkan kedudukan dua benda atau tempat.",
      perasaan: "Kata adjektif perasaan menerangkan perasaan seseorang.",
      pancaindera: "Kata adjektif pancaindera berkaitan lima deria: lihat, dengar, rasa, hidu dan sentuh."
    },
    salahHint: "Kata itu ialah kata adjektif {salah}. Cuba cari kata adjektif {betul}."
  },

  /* ---------- GERAKAN TANGAN ---------- */
  GERAK: [
    { id: "tapak", nama: "Tapak Tangan Terbuka", desc: "Buka senarai kategori di dalam skrin AR.", ikon: "tapakTerbuka" },
    { id: "tunjuk", nama: "Menunjuk", desc: "Halakan jari telunjuk ke kad dan tahan sebentar untuk memilih.", ikon: "telunjuk" },
    { id: "cubit", nama: "Cubit", desc: "Cubit ibu jari dan jari telunjuk untuk mengambil kad.", ikon: "cubit" },
    { id: "swai", nama: "Swipe Kiri / Kanan", desc: "Dengan tapak tangan terbuka, sapu cepat secara mendatar ke kiri atau kanan untuk menukar pusingan.", ikon: "swai" },
    { id: "ibu", nama: "Ibu Jari ke Atas", desc: "Sahkan jawapan yang telah dipilih.", ikon: "ibuJari" },
    { id: "angkat", nama: "Angkat Tangan", desc: "Angkat tangan ke atas untuk meminta petunjuk.", ikon: "angkatTangan" }
  ],

  /* ---------- GAMIFIKASI ---------- */
  LENCANA: [
    { id: "pemerhati-jarak", nama: "Pemerhati Jarak", desc: "Berjaya menyelesaikan Modul Kata Adjektif Jarak.", syarat: "Selesaikan Modul Jarak", ikon: "pembaris", kelas: "jarak" },
    { id: "pembaca-perasaan", nama: "Pembaca Perasaan", desc: "Berjaya menyelesaikan Modul Kata Adjektif Perasaan.", syarat: "Selesaikan Modul Perasaan", ikon: "jantung", kelas: "perasaan" },
    { id: "pakar-pancaindera", nama: "Pakar Pancaindera", desc: "Berjaya menyelesaikan Modul Kata Adjektif Pancaindera.", syarat: "Selesaikan Modul Pancaindera", ikon: "mata", kelas: "pancaindera" },
    { id: "master", nama: "Master Kata Adjektif", desc: "Berjaya menyelesaikan kelima-lima misi.", syarat: "Selesaikan semua 5 misi", ikon: "trofi", kelas: "master" }
  ],
  TAHAP: [
    { min: 0, nama: "Penjelajah Kata" },
    { min: 150, nama: "Pemburu Kata" },
    { min: 350, nama: "Wira Kata" },
    { min: 550, nama: "Master Kata Adjektif" }
  ],
  XP: { modul: 40, misi2: 30, misi3: 50, misi4: 40, misi5: 60, soalanKuiz: 10, soalanAktiviti: 10 },

  /* ---------- KATA+ ADVENTURE ---------- */
  ADVENTURE: {
    levels: [
      {
        id: "jarak", no: 1, title: "Lembah Kata Jarak", category: "jarak",
        focus: "jauh · dekat · hampir · rapat",
        objective: "Kutip 3 kata adjektif JARAK untuk membuka gerbang.",
        targetWords: ["jauh", "dekat", "hampir", "rapat"], requiredWords: 3,
        wordPool: ["jauh", "dekat", "hampir", "rapat", "gembira", "masam", "harum"],
        gates: [
          { x: 930, title: "Gerbang Jarak", questions: [
            { prompt: "Rumah Ali sangat ______ dari sekolah.", options: ["jauh", "dekat", "manis"], answer: "jauh", hint: "Jarak rumah dengan sekolah sangat besar.", explain: "Jauh menerangkan jarak antara rumah Ali dengan sekolah." }
          ]},
          { x: 1630, title: "Jambatan Hampir", questions: [
            { prompt: "Kedai buku itu ______ dengan masjid.", options: ["hampir", "sedih", "harum"], answer: "hampir", hint: "Kedai buku itu tidak jauh daripada masjid.", explain: "Hampir ialah kata adjektif jarak." }
          ]}
        ]
      },
      {
        id: "perasaan", no: 2, title: "Taman Kata Perasaan", category: "perasaan",
        focus: "gembira · sedih · takut · marah · bangga · kecewa",
        objective: "Kutip 4 kata adjektif PERASAAN dan jawab dua gerbang cerita.",
        targetWords: ["gembira", "sedih", "takut", "marah", "bangga", "kecewa"], requiredWords: 4,
        wordPool: ["gembira", "sedih", "takut", "marah", "bangga", "kecewa", "jauh", "masam", "kasar"],
        gates: [
          { x: 930, title: "Gerbang Hadiah", questions: [
            { prompt: "Aina mendapat hadiah hari jadi. Aina berasa ______.", options: ["gembira", "sedih", "masam"], answer: "gembira", hint: "Bagaimanakah perasaan kamu apabila menerima hadiah?", explain: "Gembira menerangkan perasaan Aina." }
          ]},
          { x: 1630, title: "Pintu Juara", questions: [
            { prompt: "Siti menang pertandingan. Siti berasa ______.", options: ["bangga", "gelap", "jauh"], answer: "bangga", hint: "Siti berjaya dan berasa puas hati dengan usahanya.", explain: "Bangga ialah kata adjektif perasaan." }
          ]}
        ]
      },
      {
        id: "pancaindera", no: 3, title: "Pulau Pancaindera", category: "pancaindera",
        focus: "manis · masam · masin · pahit · harum · busuk · lembut · kasar · terang · gelap · merdu · bising",
        objective: "Kutip 5 kata adjektif PANCAINDERA daripada pulau lima deria.",
        targetWords: ["manis", "masam", "masin", "pahit", "harum", "busuk", "lembut", "kasar", "terang", "gelap", "merdu", "bising"], requiredWords: 5,
        wordPool: ["manis", "masam", "masin", "pahit", "harum", "busuk", "lembut", "kasar", "terang", "gelap", "merdu", "bising", "jauh", "gembira", "takut"],
        gates: [
          { x: 930, title: "Gerbang Bunga", questions: [
            { prompt: "Bunga mawar itu berbau ______.", options: ["harum", "bising", "dekat"], answer: "harum", hint: "Hidung digunakan untuk menghidu bau bunga.", explain: "Harum menerangkan bau yang menyenangkan." }
          ]},
          { x: 1630, title: "Gerbang Bunyi", questions: [
            { prompt: "Bunyi gitar itu sangat ______.", options: ["merdu", "masin", "sedih"], answer: "merdu", hint: "Telinga mendengar bunyi yang menyenangkan.", explain: "Merdu ialah kata adjektif pancaindera yang didengar dengan telinga." }
          ]}
        ]
      },
      {
        id: "master", no: 4, title: "Istana Kata Adjektif", category: "campuran",
        focus: "jarak · perasaan · pancaindera",
        objective: "Kutip 4 kata daripada tiga kategori dan jawab 5 soalan Penjaga Kata.",
        targetWords: ["dekat", "gembira", "harum", "jauh", "sedih", "masam"], requiredWords: 4,
        wordPool: ["dekat", "gembira", "harum", "jauh", "sedih", "masam", "rapat", "takut", "merdu"],
        gates: [
          { x: 1500, title: "Penjaga Kata", questions: [
            { prompt: "Rumah itu tidak jauh dari sekolah. Rumah itu ______.", options: ["dekat", "masin", "sedih"], answer: "dekat", hint: "Fikirkan jarak rumah dengan sekolah.", explain: "Dekat menerangkan jarak yang kecil." },
            { prompt: "Ali menerima hadiah. Ali berasa ______.", options: ["gembira", "pahit", "jauh"], answer: "gembira", hint: "Hadiah biasanya membuat seseorang berasa senang hati.", explain: "Gembira ialah kata adjektif perasaan." },
            { prompt: "Limau itu rasanya ______.", options: ["masam", "harum", "rapat"], answer: "masam", hint: "Lidah digunakan untuk merasa limau.", explain: "Masam ialah kata adjektif pancaindera." },
            { prompt: "Batu itu terasa ______ apabila disentuh.", options: ["kasar", "gembira", "hampir"], answer: "kasar", hint: "Kulit dapat merasa permukaan batu.", explain: "Kasar menerangkan deria sentuh." },
            { prompt: "Bunyi muzik itu sangat ______.", options: ["merdu", "jauh", "takut"], answer: "merdu", hint: "Telinga mendengar muzik yang menyenangkan.", explain: "Merdu menerangkan bunyi yang enak didengar." }
          ]}
        ]
      }
    ],
    worldWidth: 2050,
    xpPerWord: 10,
    xpPerQuestion: 10,
    xpForCheckpoint: 8,
    xpForLevel: 30,
    xpForGoldenWord: 20,
    tokenComboBonus: 20
  },

  /* ---------- PANDANGAN GURU (data contoh) ---------- */
  KELAS: {
    purata: { jarak: 86, perasaan: 74, pancaindera: 91 },
    murid: [
      { nama: "Aisyah", jarak: 95, perasaan: 80, pancaindera: 95 },
      { nama: "Farid", jarak: 75, perasaan: 70, pancaindera: 80 },
      { nama: "Mei Ling", jarak: 85, perasaan: 75, pancaindera: 90 },
      { nama: "Adam", jarak: 90, perasaan: 85, pancaindera: 92 },
      { nama: "Sara", jarak: 85, perasaan: 60, pancaindera: 98 }
    ],
    nota: "Data kelas ini ialah contoh untuk demonstrasi. Dalam penggunaan sebenar, setiap peranti murid menyimpan kemajuannya dan guru boleh merumuskan skor secara berkala."
  },

  ADDIE: [
    { fasa: "A — Analisis", teks: "Keperluan murid Tahun 3 dikenal pasti melalui DSKP (SK 5.1, SP 5.1.3): murid perlu memahami dan menggunakan kata adjektif jarak, perasaan dan pancaindera mengikut konteks. Kesukaran biasa murid ialah membezakan jenis kata adjektif dalam ayat." },
    { fasa: "D — Reka Bentuk", teks: "Pengalaman pembelajaran dirancang sebagai satu laluan misi: Explore → Learn → Practice → AR → Challenge → Assessment. 14 skrin papan cerita, sistem warna mengikut kategori, dan gamifikasi ringan (XP, misi, lencana)." },
    { fasa: "P — Pembangunan", teks: "Produk dibangunkan dengan HTML5/CSS/JavaScript tanpa backend: ilustrasi SVG asli, audio sintesis Web Audio, animasi lembut, penjejakan tangan MediaPipe (client-side sahaja), kuiz, maklum balas serta-merta dan penjejakan kemajuan." },
    { fasa: "I — Pelaksanaan", teks: "Berfungsi pada telefon, tablet, laptop, desktop dan papan pintar tanpa pemasangan. Kemajuan murid disimpan setempat (localStorage). Kamera hanya diminta apabila ciri AR dibuka, dengan mod sentuh sebagai gantian." },
    { fasa: "E — Penilaian", teks: "Keberkesanan dinilai melalui instrumen dalam aplikasi (murid/rakan pembelajaran) dan skor pentaksiran per kategori yang memandu tindakan pemulihan (misalnya murid yang lemah dalam kata adjektif perasaan)." }
  ],

  INSTRUMEN: {
    tajuk: "Instrumen Penilaian Produk",
    arahan: "Sila nilai aplikasi ini. 1 = Sangat tidak setuju, 5 = Sangat setuju. Penilaian ini menyokong fasa Penilaian model ADDIE.",
    item: [
      "Kandungan kata adjektif jelas dan mudah difahami.",
      "Aktiviti membantu saya memahami kata adjektif jarak, perasaan dan pancaindera.",
      "Reka bentuk aplikasi menarik dan kemas.",
      "Gabungan gambar, bunyi dan animasi membantu pembelajaran.",
      "Aplikasi mudah digunakan.",
      "Ciri kamera dan gerakan tangan menyeronokkan dan berguna.",
      "Aplikasi sesuai untuk murid pelbagai kebolehan.",
      "Secara keseluruhan, aplikasi ini berkesan untuk pembelajaran."
    ],
    komen: ["Apa yang paling kamu suka tentang aplikasi ini?", "Cadangan penambahbaikan:"],
    label: ["Sangat tidak setuju", "Tidak setuju", "Neutral", "Setuju", "Sangat setuju"]
  }
};
