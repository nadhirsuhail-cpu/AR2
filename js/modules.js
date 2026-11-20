/* ============================================================
   KATA+ AR — MODUL PEMBELAJARAN
   Modul 01 Jarak · Modul 02 Perasaan · Modul 03 Pancaindera
   Corak: Kenali (interaktif) → Cuba (soalan) → Selesai
   ============================================================ */
"use strict";

window.Modul = (function () {
  var D = DataApp;
  var keadaan = null; // { id, soalanIdx, sudahJawab, salahPercubaan }

  var lencanaMap = {
    jarak: "pemerhati-jarak",
    perasaan: "pembaca-perasaan",
    pancaindera: "pakar-pancaindera"
  };

  function init(id) {
    keadaan = { id: id, soalanIdx: 0 };
    var el = document.getElementById("modul-kandungan");
    if (!el) return;
    el.innerHTML = fasaKenali(id);
    wireKenali(id);
  }

  /* ============================================================
     FASA 1 — KENALI
     ============================================================ */
  function fasaKenali(id) {
    if (id === "jarak") return fasaJarak();
    if (id === "perasaan") return fasaPerasaan();
    return fasaPancaindera();
  }

  function fasaJarak() {
    var m = D.MODUL.jarak;
    var kataChips = m.kataJarak.map(function (k) {
      return '<button class="cip-kata" data-kata-jarak="' + k.kata + '">' + k.kata + "</button>";
    }).join("");
    var aksi = m.aksi.map(function (a) {
      return '<button class="btn btn-ghost btn-sm" data-jarak-aksi="' + a.nilai + '">' + a.label + "</button>";
    }).join("");
    return '<div class="kad visualizer">' +
      "<h3>Gerakkan Objek B</h3>" +
      "<p>Perhatikan perkataan yang sesuai dengan jarak antara Objek A dan Objek B.</p>" +
      '<div class="trek"><span class="objek objek-a" style="--n:0">' + Ikon.iko("rumah", 24) + '<span class="objek-label">Objek A</span></span>' +
      '<span class="objek objek-b" id="objekB">' + Ikon.iko("buku", 24) + '<span class="objek-label">Objek B</span></span></div>' +
      '<input type="range" class="gelangsar" id="gelangsarJarak" min="0" max="100" step="1" value="28" aria-label="Jarak antara Objek A dan Objek B">' +
      '<div class="kata-jarak-pilihan">' + kataChips + "</div>" +
      '<div class="visualizer-aksi">' + aksi + "</div>" +
      '<div class="kawal-soalan"><span class="jurang"></span>' +
      '<button class="btn btn-dengar btn-sm" data-dengar="dekat. Jauh. Hampir. Rapat." aria-label="Dengar sebutan">' + Ikon.iko("pembesarSuara", 17) + " Dengar Kata</button>" +
      '<button class="btn btn-utama" id="btnMulaCuba">' + Ikon.iko("play", 17) + " Cuba Soalan</button></div></div>";
  }

  function wireJarak() {
    var el = document.getElementById("modul-kandungan");
    var slider = document.getElementById("gelangsarJarak");
    var objekB = document.getElementById("objekB");
    var m = D.MODUL.jarak;

    function terapkan(nilai) {
      var trek = el.querySelector(".trek");
      var w = trek.clientWidth - 58;
      objekB.style.left = Math.round((w * nilai) / 100) + "px";
      slider.value = nilai;
      var aktif = "";
      m.kataJarak.forEach(function (k) {
        if (nilai >= k.min && nilai <= k.max) aktif = k.kata;
      });
      el.querySelectorAll("[data-kata-jarak]").forEach(function (b) {
        b.classList.toggle("aktif", b.getAttribute("data-kata-jarak") === aktif);
      });
    }

    slider.addEventListener("input", function () { terapkan(parseInt(slider.value, 10)); });
    el.querySelectorAll("[data-jarak-aksi]").forEach(function (b) {
      b.addEventListener("click", function () { terapkan(parseInt(b.getAttribute("data-jarak-aksi"), 10)); AudioMesin.klik(); });
    });
    el.querySelectorAll("[data-kata-jarak]").forEach(function (b) {
      b.addEventListener("click", function () {
        var kata = b.getAttribute("data-kata-jarak");
        var k = m.kataJarak.filter(function (x) { return x.kata === kata; })[0];
        terapkan(Math.round((k.min + k.max) / 2));
        UI.dengar(kata);
      });
    });
    document.getElementById("btnMulaCuba").addEventListener("click", function () {
      keadaan.soalanIdx = 0;
      fasaCuba();
    });
    window.addEventListener("resize", function () { terapkan(parseInt(slider.value, 10)); });
    setTimeout(function () { terapkan(28); }, 60);
  }

  function fasaPerasaan() {
    var m = D.MODUL.perasaan;
    var kad = m.wajah.map(function (w, i) {
      return '<button class="wajah-kad ' + (i === 0 ? "aktif" : "") + '" data-wajah="' + w.emosi + '" aria-pressed="' + (i === 0) + '">' +
        Ikon.wajah(w.emosi) +
        '<span class="wajah-nama">' + w.emosi + "</span></button>";
    }).join("");
    return '<div class="kad" style="padding:clamp(22px,4vw,40px)">' +
      "<h3 style=\"margin:0 0 6px;font-size:20px;font-weight:800\">Sentuh Setiap Wajah</h3>" +
      '<p style="margin:0 0 20px;color:var(--dakwat2);font-size:15.5px">Setiap wajah menunjukkan satu perasaan. Sentuh wajah untuk membaca ceritanya.</p>' +
      '<div class="galeri-wajah">' + kad + "</div>" +
      '<div id="kadCerita"></div>' +
      '<div class="kawal-soalan" style="margin-top:22px"><span class="jurang"></span>' +
      '<button class="btn btn-utama" id="btnMulaCuba">' + Ikon.iko("play", 17) + " Cuba Soalan</button></div></div>";
  }

  function wirePerasaan() {
    var el = document.getElementById("modul-kandungan");
    var m = D.MODUL.perasaan;
    function pilih(emosi) {
      el.querySelectorAll("[data-wajah]").forEach(function (b) {
        var on = b.getAttribute("data-wajah") === emosi;
        b.classList.toggle("aktif", on);
        b.setAttribute("aria-pressed", String(on));
      });
      var w = m.wajah.filter(function (x) { return x.emosi === emosi; })[0];
      document.getElementById("kadCerita").innerHTML =
        '<div class="kad-cerita">' + Ikon.wajah(w.emosi) +
        '<div class="cerita-teks"><strong>' + w.emosi.charAt(0).toUpperCase() + w.emosi.slice(1) + "</strong>" +
        "<span>" + w.ayat + "</span></div>" +
        '<button class="btn btn-dengar btn-sm" style="margin-left:auto" data-dengar="' + w.ayat + '" aria-label="Dengar ayat">' + Ikon.iko("pembesarSuara", 17) + "</button></div>";
    }
    el.querySelectorAll("[data-wajah]").forEach(function (b) {
      b.addEventListener("click", function () { pilih(b.getAttribute("data-wajah")); AudioMesin.klik(); });
    });
    document.getElementById("btnMulaCuba").addEventListener("click", function () { keadaan.soalanIdx = 0; fasaCuba(); });
    pilih(m.wajah[0].emosi);
  }

  function fasaPancaindera() {
    var m = D.MODUL.pancaindera;
    var kad = m.deria.map(function (d, i) {
      return '<button class="kad-deria ' + (i === 0 ? "aktif" : "") + '" data-deria="' + d.id + '" aria-pressed="' + (i === 0) + '">' +
        Ikon.objek(d.id) +
        '<span class="deria-nama">' + d.nama + "</span>" +
        '<span class="deria-kata">' + d.kata + "</span></button>";
    }).join("");
    return '<div class="kad" style="padding:clamp(22px,4vw,40px)">' +
      "<h3 style=\"margin:0 0 6px;font-size:20px;font-weight:800\">Gunakan Deria Kamu!</h3>" +
      '<p style="margin:0 0 20px;color:var(--dakwat2);font-size:15.5px">Sentuh setiap objek. Lima deria kita: mata (lihat), telinga (dengar), lidah (rasa), hidung (hidu), kulit (sentuh).</p>' +
      '<div class="galeri-deria">' + kad + "</div>" +
      '<div id="kadDeriaInfo"></div>' +
      '<div class="kawal-soalan" style="margin-top:22px"><span class="jurang"></span>' +
      '<button class="btn btn-utama" id="btnMulaCuba">' + Ikon.iko("play", 17) + " Cuba Soalan</button></div></div>";
  }

  function wirePancaindera() {
    var el = document.getElementById("modul-kandungan");
    var m = D.MODUL.pancaindera;
    function pilih(id) {
      el.querySelectorAll("[data-deria]").forEach(function (b) {
        var on = b.getAttribute("data-deria") === id;
        b.classList.toggle("aktif", on);
        b.setAttribute("aria-pressed", String(on));
      });
      var d = m.deria.filter(function (x) { return x.id === id; })[0];
      var adaAudio = d.audio
        ? '<button class="btn btn-dengar btn-sm" data-main-audio="' + d.audio + '" aria-label="Dengar bunyi">' + Ikon.iko("fonKepala", 17) + " Dengar Bunyi</button>"
        : "";
      document.getElementById("kadDeriaInfo").innerHTML =
        '<div class="kad-deria-info">' + Ikon.objek(d.id) +
        '<div class="info-teks"><strong>' + d.nama + " — " + d.kata + "</strong>" +
        "<span>" + d.ayat + "</span><br><span style=\"font-size:13px;font-weight:700\">" + d.deria + "</span></div>" +
        '<span style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">' + adaAudio +
        '<button class="btn btn-dengar btn-sm" data-dengar="' + d.ayat + '" aria-label="Dengar ayat">' + Ikon.iko("pembesarSuara", 17) + "</button></span></div>";
      if (d.audio) {
        el.querySelector("[data-main-audio]").addEventListener("click", function () {
          AudioMesin.bangunkan();
          AudioMesin[d.audio]();
        });
      }
    }
    el.querySelectorAll("[data-deria]").forEach(function (b) {
      b.addEventListener("click", function () { pilih(b.getAttribute("data-deria")); AudioMesin.klik(); });
    });
    document.getElementById("btnMulaCuba").addEventListener("click", function () { keadaan.soalanIdx = 0; fasaCuba(); });
    pilih(m.deria[0].id);
  }

  function wireKenali(id) {
    if (id === "jarak") wireJarak();
    else if (id === "perasaan") wirePerasaan();
    else wirePancaindera();
  }

  /* ============================================================
     FASA 2 — CUBA (soalan)
     ============================================================ */
  function fasaCuba() {
    var id = keadaan.id;
    var m = D.MODUL[id];
    var q = m.soalan[keadaan.soalanIdx];
    var el = document.getElementById("modul-kandungan");
    var jalur = document.getElementById("modul-jalur");
    if (jalur) jalur.style.width = Math.round(35 + ((keadaan.soalanIdx + 1) / m.soalan.length) * 55) + "%";

    var media = mediaSoalan(id, q);
    var pilihan = q.pilihan.map(function (p) {
      if (id === "perasaan") {
        return '<button class="pilihan-face" data-pilih="' + p + '">' + Ikon.wajah(p) + "<span>" + p + "</span></button>";
      }
      return '<button class="cip-kata" data-pilih="' + p + '">' + p + "</button>";
    }).join("");

    el.innerHTML = '<div class="kad kad-soalan">' +
      '<div class="soalan-kepala"><span class="soalan-no">SOALAN ' + (keadaan.soalanIdx + 1) + " / " + m.soalan.length + "</span>" +
      UI.chipKategori(id) + "</div>" +
      '<p class="soalan-teks">' + q.soalan.replace("______", '<span class="slot">______</span>') + "</p>" +
      media +
      '<div class="pilihan ' + (id === "perasaan" ? "pilihan-face-grup" : "") + '">' + pilihan + "</div>" +
      '<div id="maklumSoalan" aria-live="polite"></div>' +
      '<div class="kawal-soalan"><span class="jurang"></span>' +
      '<button class="btn btn-dengar btn-sm" data-dengar="' + q.soalan + '" aria-label="Dengar soalan">' + Ikon.iko("pembesarSuara", 17) + " Dengar</button>" +
      '<button class="btn btn-utama" id="btnSeterusnya" disabled>Seterusnya ' + Ikon.iko("anakPanahKanan", 17) + "</button></div></div>";

    var sudah = false;
    var betulPertama = null;
    el.querySelectorAll("[data-pilih]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (sudah) return;
        var p = b.getAttribute("data-pilih");
        if (p === q.jawab) {
          if (betulPertama === null) betulPertama = true;
          sudah = true;
          b.classList.add("betul");
          AudioMesin.berjaya();
          Store.catatStat(id, betulPertama);
          maklumBenar(q);
          el.querySelector("#btnSeterusnya").disabled = false;
          el.querySelector("#btnSeterusnya").focus();
        } else {
          if (betulPertama === null) betulPertama = false;
          b.classList.add("salah");
          b.disabled = true;
          AudioMesin.gagal();
          maklumSalah(q, p);
        }
      });
    });

    el.querySelector("#btnSeterusnya").addEventListener("click", function () {
      keadaan.soalanIdx++;
      if (keadaan.soalanIdx < m.soalan.length) fasaCuba();
      else fasaSelesai();
    });

    /* mainkan audio pancaindera secara automatik selepas interaksi */
    var btnAudio = el.querySelector("[data-main-audio]");
    if (btnAudio) btnAudio.focus();
  }

  function mediaSoalan(id, q) {
    var isi = "";
    if (id === "jarak") {
      isi = '<div class="soalan-media" style="color:var(--jarak)">' + Ikon.jarakVisual(q.jarakNilai) + "</div>";
    } else if (id === "perasaan") {
      isi = '<div class="soalan-media" style="color:var(--perasaan);flex-direction:column;gap:12px">' +
        '<span style="font-size:16.5px;font-weight:700;color:var(--dakwat2)">' + q.cerita + "</span>" +
        Ikon.wajah(q.jawab) + "</div>";
    } else {
      if (q.audio) {
        isi = '<div class="soalan-media" style="color:var(--pancaindera)">' +
          '<button class="btn btn-utama" data-main-audio="' + q.audio + '">' + Ikon.iko("fonKepala", 18) + " Dengar Bunyi</button></div>";
      } else {
        isi = '<div class="soalan-media" style="color:var(--pancaindera)">' + Ikon.objek(q.objek) + "</div>";
      }
    }
    return isi;
  }

  function maklumBenar(q) {
    var el = document.getElementById("maklumSoalan");
    el.innerHTML = '<div class="maklum maklum-betul">' + Ikon.iko("semakBulat", 21) +
      '<div><strong>Hebat! Jawapan yang tepat ialah ' + q.jawab + '.</strong>' + q.penjelasan + "</div></div>";
  }

  function maklumSalah(q, pilihan) {
    var el = document.getElementById("maklumSoalan");
    var petunjuk = pilihan + " tidak sesuai di sini. Cuba fikir semula dan pilih jawapan lain.";
    el.innerHTML = '<div class="maklum maklum-salah">' + Ikon.iko("lampu", 21) +
      '<div><strong>Hampir betul! Cuba fikir semula.</strong>' + petunjuk + "</div></div>";
  }

  /* ============================================================
     FASA 3 — SELESAI
     ============================================================ */
  function fasaSelesai() {
    var id = keadaan.id;
    var m = D.MODUL[id];
    var k = D.KATEGORI[id];
    var jalur = document.getElementById("modul-jalur");
    if (jalur) jalur.style.width = "100%";

    var lencanaBaru = !Store.adaLencana(lencanaMap[id]);
    Store.modulSelesai(id);
    var misi1Baru = !!Store.dapat().misi.m1;

    var seterusnya = { jarak: "perasaan", perasaan: "pancaindera", pancaindera: null }[id];
    var el = document.getElementById("modul-kandungan");
    el.innerHTML = '<div class="kad" style="padding:clamp(28px,5vw,52px);text-align:center">' +
      '<div class="hasil-emoji-lingkar" style="margin:0 auto 18px;background:var(--' + id + '2);color:var(--' + id + ')">' + Ikon.iko("semakBulat", 42) + "</div>" +
      '<h2 style="margin:0;font-size:clamp(26px,4.5vw,38px);font-weight:800">Hebat! Kamu berjaya!</h2>' +
      '<p style="color:var(--dakwat2);margin:10px 0 0">Modul ' + m.tajuk + " selesai.</p>" +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px">' +
      UI.chipKategori(id) +
      (misi1Baru ? '<span class="cip" style="background:var(--biru2);color:var(--biru-tua);border:none">' + Ikon.iko("kilat", 15) + " Misi 01 selesai · +40 XP</span>" : "") +
      (lencanaBaru ? '<span class="cip" style="background:var(--hijau2);color:var(--hijau);border:none">' + Ikon.iko("pingat", 15) + " Lencana dibuka!</span>" : "") +
      "</div>" +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:26px">' +
      '<a class="btn btn-ghost" href="#/belajar">' + Ikon.iko("buku", 17) + " Kembali ke Belajar</a>" +
      (seterusnya ? '<a class="btn btn-utama" href="#/modul/' + seterusnya + '">Modul Seterusnya ' + Ikon.iko("anakPanahKanan", 17) + "</a>" : '<a class="btn btn-utama" href="#/misi">Lihat Misi ' + Ikon.iko("sasaran", 17) + "</a>") +
      "</div></div>";

    UI.konfeti(20);
    UI.kepalaXP();
    if (lencanaBaru) {
      AudioMesin.lencana();
      UI.toast("Lencana baharu dibuka!", "berjaya", "pingat");
    } else {
      AudioMesin.berjaya();
    }
    if (misi1Baru) {
      UI.toastXp(40);
      UI.toast("Misi 01 — Kenali selesai! +40 XP", "berjaya", "sasaran");
    }
  }

  return { init: init };
})();
