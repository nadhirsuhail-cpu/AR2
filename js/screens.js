/* ============================================================
   KATA+ AR — PAPARAN (SCREENS)
   14 skrin papan cerita: Splash, Home, Belajar, 3 Modul,
   Latihan, Drag&Drop, AR, Bina Ayat, Cabaran, Keputusan,
   Lencana, Pandangan Guru.
   ============================================================ */
"use strict";

window.Screens = (function () {
  var D = DataApp;

  /* ---------- BAHAGIAN BERSAMA ---------- */
  function kepalaSkrin(kembali, tajuk, sub, chip) {
    var b = kembali
      ? '<a class="btn-belakang" href="' + kembali + '" aria-label="Kembali">' + Ikon.iko("anakPanahKiri", 20) + "</a>"
      : "";
    return '<div class="kepala-skrin">' + b +
      '<div class="kepala-skrin-teks"><h1>' + tajuk + "</h1>" +
      (chip ? '<div style="margin-top:10px">' + chip + "</div>" : "") +
      (sub ? '<p class="sub">' + sub + "</p>" : "") +
      "</div></div>";
  }

  function kaki() {
    return '<footer class="kaki"><div class="kaki-dalam">' +
      '<span class="kaki-tanda">KATA+ AR — Misi Kata Adjektif</span>' +
      '<span class="kaki-kod">Bahasa Melayu Tahun 3 · ' + D.INFO.kssr + " · SK " + D.INFO.sk + " · SP " + D.INFO.sp + "</span>" +
      '<span class="kaki-kod">' + D.INFO.skTeks + " " + D.INFO.spTeks + "</span>" +
      '<span class="kaki-privasi">Privasi: kamera digunakan hanya untuk mengesan pergerakan tangan. Tiada rakaman disimpan. Kemajuan disimpan di peranti ini sahaja.</span>' +
      "</div></footer>";
  }

  /* ---------- 02 HOME ---------- */
  function home() {
    var s = Store.dapat();
    var misiSelesai = Store.misiSelesaiCount();
    var langkah = D.MISI.map(function (m) {
      var selesai = !!s.misi[m.id];
      var seterusnya = !selesai && D.MISI.every(function (x) { return x.no >= m.no || !!s.misi[x.id]; });
      var cls = selesai ? "selesai" : (seterusnya ? "set" : "");
      return '<a class="langkah ' + cls + '" href="' + m.laluan + '">' +
        '<span class="langkah-nombor">' + (selesai ? Ikon.iko("semak", 18) : (m.no < 10 ? "0" + m.no : m.no)) + "</span>" +
        "<h3>" + m.nama + "</h3><p>" + m.pendek + "</p>" +
        '<span class="langkah-status">' +
        (selesai ? Ikon.iko("semakBulat", 14) + "Selesai" : (seterusnya ? Ikon.iko("anakPanahKanan", 14) + "Mula sekarang" : Ikon.iko("kunci", 13) + "Belum dibuka")) +
        "</span></a>";
    }).join("");

    var kad3d = [
      { k: "j", id: "jarak", kata: ["jauh", "dekat", "hampir", "rapat"] },
      { k: "p", id: "perasaan", kata: ["gembira", "sedih", "takut"] },
      { k: "pc", id: "pancaindera", kata: ["manis", "harum", "merdu"] }
    ].map(function (x) {
      var kat = D.KATEGORI[x.id];
      return '<div class="kad-3d ' + x.k + ' terapung buka" role="img" aria-label="Kategori ' + kat.label + '">' +
        '<div class="kad-3d-kepala"><span class="gelembung">' + Ikon.iko(kat.ikon, 20) + "</span><h3>" + kat.label.toUpperCase() + "</h3></div>" +
        "<p>" + kat.desc + "</p>" +
        '<div class="kad-3d-kata">' + x.kata.map(function (w) { return '<span class="kata-kecil">' + w + "</span>"; }).join("") +
        "</div></div>";
    }).join("");

    var kadKat = ["jarak", "perasaan", "pancaindera"].map(function (id) {
      var k = D.KATEGORI[id];
      var selesai = !!s.modul[id];
      return '<a class="kad kad-klik kad-kat ' + id + ' buka" href="#/modul/' + id + '">' +
        '<span class="kad-kat-iko">' + Ikon.iko(k.ikon, 26) + "</span>" +
        "<h3>" + k.label + "</h3><p>" + k.desc + "</p>" +
        '<div class="kad-kat-kata">' + k.kata.slice(0, 4).map(function (w) { return '<span class="kata-kecil">' + w + "</span>"; }).join("") + "</div>" +
        '<span class="kad-kat-status">' + (selesai ? Ikon.iko("semakBulat", 16) + "Selesai" : Ikon.iko("anakPanahKanan", 15) + "Mula belajar") + "</span></a>";
    }).join("");

    return {
      html:
        '<section class="hero" aria-label="Pengenalan">' +
        '<div class="hero-latar" aria-hidden="true"></div>' +
        '<span class="hero-eyebrow">' + Ikon.iko("kilau", 15) + " Bahasa Melayu · Tahun 3 · KSSR</span>" +
        '<h1 class="hero-h1">KATA+ <em>AR</em></h1>' +
        '<p class="hero-nama">Misi Kata Adjektif</p>' +
        '<p class="hero-tagline">「Kenali. Gerakkan. Pilih. Kuasai kata adjektif.」</p>' +
        '<div class="hero-cta">' +
        '<a class="btn btn-utama btn-lg" href="#/misi">Mulakan Misi ' + Ikon.iko("anakPanahKanan", 19) + "</a>" +
        '<button class="btn btn-ghost btn-lg" data-cara-bermain>Cara Bermain</button>' +
        "</div>" +
        '<div class="hero-pentas">' + kad3d + "</div>" +
        "</section>" +

        '<section class="seksyen" aria-labelledby="j-misi">' +
        '<div class="bekas"><div class="seksyen-kepala">' +
        "<h2 id=\"j-misi\">Perjalanan Misi Kamu</h2>" +
        "<p>" + misiSelesai + " / 5 misi selesai — teruskan memburu kata adjektif!</p>" +
        "</div>" +
        '<div class="laluan-misi">' + langkah + "</div></div></section>" +

        '<section class="seksyen" aria-labelledby="j-kuasa" style="padding-top:0">' +
        '<div class="bekas"><div class="seksyen-kepala">' +
        '<h2 id="j-kuasa">Tiga Kuasa Kata</h2>' +
        "<p>Tiga jenis kata adjektif yang akan kamu kuasai dalam misi ini.</p>" +
        "</div>" +
        '<div class="grid grid-3">' + kadKat + "</div></div></section>" +
        kaki(),
      init: function () {
        UI.lekatParalaks();
        document.querySelector("[data-cara-bermain]").addEventListener("click", function () {
          Screens.caraBermainModal();
        });
      }
    };
  }

  /* ---------- MODAL CARA BERMAIN ---------- */
  function caraBermainModal() {
    var gerak = D.GERAK.map(function (g) {
      return '<div class="gerak-item"><span class="gerak-iko">' + Ikon.iko(g.ikon, 30) + "</span>" +
        "<div><b>" + g.nama + "</b><span>" + g.desc + "</span></div></div>";
    }).join("");
    var misi = D.MISI.map(function (m) {
      return "<b>Misi " + (m.no < 10 ? "0" + m.no : m.no) + " — " + m.nama + "</b>: " + m.pendek;
    }).join("</p><p>");
    UI.modal(
      '<div class="modal-kepala"><h2>Cara Bermain</h2>' +
      '<button class="modal-tutup" data-tutup-modal aria-label="Tutup">' + Ikon.iko("silang", 18) + "</button></div>" +
      '<div class="modal-badan">' +
      "<h3>Perjalanan Kamu</h3><p>" + misi + "</p>" +
      "<h3>Gerakan Tangan (KATA+ AR)</h3>" +
      '<p>Dalam Misi 03, kamera mengesan tangan kamu. Gerakan ini boleh digunakan — dan kamu sentiasa boleh mengetik skrin sebagai gantian.</p>' +
      '<div class="gerak-senarai">' + gerak + "</div>" +
      "<h3>Petua</h3>" +
      "<p>1. Jawab perlahan-lahan — tiada had masa dalam misi ini.<br>" +
      "2. Salah jawapan tidak mengapa. Petunjuk akan membantu kamu.<br>" +
      "3. Kumpul XP dan lencana untuk menjadi Master Kata Adjektif.</p>" +
      "<h3>Privasi</h3>" +
      "<p>" + D.INFO.privasiPenuh + "</p>" +
      "</div>"
    );
  }

  /* ---------- ONBOARDING ---------- */
  var obLangkah = 0;

  function onboardingBuka() {
    obLangkah = 0;
    var ob = document.getElementById("onboard");
    ob.hidden = false;
    if (!ob.__berwayar) {
      ob.__berwayar = true;
      ob.addEventListener("click", function (e) {
        var b = e.target.closest("[data-ob-seterusnya]");
        if (b) { obLangkah++; obOnboarding(ob); AudioMesin.klik(); return; }
        var l = e.target.closest("[data-ob-lewati]");
        if (l) { obTutup(); AudioMesin.klik(); return; }
        var m = e.target.closest("[data-ob-mula]");
        if (m) { AudioMesin.berjaya(); obTutup(); }
      });
    }
    obOnboarding(ob);
  }

  function obOnboarding(ob) {
    var s = Store.dapat();
    if (obLangkah === 0) {
      ob.innerHTML = '<div class="ob-kandungan"><div class="ob-langkah">' +
        '<h2>Hai, Penjelajah Kata!</h2>' +
        "<p>Selamat datang ke dunia kata adjektif.</p>" +
        '<div class="ob-kat">' + obKatKad(0) + obKatKad(1) + obKatKad(2) + "</div>" +
        '<div class="ob-dots"><i class="aktif"></i><i></i><i></i></div>' +
        '<div class="ob-aksi"><button class="btn btn-utama btn-lg" data-ob-seterusnya>Seterusnya ' + Ikon.iko("anakPanahKanan", 18) + "</button></div>" +
        '<button class="ob-lewati" data-ob-lewati>Lewati</button>' +
        "</div></div>";
    } else if (obLangkah === 1) {
      ob.innerHTML = '<div class="ob-kandungan"><div class="ob-langkah">' +
        '<h2>Hari ini kita akan memburu kata adjektif.</h2>' +
        "<p>Kata adjektif menerangkan sesuatu — jarak, perasaan dan deria kita.</p>" +
        '<div class="ob-dots"><i></i><i class="aktif"></i><i></i></div>' +
        '<div class="ob-aksi"><button class="btn btn-utama btn-lg" data-ob-seterusnya>Seterusnya ' + Ikon.iko("anakPanahKanan", 18) + "</button></div>" +
        '<button class="ob-lewati" data-ob-lewati>Lewati</button>' +
        "</div></div>";
    } else {
      ob.innerHTML = '<div class="ob-kandungan"><div class="ob-langkah">' +
        '<h2>Tiga kuasa kata menanti kamu.</h2>' +
        "<p>Kenali setiap kategori, selesaikan misi, dan kumpul lencana!</p>" +
        '<div class="ob-kat">' + obKatKad(0) + obKatKad(1) + obKatKad(2) + "</div>" +
        '<div class="ob-dots"><i></i><i></i><i class="aktif"></i></div>' +
        '<div class="ob-aksi"><button class="btn btn-utama btn-lg" data-ob-mula>Jom Mula ' + Ikon.iko("play", 18) + "</button></div>" +
        "</div></div>";
    }
  }

  function obKatKad(i) {
    var ids = ["jarak", "perasaan", "pancaindera"];
    var k = D.KATEGORI[ids[i]];
    return '<div class="ob-kat-kad" style="animation-delay:' + (i * 0.14) + 's">' +
      '<span class="gelembung" style="background:var(--' + ids[i] + ')">' + Ikon.iko(k.ikon, 23) + "</span>" +
      "<b>" + k.label.toUpperCase() + "</b><span>" + k.desc + "</span></div>";
  }

  function obTutup() {
    var s = Store.dapat();
    s.onboarded = true;
    Store.simpan();
    var ob = document.getElementById("onboard");
    ob.hidden = true;
  }

  /* ---------- 03 BELAJAR (papan pemuka) ---------- */
  function belajar() {
    var s = Store.dapat();
    var kad = ["jarak", "perasaan", "pancaindera"].map(function (id) {
      var k = D.KATEGORI[id];
      var selesai = !!s.modul[id];
      var pct = Store.peratusKat(id);
      return '<a class="kad kad-klik kad-kat ' + id + ' buka" href="#/modul/' + id + '">' +
        '<span class="kad-kat-iko">' + Ikon.iko(k.ikon, 26) + "</span>" +
        "<h3>" + k.label + "</h3><p>" + k.desc + "</p>" +
        '<div class="kad-kat-kata">' + k.kata.map(function (w) { return '<span class="kata-kecil">' + w + "</span>"; }).join("") + "</div>" +
        '<span class="kad-kat-status">' +
        (selesai ? Ikon.iko("semakBulat", 16) + "Selesai · ketepatan " + (pct === null ? "—" : pct + "%") : Ikon.iko("play", 15) + "Mula belajar") +
        "</span></a>";
    }).join("");

    return {
      html: '<div class="bekas">' +
        kepalaSkrin("", "Belajar", "Kenali tiga jenis kata adjektif mengikut konteks. Selesaikan ketiga-tiga modul untuk membuka Misi 01.", "") +
        '<div class="grid grid-3">' + kad + "</div>" +
        '<div class="kad panel-info" style="margin-top:22px">' +
        "<h3>" + Ikon.iko("buku", 20) + " Info Kurikulum</h3>" +
        "<p><strong>Standard Kandungan " + D.INFO.sk + ":</strong> " + D.INFO.skTeks + "</p>" +
        "<p><strong>Standard Pembelajaran " + D.INFO.sp + ":</strong> " + D.INFO.spTeks + "</p>" +
        '<p style="margin-bottom:0">' + D.INFO.kssr + "</p></div>" +
        "</div>",
      init: null
    };
  }

  /* ---------- 04–06 MODUL ---------- */
  function modul(id) {
    var k = D.KATEGORI[id];
    var m = D.MODUL[id];
    var s = Store.dapat();
    return {
      html: '<div class="bekas bekas-sempit">' +
        kepalaSkrin("#/belajar", m.tajuk, m.intro, UI.chipKategori(id)) +
        '<div class="jalur" aria-hidden="true"><div class="jalur-dalam" id="modul-jalur" style="width:4%"></div></div>' +
        '<div id="modul-kandungan" style="margin-top:24px"></div>' +
        "</div>",
      init: function () {
        Modul.init(id);
      }
    };
  }

  /* ---------- MISI HUB ---------- */
  function misi() {
    var s = Store.dapat();
    var n = Store.misiSelesaiCount();
    var senarai = D.MISI.map(function (m) {
      var selesai = !!s.misi[m.id];
      var seterusnya = !selesai && D.MISI.every(function (x) { return x.no >= m.no || !!s.misi[x.id]; });
      var cls = "kad-misi" + (selesai ? " selesai" : "") + (seterusnya ? " seterusnya" : "");
      return '<a class="' + cls + '" href="' + m.laluan + '">' +
        '<span class="misi-nombro">' + (selesai ? Ikon.iko("semak", 22) : (m.no < 10 ? "0" + m.no : m.no)) + "</span>" +
        '<div class="misi-meta"><h3>' + m.nama +
        (selesai ? '<span class="misi-tag selesai">Selesai</span>' : "") +
        (seterusnya ? '<span class="misi-tag set">Seterusnya</span>' : "") +
        '<span class="misi-tag xp">+' + m.xp + " XP</span></h3>" +
        "<p>" + m.pendek + "</p></div>" +
        '<span class="misi-panah">' + Ikon.iko("chevronKanan", 22) + "</span></a>";
    }).join("");

    return {
      html: '<div class="bekas bekas-sempit">' +
        kepalaSkrin("", "Misi", "Lima misi menanti. Selesaikan satu demi satu untuk menjadi Master Kata Adjektif.", "") +
        '<div class="kad" style="padding:18px 24px;margin-bottom:22px">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">' +
        '<strong>' + n + " / 5 Misi Selesai</strong>" +
        '<span style="font-size:13.5px;color:var(--dakwat3);font-weight:700">' + Math.round((n / 5) * 100) + "%</span></div>" +
        '<div class="jalur"><div class="jalur-dalam" style="width:' + (n / 5) * 100 + '%"></div></div></div>' +
        '<a class="adventure-launch" href="#/adventure"><span class="adventure-launch-art" aria-hidden="true">' + Ikon.iko("sasaran", 36) + '</span><span class="adventure-launch-copy"><span class="adventure-kicker">KATA+ ADVENTURE</span><strong>Teroka dunia kata adjektif</strong><span>Bergerak, melompat, kumpul kata dan buka Cabaran AR.</span></span><span class="adventure-launch-cta">Main ' + Ikon.iko("anakPanahKanan", 18) + '</span></a>' +
        '<div class="misi-senarai">' + senarai + "</div>" +
        "</div>",
      init: null
    };
  }

  /* ---------- PEMBUNGKUS AKTIVITI ---------- */
  function sentuhPilih() {
    return {
      html: '<div class="bekas bekas-sempit">' +
        kepalaSkrin("#/misi", "Misi 02 — Sentuh & Pilih", "Sentuh jawapan yang paling tepat. Lihat gambar, baca cerita, kemudian pilih kata adjektif yang betul.", UI.chipKategori("jarak")) +
        '<div id="sentuh-kandungan"></div></div>',
      init: function () { Aktiviti.sentuh(); }
    };
  }

  function ar() {
    var adv = Store.dapat().adventure;
    var cabaran = adv.pendingAr && DataApp.ADVENTURE.levels.filter(function (l) { return l.id === adv.pendingAr; })[0];
    var tajuk = cabaran ? "Cabaran AR — " + cabaran.title : "Misi 03 — Gerakkan Tangan";
    var penerangan = cabaran
      ? "Level selesai! Lengkapkan cabaran AR ini untuk membuka level Adventure seterusnya."
      : "KATA+ AR: gunakan kamera dan gerakan tangan untuk menangkap kata adjektif. Tiada rakaman disimpan.";
    return {
      html: '<div class="bekas ar-bekas">' +
        kepalaSkrin("#/" + (cabaran ? "adventure" : "misi"), tajuk, penerangan, UI.chipKategori(cabaran ? (cabaran.category === "campuran" ? "jarak" : cabaran.category) : "pancaindera")) +
        '<div id="ar-kandungan"></div></div>',
      init: function () { Ar.buka(); }
    };
  }

  function binaAyat() {
    return {
      html: '<div class="bekas bekas-sempit">' +
        kepalaSkrin("#/misi", "Misi 04 — Bina Ayat", "Dua aktiviti: masukkan kata ke tempatnya, kemudian lengkapkan ayat.", UI.chipKategori("perasaan")) +
        '<div id="bina-kandungan"></div></div>',
      init: function () { Aktiviti.binaAyat(); }
    };
  }

  function cabaran() {
    return {
      html: '<div class="bekas bekas-sempit">' +
        kepalaSkrin("#/misi", "Misi 05 — Cabaran Akhir", "10 soalan yang menggabungkan semua jenis kata adjektif. Tiada had masa — jawab dengan tenang.", "") +
        '<div id="kuiz-kandungan"></div></div>',
      init: function () { Kuiz.buka(); }
    };
  }

  function adventure() {
    return {
      html: '<div class="bekas adventure-wrap"><div id="adventure-root"></div></div>',
      init: function () { Adventure.mount(); }
    };
  }

  /* ---------- 12 SKOR ---------- */
  function skor() {
    var s = Store.dapat();
    var n = Store.misiSelesaiCount();
    var pJ = Store.peratusKat("jarak");
    var pP = Store.peratusKat("perasaan");
    var pC = Store.peratusKat("pancaindera");
    var jumBetul = s.stat.jarak.betul + s.stat.perasaan.betul + s.stat.pancaindera.betul;
    var jumSemua = s.stat.jarak.jumlah + s.stat.perasaan.jumlah + s.stat.pancaindera.jumlah;

    function baris(id, label, pct) {
      return '<div class="baris-kat">' +
        '<div class="kat-nama"><span>' + UI.ikonKategori(id, 17) + label + "</span><span>" +
        (pct === null ? "Belum dinilai" : pct + "% · " + s.stat[id].betul + "/" + s.stat[id].jumlah + " betul") + "</span></div>" +
        '<div class="jalur kat-' + id + '"><div class="jalur-dalam" style="width:' + (pct === null ? 0 : pct) + '%"></div></div></div>';
    }

    return {
      html: '<div class="bekas">' +
        kepalaSkrin("", "Skor", "Papan pemuka kemajuan kamu. Teruskan berlatih untuk menguasai ketiga-tiga jenis kata adjektif.", "") +
        '<div class="kad papan-kepala">' +
        '<div class="papan-xp"><b>' + s.xp + "</b><span>XP</span></div>" +
        '<div class="papan-intro"><h2>' + Store.tahap() + "</h2>" +
        "<p>Kumpul XP dengan menyelesaikan modul dan misi.</p>" +
        '<span class="tahap">' + Ikon.iko("kilat", 15) + " " + s.xp + " XP terkumpul</span></div></div>" +
        '<div class="grid-stats">' +
        '<div class="kad kad-stat"><span class="stat-label">' + Ikon.iko("sasaran", 15) + ' Misi selesai</span><span class="stat-nombor">' + n + '/5</span></div>' +
        '<div class="kad kad-stat"><span class="stat-label">' + Ikon.iko("trofi", 15) + ' Kuiz terbaik</span><span class="stat-nombor">' + (s.kuizTerbaik > 0 ? s.kuizTerbaik + '%' : '—') + '</span></div>' +
        '<div class="kad kad-stat"><span class="stat-label">' + Ikon.iko("pingat", 15) + ' Lencana</span><span class="stat-nombor">' + s.lencana.length + '/4</span></div>' +
        '<div class="kad kad-stat"><span class="stat-label">' + Ikon.iko("semakBulat", 15) + ' Jawapan betul</span><span class="stat-nombor">' + jumBetul + (jumSemua ? '/' + jumSemua : '') + '</span></div>' +
        "</div>" +
        '<div class="kad" style="padding:24px 28px;margin-top:18px"><h3 style="margin:0 0 6px;font-size:19px;font-weight:800">Penguasaan Kategori</h3>' +
        '<p style="margin:0 0 4px;color:var(--dakwat2);font-size:14.5px">Kategori yang sering salah akan disenaraikan untuk latihan tambahan.</p>' +
        baris("jarak", "Jarak", pJ) + baris("perasaan", "Perasaan", pP) + baris("pancaindera", "Pancaindera", pC) +
        "</div>" +
        '<div class="papan-aksi">' +
        '<a class="btn btn-utama" href="#/lencana">' + Ikon.iko("pingat", 18) + " Koleksi Lencana</a>" +
        '<a class="btn btn-ghost" href="#/guru">' + Ikon.iko("pengguna", 18) + " Pandangan Guru</a>" +
        '<button class="btn btn-ghost" data-cetak>' + Ikon.iko("pencetak", 18) + " Cetak Laporan</button>" +
        "</div></div>",
      init: function () {
        document.querySelector("[data-cetak]").addEventListener("click", function () { window.print(); });
      }
    };
  }

  /* ---------- 13 LENCANA ---------- */
  function lencana() {
    var s = Store.dapat();
    var kad = D.LENCANA.map(function (l) {
      var ada = s.lencana.indexOf(l.id) !== -1;
      return '<div class="kad kad-lencana ' + (ada ? "dibuka" : "terkunci") + '">' +
        '<div class="lencana-iko ' + l.kelas + '">' + Ikon.iko(ada ? l.ikon : "kunci", 38) + "</div>" +
        "<h3>" + l.nama + "</h3><p>" + l.desc + "</p>" +
        '<span class="lencana-syarat">' + (ada ? "Dibuka" : l.syarat) + "</span></div>";
    }).join("");

    return {
      html: '<div class="bekas">' +
        kepalaSkrin("#/skor", "Koleksi Lencana", "Setiap lencana menandakan kemahiran baharu yang kamu kuasai.", "") +
        '<div class="galeri-lencana">' + kad + "</div></div>",
      init: null
    };
  }

  /* ---------- 14 PANDANGAN GURU ---------- */
  function guru() {
    var K = D.KELAS;
    var s = Store.dapat();

    var maxV = 100, w = 46, h = 180;
    function palang(ket, val, warna) {
      var tinggi = Math.round((val / maxV) * h);
      return '<div style="display:flex;flex-direction:column;align-items:center;gap:8px">' +
        '<span style="font-weight:800;font-size:15px">' + val + "%</span>" +
        '<svg width="' + w + '" height="' + h + '" role="img" aria-label="' + ket + " " + val + '%">' +
        '<rect x="0" y="' + (h - tinggi) + '" width="' + w + '" height="' + tinggi + '" rx="10" fill="' + warna + '"/>' +
        '<rect x="0" y="' + (h - tinggi) + '" width="' + w + '" height="' + tinggi + '" rx="10" fill="rgba(23,24,28,0.08)"/>' +
        "</svg>" +
        '<span style="font-weight:700;font-size:13.5px">' + ket + "</span></div>";
    }

    var jadual = K.murid.map(function (m) {
      var purata = Math.round((m.jarak + m.perasaan + m.pancaindera) / 3);
      return "<tr><td><strong>" + m.nama + "</strong></td>" +
        '<td class="angka">' + m.jarak + "%</td>" +
        '<td class="angka ' + (m.perasaan < 75 ? "low" : "") + '">' + m.perasaan + "%</td>" +
        '<td class="angka">' + m.pancaindera + "%</td>" +
        '<td class="angka"><strong>' + purata + "%</strong></td></tr>";
    }).join("");

    var addie = D.ADDIE.map(function (f) {
      return '<div class="fasa"><b>' + f.fasa + "</b><span>" + f.teks + "</span></div>";
    }).join("");

    var n = Store.misiSelesaiCount();
    var item = D.INSTRUMEN.item.map(function (t, i) {
      return '<div class="instrumen-item"><div class="item-teks">' + (i + 1) + ". " + t + "</div>" +
        '<div class="skala-likert" role="radiogroup" aria-label="Item ' + (i + 1) + '">' +
        [1, 2, 3, 4, 5].map(function (v) {
          var aktif = s.instrumen.item[i] === v;
          return '<button type="button" data-likert="' + i + ":" + v + '" class="' + (aktif ? "aktif" : "") + '" role="radio" aria-checked="' + aktif + '" aria-label="' + v + '">' + v + "</button>";
        }).join("") +
        "</div>" +
        '<div class="skala-label"><span>' + D.INSTRUMEN.label[0] + "</span><span>" + D.INSTRUMEN.label[4] + "</span></div></div>";
    }).join("");

    var komen = D.INSTRUMEN.komen.map(function (t, i) {
      return '<div class="instrumen-item"><div class="item-teks">' + t + "</div>" +
        '<textarea rows="2" style="width:100%;border:1.5px solid var(--garis);border-radius:12px;padding:12px 14px;font:inherit;font-size:15px;resize:vertical" data-komen="' + i + '" placeholder="Tulis jawapan di sini...">' + UI.esc(s.instrumen.komen[i] || "") + "</textarea></div>";
    }).join("");

    return {
      html: '<div class="bekas">' +
        kepalaSkrin("#/skor", "Pandangan Guru", "Prestasi kelas, maklumat kurikulum dan instrumen penilaian produk.", "") +

        '<div class="kad" style="padding:28px 30px">' +
        '<h3 style="margin:0 0 4px;font-size:20px;font-weight:800">' + Ikon.iko("carta", 20) + " Prestasi Kelas</h3>" +
        '<p style="margin:0 0 22px;color:var(--dakwat2);font-size:14.5px">Purata markah kelas mengikut kategori (data contoh).</p>' +
        '<div style="display:flex;gap:34px;justify-content:center;flex-wrap:wrap">' +
        palang("Jarak", K.purata.jarak, "var(--jarak)") +
        palang("Perasaan", K.purata.perasaan, "var(--perasaan)") +
        palang("Pancaindera", K.purata.pancaindera, "var(--pancaindera)") +
        "</div></div>" +

        '<div class="kad panel-info">' +
        "<h3>" + Ikon.iko("pengguna", 20) + " Murid Kelas</h3>" +
        '<div class="jadual-bekas"><table class="jadual"><thead><tr>' +
        "<th>Nama</th><th>Jarak</th><th>Perasaan</th><th>Pancaindera</th><th>Purata</th></tr></thead>" +
        "<tbody>" + jadual + "</tbody></table></div>" +
        '<p style="margin:14px 0 0;font-size:13.5px">' + K.nota + "</p></div>" +

        '<div class="kad panel-info">' +
        "<h3>" + Ikon.iko("kilat", 20) + " Prestasi Peranti Ini</h3>" +
        "<p>Misi selesai: <strong>" + n + "/5</strong> · XP: <strong>" + s.xp + "</strong> · Kuiz terbaik: <strong>" + (s.kuizTerbaik > 0 ? s.kuizTerbaik + "%" : "—") + "</strong> · Lencana: <strong>" + s.lencana.length + "/4</strong></p>" +
        '<p style="margin-bottom:0">Ketepatan — Jarak: <strong>' + (Store.peratusKat("jarak") === null ? "—" : Store.peratusKat("jarak") + "%") + "</strong> · Perasaan: <strong>" + (Store.peratusKat("perasaan") === null ? "—" : Store.peratusKat("perasaan") + "%") + "</strong> · Pancaindera: <strong>" + (Store.peratusKat("pancaindera") === null ? "—" : Store.peratusKat("pancaindera") + "%") + "</strong></p></div>" +

        '<div class="kad panel-info">' +
        "<h3>" + Ikon.iko("buku", 20) + " Kurikulum & Model ADDIE</h3>" +
        "<p><strong>SK " + D.INFO.sk + ":</strong> " + D.INFO.skTeks + "</p>" +
        "<p><strong>SP " + D.INFO.sp + ":</strong> " + D.INFO.spTeks + "</p>" +
        '<div class="addie">' + addie + "</div></div>" +

        '<div class="kad panel-info">' +
        "<h3>" + Ikon.iko("pensel", 20) + " " + D.INSTRUMEN.tajuk + "</h3>" +
        "<p>" + D.INSTRUMEN.arahan + " Borang ini boleh diisi oleh rakan pembelajaran (sekurang-kurangnya 15 orang) dan dicetak untuk analisis.</p>" +
        item + komen +
        '<div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:18px">' +
        '<button class="btn btn-utama" data-simpan-instrumen>' + Ikon.iko("semak", 18) + " Simpan Penilaian</button>" +
        '<button class="btn btn-ghost" data-cetak-instrumen>' + Ikon.iko("pencetak", 18) + " Cetak Borang</button></div></div>" +
        "</div>",
      init: function () {
        document.querySelector("[data-cetak-instrumen]").addEventListener("click", function () { window.print(); });
        document.querySelector("[data-simpan-instrumen]").addEventListener("click", function () {
          var st = Store.dapat();
          UI.semua("[data-komen]").forEach(function (t) {
            st.instrumen.komen[parseInt(t.getAttribute("data-komen"), 10)] = t.value;
          });
          Store.simpan();
          UI.toast("Penilaian disimpan di peranti ini", "berjaya", "semakBulat");
        });
        document.addEventListener("click", onLikert);
      }
    };
  }

  function onLikert(e) {
    var t = e.target.closest("[data-likert]");
    if (!t) return;
    var b = t.getAttribute("data-likert").split(":");
    var i = parseInt(b[0], 10), v = parseInt(b[1], 10);
    var st = Store.dapat();
    st.instrumen.item[i] = v;
    Store.simpan();
    UI.semua('[data-likert^="' + i + ':"]').forEach(function (x) {
      x.classList.toggle("aktif", x.getAttribute("data-likert") === i + ":" + v);
      x.setAttribute("aria-checked", String(x.getAttribute("data-likert") === i + ":" + v));
    });
    AudioMesin.klik();
  }

  /* Wajib keluar semula dari pandangan guru */
  document.addEventListener("hashchange", function () {
    document.removeEventListener("click", onLikert);
  });

  return {
    home: home, belajar: belajar, modul: modul,
    misi: misi, sentuhPilih: sentuhPilih, ar: ar,
    binaAyat: binaAyat, cabaran: cabaran, adventure: adventure,
    skor: skor, lencana: lencana, guru: guru,
    onboardingBuka: onboardingBuka, obOnboarding: obOnboarding,
    obTutup: obTutup, caraBermainModal: caraBermainModal,
    kepalaSkrin: kepalaSkrin, kaki: kaki
  };
})();
