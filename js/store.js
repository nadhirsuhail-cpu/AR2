/* ============================================================
   KATA+ AR — SIMPANAN KEMAJUAN (localStorage)
   Kemajuan murid kekal walaupun halaman dimuat semula.
   Semua capaian storan dibungkus dengan try/catch kerana
   sesetengah pelayar menyekat localStorage pada file://.
   ============================================================ */
"use strict";

window.Store = (function () {
  var KUNCI = "kataar-v1";

  var asal = {
    v: 1,
    onboarded: false,
    sound: true,
    a11y: { saiz: 0, disleksia: false, kontras: false, noanim: false },
    xp: 0,
    modul: { jarak: false, perasaan: false, pancaindera: false },
    misi: { m1: false, m2: false, m3: false, m4: false, m5: false },
    lencana: [],
    stat: {
      jarak: { betul: 0, jumlah: 0 },
      perasaan: { betul: 0, jumlah: 0 },
      pancaindera: { betul: 0, jumlah: 0 }
    },
    kuizTerbaik: 0,
    kuizTerakhir: null,
    arPernah: false,
    arKamera: false,
    adventure: {
      xp: 0, tokens: 0, totalCorrect: 0, totalWrong: 0, pendingAr: null, badges: [],
      stars: { jarak: 0, perasaan: 0, pancaindera: 0, master: 0 },
      levelDone: { jarak: false, perasaan: false, pancaindera: false, master: false },
      arUnlocked: { jarak: false, perasaan: false, pancaindera: false, master: false },
      arDone: { jarak: false, perasaan: false, pancaindera: false, master: false },
      progress: {
        jarak: { checkpointX: 55, collected: [], tokenIds: [], gatesOpen: [], questionsDone: [], firstTryCorrect: 0, wrongAttempts: 0, goldenClaimed: false, xpThisLevel: 0, shields: 0, tokenComboAwarded: false },
        perasaan: { checkpointX: 55, collected: [], tokenIds: [], gatesOpen: [], questionsDone: [], firstTryCorrect: 0, wrongAttempts: 0, goldenClaimed: false, xpThisLevel: 0, shields: 0, tokenComboAwarded: false },
        pancaindera: { checkpointX: 55, collected: [], tokenIds: [], gatesOpen: [], questionsDone: [], firstTryCorrect: 0, wrongAttempts: 0, goldenClaimed: false, xpThisLevel: 0, shields: 0, tokenComboAwarded: false },
        master: { checkpointX: 55, collected: [], tokenIds: [], gatesOpen: [], questionsDone: [], firstTryCorrect: 0, wrongAttempts: 0, goldenClaimed: false, xpThisLevel: 0, shields: 0, tokenComboAwarded: false }
      }
    },
    instrumen: { item: {}, komen: ["", ""] }
  };

  var st = null;

  function salin(o) { return JSON.parse(JSON.stringify(o)); }

  function muat() {
    try {
      var mentah = localStorage.getItem(KUNCI);
      var s = mentah ? JSON.parse(mentah) : null;
      st = Object.assign({}, salin(asal), s || {});
      st.a11y = Object.assign({}, salin(asal.a11y), (s && s.a11y) || {});
      st.modul = Object.assign({}, salin(asal.modul), (s && s.modul) || {});
      st.misi = Object.assign({}, salin(asal.misi), (s && s.misi) || {});
      st.stat = Object.assign({}, salin(asal.stat), (s && s.stat) || {});
      st.instrumen = Object.assign({}, salin(asal.instrumen), (s && s.instrumen) || {});
      var advTersimpan = (s && s.adventure) || {};
      st.adventure = Object.assign({}, salin(asal.adventure), advTersimpan);
      ["stars", "levelDone", "arUnlocked", "arDone"].forEach(function (k) {
        st.adventure[k] = Object.assign({}, salin(asal.adventure[k]), advTersimpan[k] || {});
      });
      st.adventure.progress = Object.assign({}, salin(asal.adventure.progress), advTersimpan.progress || {});
      Object.keys(asal.adventure.progress).forEach(function (id) {
        st.adventure.progress[id] = Object.assign({}, salin(asal.adventure.progress[id]), (advTersimpan.progress && advTersimpan.progress[id]) || {});
      });
    } catch (e) {
      st = salin(asal);
    }
    return st;
  }

  function simpan() {
    try { localStorage.setItem(KUNCI, JSON.stringify(st)); } catch (e) { /* storan disekat */ }
  }

  function dapat() { return st || muat(); }

  function set(kunci, nilai) {
    var s = dapat();
    s[kunci] = nilai;
    simpan();
  }

  /* ---------- XP & TAHAP ---------- */
  function tambahXp(n) {
    var s = dapat();
    s.xp += n;
    simpan();
    return s.xp;
  }

  function tahap() {
    var s = dapat();
    var nama = "Penjelajah Kata";
    for (var i = 0; i < DataApp.TAHAP.length; i++) {
      if (s.xp >= DataApp.TAHAP[i].min) nama = DataApp.TAHAP[i].nama;
    }
    return nama;
  }

  /* ---------- STATISTIK PER KATEGORI ---------- */
  function catatStat(kategori, betul) {
    var s = dapat();
    if (!s.stat[kategori]) return;
    s.stat[kategori].jumlah += 1;
    if (betul) s.stat[kategori].betul += 1;
    simpan();
  }

  function peratusKat(kategori) {
    var s = dapat();
    var stt = s.stat[kategori];
    if (!stt || stt.jumlah === 0) return null;
    return Math.round((stt.betul / stt.jumlah) * 100);
  }

  /* ---------- MISI & MODUL ---------- */
  function modulSelesai(id) {
    var s = dapat();
    if (s.modul[id]) return;
    s.modul[id] = true;
    simpan();
    // lencana modul
    var petanya = {
      jarak: "pemerhati-jarak",
      perasaan: "pembaca-perasaan",
      pancaindera: "pakar-pancaindera"
    };
    bukaLencana(petanya[id]);
    // misi 1 selesai apabila ketiga-tiga modul selesai
    if (s.modul.jarak && s.modul.perasaan && s.modul.pancaindera && !s.misi.m1) {
      s.misi.m1 = true;
      s.xp += DataApp.XP.modul;
      simpan();
      semakMaster();
    }
    simpan();
  }

  function misiSelesai(id) {
    var s = dapat();
    if (s.misi[id]) return;
    s.misi[id] = true;
    var xpMap = { m2: DataApp.XP.misi2, m3: DataApp.XP.misi3, m4: DataApp.XP.misi4, m5: DataApp.XP.misi5 };
    tambahXp(xpMap[id] || 0);
    simpan();
    semakMaster();
  }

  function semakMaster() {
    var s = dapat();
    if (s.misi.m1 && s.misi.m2 && s.misi.m3 && s.misi.m4 && s.misi.m5) {
      bukaLencana("master");
    }
  }

  function bukaLencana(id) {
    var s = dapat();
    if (s.lencana.indexOf(id) === -1) {
      s.lencana.push(id);
      simpan();
      return true; // baru dibuka
    }
    return false;
  }

  function misiSelesaiCount() {
    var s = dapat();
    var n = 0;
    for (var k in s.misi) if (s.misi[k]) n++;
    return n;
  }

  /* ---------- LENCANA TERBUKA / TERKUNCI ---------- */
  function adaLencana(id) {
    return dapat().lencana.indexOf(id) !== -1;
  }

  function setSemula() {
    try { localStorage.removeItem(KUNCI); } catch (e) { /* abaikan */ }
    st = salin(asal);
  }

  return {
    muat: muat, simpan: simpan, dapat: dapat, set: set,
    tambahXp: tambahXp, tahap: tahap,
    catatStat: catatStat, peratusKat: peratusKat,
    modulSelesai: modulSelesai, misiSelesai: misiSelesai,
    misiSelesaiCount: misiSelesaiCount,
    bukaLencana: bukaLencana, adaLencana: adaLencana,
    setSemula: setSemula
  };
})();
