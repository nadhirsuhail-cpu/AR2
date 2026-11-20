/* ============================================================
   KATA+ AR — AKTIVITI
   Misi 02: Sentuh & Pilih (visual + cerita)
   Misi 04: Drag & Drop kategori + Bina Ayat
   ============================================================ */
"use strict";

window.Aktiviti = (function () {
  var D = DataApp;

  /* ============================================================
     MISI 02 — SENTUH & PILIH
     ============================================================ */
  var sentuhIdx = 0;

  function sentuh() {
    sentuhIdx = 0;
    sentuhSoalan();
  }

  function sentuhSoalan() {
    var q = D.SENTUH[sentuhIdx];
    var el = document.getElementById("sentuh-kandungan");
    var media = mediaSentuh(q);
    var pilihan = q.pilihan.map(function (p) {
      return '<button class="cip-kata" data-pilih="' + p + '">' + p + "</button>";
    }).join("");

    el.innerHTML = '<div class="kad kad-soalan">' +
      '<div class="soalan-kepala"><span class="soalan-no">SOALAN ' + (sentuhIdx + 1) + " / " + D.SENTUH.length + "</span>" +
      UI.chipKategori(q.kategori) + "</div>" +
      '<p class="soalan-teks">' + q.soalan.replace("______", '<span class="slot">______</span>') + "</p>" +
      media +
      '<div class="pilihan">' + pilihan + "</div>" +
      '<div id="maklumSentuh" aria-live="polite"></div>' +
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
          Store.catatStat(q.kategori, betulPertama);
          maklumSentuh(true, q);
          el.querySelector("#btnSeterusnya").disabled = false;
          el.querySelector("#btnSeterusnya").focus();
        } else {
          if (betulPertama === null) betulPertama = false;
          b.classList.add("salah");
          b.disabled = true;
          AudioMesin.gagal();
          maklumSentuh(false, q);
        }
      });
    });

    el.querySelector("#btnSeterusnya").addEventListener("click", function () {
      sentuhIdx++;
      if (sentuhIdx < D.SENTUH.length) sentuhSoalan();
      else sentuhSelesai();
    });
  }

  function mediaSentuh(q) {
    if (q.jenis === "jarak") {
      return '<div class="soalan-media" style="color:var(--jarak)">' + Ikon.jarakVisual(q.jarakNilai) + "</div>";
    }
    if (q.jenis === "wajah") {
      return '<div class="soalan-media" style="color:var(--perasaan)">' + Ikon.wajah(q.emosi) + "</div>";
    }
    return '<div class="soalan-media" style="color:var(--pancaindera)">' + Ikon.objek(q.objek) + "</div>";
  }

  function maklumSentuh(betul, q) {
    var el = document.getElementById("maklumSentuh");
    if (betul) {
      el.innerHTML = '<div class="maklum maklum-betul">' + Ikon.iko("semakBulat", 21) +
        '<div><strong>Hebat! Jawapan yang tepat ialah ' + q.jawab + '.</strong>' + q.penjelasan + "</div></div>";
    } else {
      el.innerHTML = '<div class="maklum maklum-salah">' + Ikon.iko("lampu", 21) +
        '<div><strong>Hampir betul! Cuba fikir semula.</strong>' +
        "Petunjuk: " + D.KATEGORI[q.kategori].desc + "</div></div>";
    }
  }

  function sentuhSelesai() {
    var el = document.getElementById("sentuh-kandungan");
    Store.misiSelesai("m2");
    el.innerHTML = kadSelesaiMisi(
      "Misi 02 Selesai!",
      "Kamu berjaya mengenal pasti kata adjektif berdasarkan visual dan cerita.",
      30, "#/misi/3", "Misi 03 — Gerakkan Tangan"
    );
    UI.konfeti(18);
    UI.kepalaXP();
    UI.toastXp(30);
    UI.toast("Misi 02 — Sentuh & Pilih selesai!", "berjaya", "sasaran");
    AudioMesin.lencana();
  }

  function kadSelesaiMisi(tajuk, sub, xp, laluan, namaSeterusnya) {
    return '<div class="kad" style="padding:clamp(28px,5vw,52px);text-align:center">' +
      '<div class="hasil-emoji-lingkar" style="margin:0 auto 18px">' + Ikon.iko("semakBulat", 42) + "</div>" +
      '<h2 style="margin:0;font-size:clamp(26px,4.5vw,38px);font-weight:800">' + tajuk + "</h2>" +
      '<p style="color:var(--dakwat2);margin:10px 0 0">' + sub + "</p>" +
      '<div style="display:flex;gap:10px;justify-content:center;margin-top:18px">' +
      '<span class="cip" style="background:var(--biru2);color:var(--biru-tua);border:none">' + Ikon.iko("kilat", 15) + " +" + xp + " XP</span></div>" +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:26px">' +
      '<a class="btn btn-ghost" href="#/misi">' + Ikon.iko("sasaran", 17) + " Semua Misi</a>" +
      '<a class="btn btn-utama" href="' + laluan + '">' + namaSeterusnya + " " + Ikon.iko("anakPanahKanan", 17) + "</a></div></div>";
  }

  /* ============================================================
     MISI 04 — AKTIVITI 1: DRAG & DROP
     ============================================================ */
  var dndTerpilih = null;
  var dndLetak = 0;

  function binaAyat() {
    dndTerpilih = null;
    dndLetak = 0;
    fasaDnd();
  }

  function fasaDnd() {
    var el = document.getElementById("bina-kandungan");
    var kad = UI.acak(D.DND.perkataan);

    var zon = ["jarak", "perasaan", "pancaindera"].map(function (id) {
      return '<div class="zon" data-kat="' + id + '" tabindex="0" role="group" aria-label="Kawasan ' + D.KATEGORI[id].label + '">' +
        '<div class="zon-kepala">' + UI.chipKategori(id) + '<span class="zon-kira">0</span></div>' +
        '<div class="zon-bekas"></div></div>';
    }).join("");

    var bank = kad.map(function (k) {
      return '<button class="kad-kata" data-kata="' + k.kata + '" data-kat="' + k.kategori + '">' + k.kata + "</button>";
    }).join("");

    el.innerHTML =
      '<div class="kad" style="padding:clamp(20px,4vw,34px)">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px">' +
      '<h3 style="margin:0;font-size:19px;font-weight:800">Aktiviti 1 — ' + D.DND.tajuk + "</h3>" +
      '<span class="cip">Aktiviti 1 / 2</span></div>' +
      '<div class="jalur" style="margin-bottom:16px"><div class="jalur-dalam" id="dndJalur" style="width:0%"></div></div>' +
      '<div class="petunjuk-dnd">' + Ikon.iko("gerak", 18) + "<span>" + D.DND.arahan + "</span></div>" +
      '<div class="dnd-grid">' + zon + "</div>" +
      '<div class="bank-kata" id="bankKata">' + bank + "</div>" +
      '<div id="dndMaklum" aria-live="polite"></div></div>';

    el.querySelectorAll(".kad-kata").forEach(wireKadKata);
    el.querySelectorAll(".zon").forEach(wireZon);

    document.getElementById("dndJalur").style.width = "0%";
  }

  function wireKadKata(kad) {
    var startX = 0, startY = 0, pindah = false, diseret = false;
    var pointerBaru = 0;

    function pilihAtauLepas() {
      /* mod ketik: pilih kad */
      UI.semua(".kad-kata").forEach(function (b) {
        var on = b === kad && !b.classList.contains("diletak");
        b.classList.toggle("terpilih", on);
        b.setAttribute("aria-pressed", String(on));
      });
      dndTerpilih = kad.classList.contains("terpilih") ? kad : null;
      AudioMesin.klik();
    }

    kad.addEventListener("pointerdown", function (e) {
      startX = e.clientX; startY = e.clientY;
      pindah = false; diseret = false;
      try { kad.setPointerCapture(e.pointerId); } catch (err) { /* abaikan */ }
      AudioMesin.bangunkan();
    });

    kad.addEventListener("pointermove", function (e) {
      if (Math.abs(e.clientX - startX) > 12 || Math.abs(e.clientY - startY) > 12) {
        diseret = true;
        if (!pindah) {
          pindah = true;
          kad.classList.add("diseret");
        }
      }
      UI.semua(".zon").forEach(function (z) {
        z.classList.toggle("terarah", !!diseret && z === zonDiBawah(e.clientX, e.clientY));
      });
    });

    kad.addEventListener("pointerup", function (e) {
      kad.classList.remove("diseret");
      UI.semua(".zon").forEach(function (z) { z.classList.remove("terarah"); });
      if (diseret) {
        var z = zonDiBawah(e.clientX, e.clientY);
        if (z) letakKad(kad, z);
      } else {
        pointerBaru = Date.now();
        pilihAtauLepas();
      }
    });

    /* Fallback click: papan kekunci, suis bantuan, screen reader */
    kad.addEventListener("click", function () {
      if (Date.now() - pointerBaru < 400) return; // sudah dikendali oleh pointer
      if (kad.classList.contains("diletak")) return;
      pilihAtauLepas();
    });

    kad.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pointerBaru = Date.now(); // elak click berganda
        pilihAtauLepas();
      }
    });
  }

  function zonDiBawah(x, y) {
    var el = document.elementFromPoint(x, y);
    if (!el) return null;
    return el.closest ? el.closest(".zon") : null;
  }

  function wireZon(z) {
    z.addEventListener("click", function () {
      if (dndTerpilih) letakKad(dndTerpilih, z);
    });
    z.addEventListener("keydown", function (e) {
      if ((e.key === "Enter" || e.key === " ") && dndTerpilih) {
        e.preventDefault();
        letakKad(dndTerpilih, z);
      }
    });
  }

  function letakKad(kad, zon) {
    if (!kad || kad.classList.contains("diletak")) return;
    var kata = kad.getAttribute("data-kata");
    var katBetul = kad.getAttribute("data-kat");
    var katZon = zon.getAttribute("data-kat");
    var betul = katBetul === katZon;

    if (betul) {
      zon.querySelector(".zon-bekas").innerHTML +=
        '<div class="kad-serah betul">' + Ikon.iko("semak", 15) + kata + "</div>";
      kad.classList.add("diletak");
      kad.classList.remove("terpilih");
      dndTerpilih = null;
      dndLetak++;
      zon.querySelector(".zon-kira").textContent =
        String(zon.querySelectorAll(".kad-serah").length);
      document.getElementById("dndJalur").style.width = Math.round((dndLetak / 8) * 50) + "%";
      AudioMesin.berjaya();
      Store.catatStat(katBetul, true);
      if (dndLetak === 8) {
        setTimeout(fasaDndSelesai, 500);
      }
    } else {
      kad.classList.add("salah");
      AudioMesin.gagal();
      Store.catatStat(katBetul, false);
      var el = document.getElementById("dndMaklum");
      el.innerHTML = '<div class="maklum maklum-salah">' + Ikon.iko("lampu", 21) +
        '<div><strong>Belum tepat.</strong>' + kata + " ialah kata adjektif " + D.KATEGORI[katBetul].label.toLowerCase() + ". Cuba letakkan di kawasan yang betul.</div></div>";
      setTimeout(function () { kad.classList.remove("salah"); }, 600);
    }
  }

  function fasaDndSelesai() {
    var el = document.getElementById("bina-kandungan");
    el.innerHTML = '<div class="kad" style="padding:clamp(26px,4vw,44px);text-align:center">' +
      '<div class="hasil-emoji-lingkar" style="margin:0 auto 16px">' + Ikon.iko("semakBulat", 40) + "</div>" +
      '<h2 style="margin:0;font-size:clamp(24px,4vw,34px);font-weight:800">Semua Kata di Tempatnya!</h2>' +
      '<p style="color:var(--dakwat2);margin:10px 0 0">Hebat! Sekarang mari lengkapkan ayat.</p>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px">' +
      '<button class="btn btn-utama" id="btnKeAyat">' + Ikon.iko("pensel", 17) + " Aktiviti 2 — Bina Ayat</button></div></div>";
    document.getElementById("btnKeAyat").addEventListener("click", function () {
      dndTerpilih = null;
      ayatIdx = 0;
      fasaAyat();
    });
  }

  /* ============================================================
     MISI 04 — AKTIVITI 2: BINA AYAT
     ============================================================ */
  var ayatIdx = 0;

  function fasaAyat() {
    var q = D.AYAT[ayatIdx];
    var el = document.getElementById("bina-kandungan");
    var pilihan = q.pilihan.map(function (p) {
      return '<button class="cip-kata" data-pilih="' + p + '">' + p + "</button>";
    }).join("");

    el.innerHTML = '<div class="kad kad-soalan">' +
      '<div class="soalan-kepala"><span class="soalan-no">AYAT ' + (ayatIdx + 1) + " / " + D.AYAT.length + "</span>" +
      '<span class="cip">Aktiviti 2 / 2</span></div>' +
      '<div class="jalur" style="margin-bottom:20px"><div class="jalur-dalam" style="width:' + Math.round(50 + ((ayatIdx + 1) / D.AYAT.length) * 50) + '%"></div></div>' +
      '<p class="soalan-teks">' + q.ayat.replace("______", '<span class="slot">______</span>') + "</p>" +
      '<div class="pilihan">' + pilihan + "</div>" +
      '<div id="maklumAyat" aria-live="polite"></div>' +
      '<div class="kawal-soalan"><span class="jurang"></span>' +
      '<button class="btn btn-dengar btn-sm" data-dengar="' + q.ayat + '" aria-label="Dengar ayat">' + Ikon.iko("pembesarSuara", 17) + " Dengar</button>" +
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
          var kat = katDariJawab(q);
          Store.catatStat(kat, betulPertama);
          document.getElementById("maklumAyat").innerHTML =
            '<div class="maklum maklum-betul">' + Ikon.iko("semakBulat", 21) +
            '<div><strong>Hebat! Ayat lengkap!</strong>' + q.ayat.replace("______", q.jawab) + "<br>" + q.penjelasan + "</div></div>";
          el.querySelector("#btnSeterusnya").disabled = false;
          el.querySelector("#btnSeterusnya").focus();
        } else {
          if (betulPertama === null) betulPertama = false;
          b.classList.add("salah");
          b.disabled = true;
          AudioMesin.gagal();
          document.getElementById("maklumAyat").innerHTML =
            '<div class="maklum maklum-salah">' + Ikon.iko("lampu", 21) +
            '<div><strong>Hampir betul! Cuba fikir semula.</strong>' + p + " tidak sesuai dalam ayat ini. Cuba perkataan lain.</div></div>";
        }
      });
    });

    el.querySelector("#btnSeterusnya").addEventListener("click", function () {
      ayatIdx++;
      if (ayatIdx < D.AYAT.length) fasaAyat();
      else fasaAyatSelesai();
    });
  }

  function katDariJawab(q) {
    var kat = "perasaan";
    for (var k in D.KATEGORI) {
      if (D.KATEGORI[k].kata.indexOf(q.jawab) !== -1) kat = k;
    }
    return kat;
  }

  function fasaAyatSelesai() {
    var el = document.getElementById("bina-kandungan");
    Store.misiSelesai("m4");
    el.innerHTML = kadSelesaiMisi(
      "Misi 04 Selesai!",
      "Kamu berjaya meletakkan kata ke tempatnya dan melengkapkan ayat dengan betul.",
      40, "#/misi/5", "Misi 05 — Cabaran Akhir"
    );
    UI.konfeti(20);
    UI.kepalaXP();
    UI.toastXp(40);
    UI.toast("Misi 04 — Bina Ayat selesai!", "berjaya", "sasaran");
    AudioMesin.lencana();
  }

  return { sentuh: sentuh, binaAyat: binaAyat };
})();
