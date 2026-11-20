/* ============================================================
   KATA+ AR — MISI 05: CABARAN AKHIR
   10 soalan, 6 jenis: pilihan berganda, drag & drop,
   imej, ayat, isyarat tangan, audio.
   ============================================================ */
"use strict";

window.Kuiz = (function () {
  var D = DataApp;
  var idx = 0;
  var skor = { betul: 0, kat: { jarak: { b: 0, t: 0 }, perasaan: { b: 0, t: 0 }, pancaindera: { b: 0, t: 0 } } };

  var labelJenis = {
    mcq: ["senarai", "Pilihan Berganda"],
    dnd: ["gerak", "Drag & Drop"],
    imej: ["mata", "Soalan Bergambar"],
    ayat: ["pensel", "Lengkapkan Ayat"],
    isyarat: ["tangan", "Isyarat Tangan"],
    audio: ["fonKepala", "Soalan Audio"]
  };

  function buka() {
    idx = 0;
    skor = { betul: 0, kat: { jarak: { b: 0, t: 0 }, perasaan: { b: 0, t: 0 }, pancaindera: { b: 0, t: 0 } } };
    intro();
  }

  function intro() {
    var el = document.getElementById("kuiz-kandungan");
    el.innerHTML = '<div class="kad" style="padding:clamp(28px,5vw,48px);text-align:center">' +
      '<div class="hasil-emoji-lingkar" style="margin:0 auto 18px;background:var(--biru2);color:var(--biru)">' + Ikon.iko("trofi", 40) + "</div>" +
      '<h2 style="margin:0;font-size:clamp(26px,4.5vw,38px);font-weight:800">Cabaran Akhir</h2>' +
      '<p style="color:var(--dakwat2);margin:10px auto 0;max-width:44ch">10 soalan yang menggabungkan semua jenis kata adjektif: pilihan berganda, drag & drop, gambar, ayat, isyarat tangan dan audio. Tiada had masa — jawab dengan tenang.</p>' +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:26px">' +
      '<button class="btn btn-utama btn-lg" id="btnMulaKuiz">' + Ikon.iko("play", 18) + " Mula Cabaran</button></div></div>";
    document.getElementById("btnMulaKuiz").addEventListener("click", function () {
      AudioMesin.klik();
      soalan();
    });
  }

  function dots() {
    var s = "";
    for (var i = 0; i < D.KUIZ.length; i++) {
      var cls = i < idx ? "selesai" : (i === idx ? "aktif" : "");
      s += '<i class="' + cls + '" aria-hidden="true"></i>';
    }
    return '<div class="kuiz-dots" role="progressbar" aria-valuenow="' + (idx + 1) + '" aria-valuemax="' + D.KUIZ.length + '" aria-label="Soalan ' + (idx + 1) + ' daripada ' + D.KUIZ.length + '">' + s + "</div>";
  }

  function jenisBadge(q) {
    var l = labelJenis[q.jenis] || ["soalan", q.jenis];
    return '<span class="jenis-badge">' + Ikon.iko(l[0], 15) + l[1] + "</span>";
  }

  function media(q, akar) {
    var m = q.media;
    if (!m) return "";
    if (m.jenis === "jarak") {
      return '<div class="soalan-media" style="color:var(--jarak)">' + Ikon.jarakVisual(m.jarakNilai) + "</div>";
    }
    if (m.jenis === "objek") {
      return '<div class="soalan-media" style="color:var(--pancaindera)">' + Ikon.objek(m.objek) + "</div>";
    }
    if (m.jenis === "wajah") {
      return '<div class="soalan-media" style="color:var(--perasaan)">' + Ikon.wajah(m.emosi) + "</div>";
    }
    if (m.jenis === "audio") {
      return '<div class="soalan-media kuiz-media" style="color:var(--pancaindera)">' +
        '<button class="btn btn-utama" data-main-audio="' + m.audio + '">' + Ikon.iko("fonKepala", 18) + " Dengar Bunyi</button>" +
        '<button class="btn-dengar" data-main-audio="' + m.audio + '" aria-label="Ulang bunyi">' + Ikon.iko("ulang", 19) + "</button></div>";
    }
    if (m.jenis === "isyarat") {
      var kad = m.kad.map(function (k, i) {
        var ditunjuk = i === m.tunjuk;
        return '<div class="kad-tunjuk ' + (ditunjuk ? "" : "gelap") + '" data-pilih="' + k + '">' + k + "</div>";
      }).join("");
      return '<div class="soalan-media" style="flex-direction:column;gap:8px">' +
        '<span style="font-size:13.5px;font-weight:700;color:var(--dakwat3)">' + Ikon.iko("tangan", 15) + " Gerak isyarat: menunjuk</span>" +
        '<div class="isyarat-soalan">' +
        '<svg class="tangan-tunjuk" viewBox="0 0 24 24" fill="none" stroke="var(--biru)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="18.5" r="3.4"/><path d="M9 15V7.2"/><path d="m6.2 10.2 2.8-3 2.8 3"/><path d="M9 15h8.2a2.4 2.4 0 0 1 1.6 4.2l-3 2.6"/></svg>' +
        kad + "</div></div>";
    }
    return "";
  }

  function soalan() {
    var q = D.KUIZ[idx];
    var el = document.getElementById("kuiz-kandungan");

    if (q.jenis === "dnd") {
      dndSoalan(q, el);
      return;
    }

    var pilihan = q.pilihan.map(function (p) {
      return '<button class="cip-kata" data-pilih="' + p + '">' + p + "</button>";
    }).join("");

    el.innerHTML = '<div class="kad kad-soalan">' +
      '<div class="kuiz-kepala">' + dots() + jenisBadge(q) + "</div>" +
      '<p class="soalan-teks">' + q.soalan.replace("______", '<span class="slot">______</span>') + "</p>" +
      media(q) +
      '<div class="pilihan">' + pilihan + "</div>" +
      '<div id="maklumKuiz" aria-live="polite"></div>' +
      '<div class="kawal-soalan"><span class="jurang"></span>' +
      '<button class="btn btn-dengar btn-sm" data-dengar="' + q.soalan + '" aria-label="Dengar soalan">' + Ikon.iko("pembesarSuara", 17) + " Dengar</button>" +
      '<button class="btn btn-utama" id="btnSeterusnya" disabled>Seterusnya ' + Ikon.iko("anakPanahKanan", 17) + "</button></div></div>";

    wirePilihan(el, q);
    var btnAudio = el.querySelector("[data-main-audio]");
    if (btnAudio) {
      el.querySelectorAll("[data-main-audio]").forEach(function (b) {
        b.addEventListener("click", function () { AudioMesin.bangunkan(); AudioMesin[b.getAttribute("data-main-audio")](); });
      });
    }
  }

  function wirePilihan(el, q) {
    var sudah = false;
    el.querySelectorAll("[data-pilih]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (sudah) return;
        var p = b.getAttribute("data-pilih");
        var betul = p === q.jawab;
        sudah = true;
        if (betul) {
          b.classList.add("betul");
          AudioMesin.berjaya();
        } else {
          b.classList.add("salah");
          AudioMesin.gagal();
          el.querySelector('[data-pilih="' + q.jawab + '"]').classList.add("betul");
        }
        catat(q, betul);
        var m = document.getElementById("maklumKuiz");
        m.innerHTML = '<div class="maklum ' + (betul ? "maklum-betul" : "maklum-salah") + '">' +
          Ikon.iko(betul ? "semakBulat" : "lampu", 21) +
          '<div><strong>' + (betul ? "Hebat! Jawapan tepat." : "Hampir betul! Jawapan yang tepat ialah " + q.jawab + ".") + "</strong>" +
          q.penjelasan + "</div></div>";
        el.querySelector("#btnSeterusnya").disabled = false;
        el.querySelector("#btnSeterusnya").focus();
      });
    });
    el.querySelector("#btnSeterusnya").addEventListener("click", seterusnya);
  }

  /* Soalan drag & drop: satu kad kata, tiga kawasan kategori */
  function dndSoalan(q, el) {
    var zon = ["jarak", "perasaan", "pancaindera"].map(function (id) {
      return '<div class="zon" data-kat="' + id + '" style="min-height:120px">' +
        '<div class="zon-kepala">' + UI.chipKategori(id) + "</div>" +
        '<div class="zon-bekas"></div></div>';
    }).join("");

    el.innerHTML = '<div class="kad kad-soalan">' +
      '<div class="kuiz-kepala">' + dots() + jenisBadge(q) + "</div>" +
      '<p class="soalan-teks">' + q.soalan + "</p>" +
      '<div class="petunjuk-dnd" style="margin-bottom:16px">' + Ikon.iko("gerak", 18) + "<span>Seret kad ke kawasan atau ketik kad, kemudian ketik kawasan.</span></div>" +
      '<div style="display:flex;justify-content:center;margin-bottom:20px">' +
      '<button class="kad-kata" data-kata="' + q.perkataan + '" style="font-size:19px;padding:14px 30px;border-color:var(--biru)">' + q.perkataan.toUpperCase() + "</button></div>" +
      '<div class="dnd-grid" style="grid-template-columns:repeat(3,1fr)">' + zon + "</div>" +
      '<div id="maklumKuiz" aria-live="polite"></div>' +
      '<div class="kawal-soalan"><span class="jurang"></span>' +
      '<button class="btn btn-utama" id="btnSeterusnya" disabled>Seterusnya ' + Ikon.iko("anakPanahKanan", 17) + "</button></div></div>";

    var kad = el.querySelector("[data-kata]");
    var sudah = false;
    var terpilih = false;
    var mulaX = 0, mulaY = 0, menyeret = false, abaikanClick = false;

    kad.addEventListener("pointerdown", function (e) {
      mulaX = e.clientX; mulaY = e.clientY; menyeret = false; abaikanClick = false;
      terpilih = true;
      kad.classList.add("terpilih");
      try { kad.setPointerCapture(e.pointerId); } catch (ralat) { /* fallback klik */ }
    });
    kad.addEventListener("pointermove", function (e) {
      if (Math.abs(e.clientX - mulaX) > 10 || Math.abs(e.clientY - mulaY) > 10) menyeret = true;
      el.querySelectorAll(".zon").forEach(function (z) {
        var atas = document.elementFromPoint(e.clientX, e.clientY);
        z.classList.toggle("terarah", !!menyeret && !!atas && z.contains(atas));
      });
    });
    kad.addEventListener("pointerup", function (e) {
      el.querySelectorAll(".zon").forEach(function (z) { z.classList.remove("terarah"); });
      if (menyeret) {
        var atas = document.elementFromPoint(e.clientX, e.clientY);
        var zonDrop = atas && atas.closest ? atas.closest(".zon") : null;
        if (zonDrop && el.contains(zonDrop)) {
          abaikanClick = true;
          cuba(zonDrop);
        }
      }
    });
    kad.addEventListener("click", function () {
      if (abaikanClick) { abaikanClick = false; return; }
      if (sudah) return;
      terpilih = true;
      kad.classList.add("terpilih");
      AudioMesin.klik();
    });

    el.querySelectorAll(".zon").forEach(function (z) {
      z.addEventListener("click", function () { if (terpilih) cuba(z); });
      z.addEventListener("keydown", function (e) {
        if ((e.key === "Enter" || e.key === " ") && terpilih) { e.preventDefault(); cuba(z); }
      });
    });

    function cuba(z) {
      if (sudah) return;
      var betul = z.getAttribute("data-kat") === q.jawab;
      sudah = true;
      kad.classList.remove("terpilih");
      if (betul) {
        z.querySelector(".zon-bekas").innerHTML =
          '<div class="kad-serah betul">' + Ikon.iko("semak", 15) + q.perkataan + "</div>";
        AudioMesin.berjaya();
      } else {
        z.querySelector(".zon-bekas").innerHTML =
          '<div class="kad-serah salah">' + Ikon.iko("silang", 15) + q.perkataan + "</div>";
        AudioMesin.gagal();
        el.querySelector('[data-kat="' + q.jawab + '"] .zon-bekas').innerHTML =
          '<div class="kad-serah betul">' + Ikon.iko("semak", 15) + q.perkataan + "</div>";
      }
      catat(q, betul);
      var m = document.getElementById("maklumKuiz");
      m.innerHTML = '<div class="maklum ' + (betul ? "maklum-betul" : "maklum-salah") + '">' +
        Ikon.iko(betul ? "semakBulat" : "lampu", 21) +
        '<div><strong>' + (betul ? "Hebat! Jawapan tepat." : "Hampir betul!") + "</strong>" + q.penjelasan + "</div></div>";
      el.querySelector("#btnSeterusnya").disabled = false;
      el.querySelector("#btnSeterusnya").focus();
    }
    el.querySelector("#btnSeterusnya").addEventListener("click", seterusnya);
  }

  function catat(q, betul) {
    if (betul) skor.betul++;
    skor.kat[q.kategori].t++;
    if (betul) skor.kat[q.kategori].b++;
    Store.catatStat(q.kategori, betul);
  }

  function seterusnya() {
    idx++;
    if (idx < D.KUIZ.length) soalan();
    else hasil();
  }

  function hasil() {
    var el = document.getElementById("kuiz-kandungan");
    var pct = Math.round((skor.betul / D.KUIZ.length) * 100);
    var s = Store.dapat();
    var terbaik = Math.max(s.kuizTerbaik, pct);
    Store.set("kuizTerbaik", terbaik);
    Store.set("kuizTerakhir", {
      skor: pct, betul: skor.betul, jumlah: D.KUIZ.length,
      kat: {
        jarak: { b: skor.kat.jarak.b, t: skor.kat.jarak.t },
        perasaan: { b: skor.kat.perasaan.b, t: skor.kat.perasaan.t },
        pancaindera: { b: skor.kat.pancaindera.b, t: skor.kat.pancaindera.t }
      }
    });
    Store.misiSelesai("m5");
    var xpBaru = skor.betul * D.XP.soalanKuiz + D.XP.misi5;
    Store.tambahXp(skor.betul * D.XP.soalanKuiz);

    var lemah = "jarak";
    var lemahPct = 100;
    ["jarak", "perasaan", "pancaindera"].forEach(function (k) {
      var p = skor.kat[k].t ? Math.round((skor.kat[k].b / skor.kat[k].t) * 100) : 0;
      if (p < lemahPct) { lemahPct = p; lemah = k; }
    });

    var baris = ["jarak", "perasaan", "pancaindera"].map(function (k) {
      var p = skor.kat[k].t ? Math.round((skor.kat[k].b / skor.kat[k].t) * 100) : 0;
      return '<div class="hasil-kat-baris"><span class="nama">' + UI.ikonKategori(k, 17) + D.KATEGORI[k].label.toUpperCase() + "</span>" +
        '<div class="jalur kat-' + k + '" style="flex:1"><div class="jalur-dalam" style="width:' + p + '%"></div></div>' +
        '<span class="peratus">' + p + "%</span></div>";
    }).join("");

    var cadangan = lemahPct < 100
      ? "Cuba semula " + (lemah === "jarak" ? "Modul Jarak" : lemah === "perasaan" ? "Misi Perasaan" : "Modul Pancaindera") + " untuk mengukuhkan pemahaman."
      : "Kamu menguasai ketiga-tiga jenis kata adjektif dengan cemerlang!";

    el.innerHTML = '<div class="kad kuiz-hasil">' +
      '<div class="hasil-emoji-lingkar">' + Ikon.iko("trofi", 44) + "</div>" +
      '<h2>' + (pct >= 80 ? "Hebat!" : pct >= 50 ? "Bagus!" : "Teruskan Usaha!") + "</h2>" +
      '<p class="hasil-nombor">Skor: ' + pct + "% · " + skor.betul + "/" + D.KUIZ.length + " jawapan betul</p>" +
      '<div class="hasil-kat">' + baris + "</div>" +
      '<div class="cadangan">' + Ikon.iko("lampu", 20) + "<span>" + cadangan + "</span></div>" +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
      '<button class="btn btn-ghost" id="btnUlangKuiz">' + Ikon.iko("ulang", 17) + " Ulang Cabaran</button>" +
      '<a class="btn btn-utama" href="#/skor">' + Ikon.iko("carta", 17) + " Lihat Skor</a></div>" +
      "</div>";

    UI.konfeti(pct >= 80 ? 40 : 18);
    UI.kepalaXP();
    UI.toastXp(xpBaru);
    UI.toast("Misi 05 — Cabaran Akhir selesai!", "berjaya", "trofi");
    AudioMesin.lencana();

    if (Store.adaLencana("master")) {
      setTimeout(function () { UI.toast("Lencana Master Kata Adjektif dibuka!", "berjaya", "trofi"); }, 1500);
    }

    document.getElementById("btnUlangKuiz").addEventListener("click", function () {
      location.hash = "#/misi/5";
      location.reload();
    });
  }

  return { buka: buka };
})();
