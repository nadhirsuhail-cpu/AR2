/* ============================================================
   KATA+ AR — MISI 03: GERAKKAN TANGAN
   "Tangkap Kata Adjektif" — kamera + penjejakan tangan
   (MediaPipe Hand Landmarker, pemprosesan client-side sahaja).

   Gerak isyarat:
   - Menunjuk (tahan)  → pilih kad di bawah kursor
   - Cubit             → ambil kad di bawah kursor
   - Ibu jari ke atas  → sahkan / ambil kad
   - Tapak terbuka     → buka legenda kategori (genggam = tutup)
   - Angkat tangan     → petunjuk
   - Swipe kiri/kanan  → pusingan seterusnya / sebelumnya

   Mod Sentuh (fallback): ketik kad, seret untuk swipe,
   butang untuk legenda & petunjuk.
   ============================================================ */
"use strict";

window.Ar = (function () {
  var D = DataApp;

  var CDN = {
    bundle: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.3/vision_bundle.mjs",
    wasm: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.3/wasm",
    model: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
  };

  var sesi = null;

  /* Peta perkataan → kategori */
  var kataKeKat = {};
  (function () {
    for (var k in D.KATEGORI) {
      D.KATEGORI[k].kata.forEach(function (w) { kataKeKat[w.toLowerCase()] = k; });
    }
  })();

  function buka() {
    if (sesi) henti();
    var el = document.getElementById("ar-kandungan");
    var sokong = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    el.innerHTML = '<div class="kad ar-privasi">' +
      '<span class="privasi-iko">' + Ikon.iko("kamera", 36) + "</span>" +
      "<h2>KATA+ AR</h2>" +
      '<p style="margin:0;color:var(--dakwat2)">Kamera digunakan untuk mengesan pergerakan tangan kamu. Angkat tangan, tunjuk, dan tangkap kata adjektif!</p>' +
      '<div class="privasi-nota"><strong>' + Ikon.iko("perisai", 16) + " Privasi kamu dilindungi</strong>" +
      D.INFO.privasiPenuh + "</div>" +
      (sokong ? "" : '<div class="privasi-nota" style="background:var(--ambar2);border-color:rgba(184,121,26,0.35);color:#7c510c">Kamera tidak tersedia pada peranti atau pelayar ini. Kamu boleh bermain dengan Mod Sentuh.</div>') +
      '<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-top:8px">' +
      (sokong ? '<button class="btn btn-utama btn-lg" id="btnKamera">' + Ikon.iko("kamera", 19) + " Benarkan Kamera</button>" : "") +
      '<button class="btn ' + (sokong ? "btn-ghost" : "btn-utama") + ' btn-lg" id="btnSentuh">' + Ikon.iko("tangan", 19) + " Guna Touch Mode</button></div>" +
      '<button class="btn btn-dengar btn-sm" data-cara-ar>Cara Bermain AR</button>' +
      "</div>";

    document.getElementById("btnSentuh").addEventListener("click", function () { mula("sentuh"); });
    var bk = document.getElementById("btnKamera");
    if (bk) bk.addEventListener("click", function () { mula("kamera"); });
    var bca = el.querySelector("[data-cara-ar]");
    if (bca) bca.addEventListener("click", function () { Screens.caraBermainModal(); });
  }

  /* ============================================================
     MEMULAKAN SESI
     ============================================================ */
  function mula(mod) {
    var el = document.getElementById("ar-kandungan");
    var pemain = {
      mod: mod,
      pusingan: 0,
      ditangkap: [],
      selesaiSemua: false,
      peralihanPusingan: false,
      hintCd: 0,
      stream: null,
      video: null,
      pengesan: null,
      pekerja: null,
      langsung: null,
      raf: 0,
      bingkai: 0,
      terakhir: 0,
      // gerak
      kursorAda: false, kursorX: 0, kursorY: 0,
      pelicin: { ada: false, x: 0, y: 0 },
      dwellEl: null, dwellT: 0,
      cubit: null, // pengesan cubit dengan histeresis
      gerakAktif: null,
      baselineY: null,
      angkatCd: 0,
      swipHist: [],
      swipCd: 0,
      tapakBuka: false,
      peralihan: null // 'memuat' | 'sedia' | 'gagal'
    };
    var advState = Store.dapat().adventure;
    pemain.adventureLevel = advState && advState.pendingAr ? advState.pendingAr : null;
    var advLevel = pemain.adventureLevel && DataApp.ADVENTURE.levels.find(function (l) { return l.id === pemain.adventureLevel; });
    pemain.pusinganSet = advLevel && advLevel.category !== "campuran"
      ? D.AR.pusingan.filter(function (r) { return r.kategori === advLevel.category; })
      : D.AR.pusingan.slice();
    if (!pemain.pusinganSet.length) pemain.pusinganSet = D.AR.pusingan.slice();
    sesi = pemain;
    Store.set("arPernah", true);
    if (mod === "kamera") Store.set("arKamera", true);

    binaPentas(pemain);

    if (mod === "kamera") {
      pemain.peralihan = "memuat";
      pemain.status.textContent = "Memuat model pengesanan tangan... (kali pertama perlukan internet)";
      mulaStream(pemain);
    } else {
      pemain.peralihan = "sedia";
      pemain.status.textContent = "Mod Sentuh — ketik kad untuk menangkap. Seret untuk swipe.";
    }
  }

  function mulaStream(pemain) {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    }).then(function (stream) {
      pemain.stream = stream;
      pemain.video.srcObject = stream;
      pemain.video.classList.remove("tersembunyi");
      return pemain.video.play();
    }).then(function () {
      return buatPengesan(pemain);
    }).then(function (api) {
      pemain.pengesan = api;
      pemain.peralihan = "sedia";
      pemain.status.textContent = "Angkat tangan ke hadapan kamera. Tunjuk ke kad dan tahan sebentar.";
      gelung(pemain);
    }).catch(function (e) {
      gagalKamera(pemain, e);
    });
  }

  function gagalKamera(pemain, e) {
    var nama = (e && e.name) || "";
    var msg;
    if (nama === "NotAllowedError" || nama === "PermissionDeniedError") {
      msg = "Akses kamera dinafikan. Kamu boleh bermain dengan Mod Sentuh — semua aktiviti tetap boleh diselesaikan.";
    } else if (nama === "NotFoundError" || nama === "OverconstrainedError") {
      msg = "Kamera tidak dijumpai pada peranti ini. Kamu boleh bermain dengan Mod Sentuh.";
    } else if (pemain.pengesan === null && !pemain.stream) {
      msg = "Kamera tidak dapat dibuka. Kamu boleh bermain dengan Mod Sentuh.";
    } else {
      msg = "Model pengesanan tangan gagal dimuat (perlukan internet untuk kali pertama). Kamu boleh bermain dengan Mod Sentuh.";
    }
    henti(pemain);
    UI.toast(msg, "ralat", "maklumat");
    setTimeout(function () { mula("sentuh"); }, 700);
  }

  /* ============================================================
     PENGESAN TANGAN — pekerja klasik dahulu, benang utama
     sebagai gantian (cth. file:// menyekat pekerja).
     ============================================================ */
  function urlPekerja() {
    var terbenam = document.getElementById("ar-worker-source");
    if (terbenam && window.Blob && window.URL && URL.createObjectURL) {
      return URL.createObjectURL(new Blob([terbenam.textContent], { type: "text/javascript" }));
    }
    return "js/ar-worker.js";
  }

  function buatPengesan(pemain) {
    return new Promise(function (resolve, reject) {
      var pekerja = null;
      var sumberPekerja = urlPekerja();
      var blobPekerja = sumberPekerja.indexOf("blob:") === 0;
      try {
        pekerja = new Worker(sumberPekerja);
        if (blobPekerja) pemain.pekerjaUrl = sumberPekerja;
      } catch (eW) {
        pekerja = null;
        if (blobPekerja) URL.revokeObjectURL(sumberPekerja);
      }
      if (pekerja) {
        var siap = false;
        pekerja.onmessage = function (ev) {
          var m = ev.data;
          if (m.type === "sedia") {
            siap = true;
            pemain.pekerja = pekerja;
            resolve({
              jenis: "pekerja",
              detect: function (img, ts, cb) {
                pemain.bingkai++;
                pekerja.postMessage({ type: "detect", id: pemain.bingkai, img: img, ts: ts }, [img]);
                pemain.lastId = pemain.bingkai;
                cbLangsung = cb;
              }
            });
          } else if (m.type === "ralat") {
            pekerja.terminate();
            reject(new Error(m.msg));
          } else if (m.type === "landmarks" && siap) {
            if (m.id === pemain.lastId && cbLangsung) cbLangsung(m.lm);
          }
        };
        var cbLangsung = null;
        pekerja.onerror = function () {
          try { pekerja.terminate(); } catch (e2) { /* abaikan */ }
          pekerja = null;
          reject(new Error("pekerja gagal"));
        };
        pekerja.postMessage({
          type: "init", wasmBundleUrl: CDN.bundle, wasmDirUrl: CDN.wasm, modelUrl: CDN.model
        });
        setTimeout(function () {
          if (!siap && pekerja) {
            try { pekerja.terminate(); } catch (e3) { /* abaikan */ }
            reject(new Error("masa tamat"));
          }
        }, 30000);
        return;
      }
      /* Gantian: inferens pada benang utama */
      import(CDN.bundle).then(function (vision) {
        return vision.FilesetResolver.forVisionTasks(CDN.wasm).then(function (fileset) {
          var pilihan = {
            baseOptions: { modelAssetPath: CDN.model, delegate: "GPU" },
            runningMode: "VIDEO",
            numHands: 1,
            minHandDetectionConfidence: 0.5,
            minHandPresenceConfidence: 0.5,
            minTrackingConfidence: 0.5
          };
          return vision.HandLandmarker.createFromOptions(fileset, pilihan).catch(function () {
            pilihan.baseOptions.delegate = "CPU";
            return vision.HandLandmarker.createFromOptions(fileset, pilihan);
          });
        });
      }).then(function (landmarker) {
        pemain.langsung = landmarker;
        resolve({
          jenis: "langsung",
          detect: function (img, ts, cb) {
            var hasil = landmarker.detectForVideo(img, ts);
            cb(hasil.landmarks && hasil.landmarks[0]
              ? hasil.landmarks[0].map(function (p) { return { x: p.x, y: p.y, v: p.visibility || 1 }; })
              : null);
          }
        });
      }).catch(function (e) { reject(e); });
    });
  }

  /* ============================================================
     BINA PENTAS PERMAINAN
     ============================================================ */
  function binaPentas(pemain) {
    var el = document.getElementById("ar-kandungan");
    el.innerHTML =
      '<div class="ar-pentas" id="arPentas">' +
      '<video class="ar-video tersembunyi" id="arVideo" autoplay playsinline muted aria-hidden="true"></video>' +
      '<div class="ar-lapisan">' +
      '<div class="ar-bar-atas">' +
      '<div class="ar-arahan" id="arArahan"></div>' +
      '<span class="ar-cip-status" id="arStatus"></span>' +
      '<button class="btn-iko" id="arHint" aria-label="Petunjuk" title="Petunjuk">' + Ikon.iko("lampu", 19) + "</button>" +
      '<button class="btn-iko" id="arLegenda" aria-label="Legenda kategori" title="Legenda kategori">' + Ikon.iko("maklumat", 19) + "</button>" +
      (pemain.mod === "kamera" ? '<button class="btn-iko" id="arHenti" aria-label="Matikan kamera" title="Matikan kamera">' + Ikon.iko("pembesarSuaraX", 19) + "</button>" : "") +
      "</div>" +
      '<div class="ar-ruang" id="arRuang">' +
      '<div class="ar-hint" id="arHintPanel" hidden></div>' +
      '<div class="ar-legenda-kat" id="arLegendaPanel" hidden></div>' +
      '<span class="ar-kursor" id="arKursor" aria-hidden="true"></span>' +
      "</div>" +
      '<div class="ar-bar-bawah">' +
      '<div class="ar-tray"><span class="ar-tray-label">Ditangkap</span><span id="arTrayKata"></span></div>' +
      '<div class="ar-titik" id="arTitik" role="progressbar" aria-label="Pusingan"></div>' +
      '<div style="display:flex;gap:8px">' +
      '<button class="btn btn-ghost btn-sm" id="arSebelum" aria-label="Pusingan sebelumnya">' + Ikon.iko("anakPanahKiri", 16) + "</button>" +
      '<button class="btn btn-ghost btn-sm" id="arSelepas" aria-label="Pusingan seterusnya">' + Ikon.iko("anakPanahKanan", 16) + "</button></div></div></div></div>";

    pemain.video = document.getElementById("arVideo");
    pemain.ruang = document.getElementById("arRuang");
    pemain.kursor = document.getElementById("arKursor");
    pemain.status = document.getElementById("arStatus");
    pemain.arahan = document.getElementById("arArahan");
    pemain.hintPanel = document.getElementById("arHintPanel");
    pemain.legendaPanel = document.getElementById("arLegendaPanel");
    pemain.titik = document.getElementById("arTitik");
    pemain.tray = document.getElementById("arTrayKata");

    document.getElementById("arHint").addEventListener("click", function () { paparPetunjuk(pemain); });
    document.getElementById("arLegenda").addEventListener("click", function () { togolLegenda(pemain); });
    document.getElementById("arSebelum").addEventListener("click", function () { tukarPusingan(pemain, -1); });
    document.getElementById("arSelepas").addEventListener("click", function () { tukarPusingan(pemain, 1); });
    var btnHenti = document.getElementById("arHenti");
    if (btnHenti) btnHenti.addEventListener("click", function () {
      henti(pemain);
      UI.toast("Kamera dimatikan. Beralih ke Mod Sentuh.", "info", "maklumat");
      mula("sentuh");
    });

    /* Swipe sentuh pada ruang */
    var sx = 0, sy = 0, st = 0;
    pemain.ruang.addEventListener("pointerdown", function (e) { sx = e.clientX; sy = e.clientY; st = Date.now(); });
    pemain.ruang.addEventListener("pointerup", function (e) {
      var dx = e.clientX - sx, dy = e.clientY - sy, dt = Date.now() - st;
      if (Math.abs(dx) > 70 && Math.abs(dy) < 70 && dt < 700) {
        AudioMesin.sapu();
        tukarPusingan(pemain, dx < 0 ? 1 : -1);
      }
    });

    renderPusingan(pemain);
  }

  /* ============================================================
     PUSINGAN
     ============================================================ */
  function renderPusingan(pemain) {
    var r = pemain.pusinganSet[pemain.pusingan];
    pemain.ditangkap = [];
    pemain.dwellEl = null;
    pemain.dwellT = 0;
    pemain.tapakBuka = false;

    var kat = D.KATEGORI[r.kategori];
    pemain.arahan.innerHTML = "<strong>Cari kata adjektif " + kat.label.toUpperCase() + ".</strong>" +
      "<span>" + kat.desc + "</span>";

    /* titik kemajuan pusingan */
    pemain.titik.innerHTML = pemain.pusinganSet.map(function (p, i) {
      return '<i class="' + (i === pemain.pusingan ? "aktif" : (i < pemain.pusingan ? "siap" : "")) + '" aria-hidden="true"></i>';
    }).join("");
    pemain.titik.setAttribute("aria-label", "Pusingan " + (pemain.pusingan + 1) + " daripada " + pemain.pusinganSet.length);
    pemain.tray.innerHTML = "";
    pemain.hintPanel.hidden = true;
    pemain.legendaPanel.hidden = true;

    /* kedudukan kad */
    var slot = [[13, 20], [45, 11], [77, 22], [15, 63], [49, 72], [79, 57]];
    var susunan = UI.acak(r.kad.map(function (k, i) { return { kata: k, i: i }; }));

    var html = susunan.map(function (x, n) {
      var s = slot[n % slot.length];
      var kiri = Math.max(4, Math.min(72, s[0] + (Math.random() * 6 - 3)));
      var atas = Math.max(6, Math.min(62, s[1] + (Math.random() * 6 - 3)));
      return '<button class="ar-kad" data-ar-kata="' + x.kata + '" style="left:' + kiri + '%;top:' + atas + '%">' + x.kata + "</button>";
    }).join("");
    pemain.ruang.querySelectorAll(".ar-kad").forEach(function (k) { k.remove(); });
    pemain.ruang.insertAdjacentHTML("afterbegin", html);

    pemain.ruang.querySelectorAll(".ar-kad").forEach(function (k) {
      k.addEventListener("click", function () { pilihKad(pemain, k); });
    });

    if (pemain.mod === "kamera" && pemain.peralihan !== "sedia") {
      pemain.status.textContent = "Memuat model pengesanan tangan...";
    }
  }

  function tukarPusingan(pemain, arah) {
    var baru = pemain.pusingan + arah;
    if (baru < 0 || baru >= pemain.pusinganSet.length || pemain.selesaiSemua || pemain.peralihanPusingan) return;
    pemain.pusingan = baru;
    renderPusingan(pemain);
    AudioMesin.klik();
  }

  function pilihKad(pemain, kad) {
    var r = pemain.pusinganSet[pemain.pusingan];
    var kata = kad.getAttribute("data-ar-kata");
    if (pemain.ditangkap.indexOf(kata) !== -1 || pemain.selesaiSemua || pemain.peralihanPusingan) return;

    var betul = r.sasaran.indexOf(kata) !== -1;
    var kat = kataKeKat[kata.toLowerCase()] || r.kategori;

    if (betul) {
      pemain.ditangkap.push(kata);
      kad.classList.add("betul");
      AudioMesin.tangkap();
      Store.catatStat(r.kategori, true);
      setTimeout(function () {
        kad.classList.add("ditangkap");
        setTimeout(function () {
          if (!kad.parentNode) return;
          kad.remove();
          pemain.tray.innerHTML += '<span class="tray-kata">' + kata + "</span>";
        }, 380);
      }, 260);
      if (pemain.ditangkap.length === r.sasaran.length) {
        pusinganSelesai(pemain);
      }
    } else {
      kad.classList.add("salah");
      AudioMesin.gagal();
      Store.catatStat(r.kategori, false);
      paparPetunjuk(pemain, kata, r);
      setTimeout(function () { kad.classList.remove("salah"); }, 650);
    }
  }

  function pusinganSelesai(pemain) {
    if (pemain.peralihanPusingan || pemain.selesaiSemua) return;
    pemain.peralihanPusingan = true;

    var pusinganAkhir = pemain.pusingan === pemain.pusinganSet.length - 1;
    var r = pemain.pusinganSet[pemain.pusingan];
    var namaKat = D.KATEGORI[r.kategori].label;
    var lapis = document.createElement("div");
    lapis.className = "ar-selesai";
    lapis.setAttribute("role", "region");
    lapis.setAttribute("aria-live", "polite");
    lapis.setAttribute("aria-label", pusinganAkhir ? "Pusingan akhir selesai" : "Pusingan selesai");
    lapis.style.background = "rgba(255,255,255,0.92)";
    var arahanSambung = pusinganAkhir
      ? "Tekan butang untuk melihat keputusan."
      : "Tekan butang apabila kamu bersedia. Pusingan tidak akan berubah sendiri.";
    lapis.innerHTML =
      '<div class="hasil-emoji-lingkar" style="margin:0;background:var(--hijau2);color:var(--hijau)">' + Ikon.iko("semakBulat", 38) + "</div>" +
      "<h2>" + (pusinganAkhir ? "Pusingan Akhir Selesai!" : "Pusingan " + (pemain.pusingan + 1) + " selesai!") + "</h2>" +
      "<p>Semua kata adjektif " + namaKat + " berjaya ditangkap. " + arahanSambung + "</p>" +
      '<button class="btn btn-utama btn-lg" id="btnArSambung">' +
      (pusinganAkhir ? "Tamatkan Misi" : "Pusingan Seterusnya") + " " + Ikon.iko(pusinganAkhir ? "semakBulat" : "anakPanahKanan", 18) +
      "</button>";
    pemain.ruang.appendChild(lapis);

    var btn = lapis.querySelector("#btnArSambung");
    btn.addEventListener("click", function () {
      lapis.remove();
      AudioMesin.klik();
      if (pusinganAkhir) {
        tamat(pemain);
      } else {
        pemain.pusingan++;
        pemain.peralihanPusingan = false;
        renderPusingan(pemain);
      }
    });
    btn.focus();
  }

  function tamat(pemain) {
    pemain.selesaiSemua = true;
    var cabaranAdventure = !!pemain.adventureLevel;
    var xp = cabaranAdventure
      ? (window.Adventure ? Adventure.arSelesai(pemain.adventureLevel) : 0)
      : D.XP.misi3;
    if (!cabaranAdventure) Store.misiSelesai("m3");

    var lapis = document.createElement("div");
    lapis.className = "ar-selesai";
    var levelAdventure = cabaranAdventure
      ? DataApp.ADVENTURE.levels.filter(function (l) { return l.id === pemain.adventureLevel; })[0]
      : null;
    var tajukHasil = cabaranAdventure ? "Cabaran AR Selesai!" : "Hebat! Semua Kata Ditangkap!";
    var teksHasil = cabaranAdventure
      ? "Hebat! Cabaran AR " + levelAdventure.title + " berjaya diselesaikan."
      : "Kamu berjaya menyelesaikan Misi 03 dengan " + (pemain.mod === "kamera" ? "gerakan tangan" : "Mod Sentuh") + ".";
    var pautanKembali = cabaranAdventure
      ? '<a class="btn btn-utama" href="#/adventure">Kembali ke KATA+ Adventure ' + Ikon.iko("anakPanahKanan", 17) + "</a>"
      : '<a class="btn btn-ghost" href="#/misi">' + Ikon.iko("sasaran", 17) + " Semua Misi</a>" +
        '<a class="btn btn-utama" href="#/misi/4">Misi 04 — Bina Ayat ' + Ikon.iko("anakPanahKanan", 17) + "</a>";
    lapis.innerHTML =
      '<div class="hasil-emoji-lingkar" style="margin:0">' + Ikon.iko("semakBulat", 42) + "</div>" +
      "<h2>" + tajukHasil + "</h2>" +
      "<p>" + teksHasil + "</p>" +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">' +
      '<span class="cip" style="background:var(--biru2);color:var(--biru-tua);border:none">' + Ikon.iko("kilat", 15) + " +" + xp + " XP</span></div>" +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' + pautanKembali + "</div>";
    pemain.ruang.appendChild(lapis);

    henti(pemain, true);
    UI.konfeti(20);
    UI.kepalaXP();
    UI.toastXp(xp);
    UI.toast(cabaranAdventure ? "Cabaran AR Adventure selesai!" : "Misi 03 — Gerakkan Tangan selesai!", "berjaya", "kamera");
    AudioMesin.lencana();
  }

  function paparPetunjuk(pemain, kataSalah, r) {
    var now = Date.now();
    if (now - pemain.hintCd < 6000 && !kataSalah) return;
    pemain.hintCd = now;
    AudioMesin.petunjuk();
    var teks;
    if (kataSalah && r) {
      var katSalah = kataKeKat[kataSalah.toLowerCase()];
      teks = "Kata itu ialah kata adjektif " + (katSalah ? D.KATEGORI[katSalah].label : "lain") + ". Cuba cari kata adjektif " + D.KATEGORI[r.kategori].label + ".";
    } else {
      teks = D.AR.hintKat[pemain.pusinganSet[pemain.pusingan].kategori];
    }
    pemain.hintPanel.innerHTML = Ikon.iko("lampu", 19) + "<span>" + teks + "</span>";
    pemain.hintPanel.hidden = false;
    clearTimeout(pemain.hintTimer);
    pemain.hintTimer = setTimeout(function () { pemain.hintPanel.hidden = true; }, 4200);
  }

  function togolLegenda(pemain) {
    var r = pemain.pusinganSet[pemain.pusingan];
    if (pemain.legendaPanel.hidden) {
      pemain.legendaPanel.innerHTML = ["jarak", "perasaan", "pancaindera"].map(function (id) {
        var k = D.KATEGORI[id];
        return '<span class="cip cip-kat ' + id + '">' + Ikon.iko(k.ikon, 15) + k.label + "</span>";
      }).join("") +
        '<span style="flex-basis:100%;font-size:13.5px;color:var(--dakwat2)">Sasaran sekarang: ' + D.KATEGORI[r.kategori].label + "</span>";
      pemain.legendaPanel.hidden = false;
    } else {
      pemain.legendaPanel.hidden = true;
    }
  }

  /* ============================================================
     GELUNG KAMERA & GERAK ISYARAT
     ============================================================ */
  function gelung(pemain) {
    function langkah() {
      if (!sesi || sesi !== pemain) return;
      pemain.raf = requestAnimationFrame(langkah);
      var now = performance.now();

      if (pemain.pengesan && pemain.video && pemain.video.readyState >= 2) {
        var langkau = pemain.pengesan.jenis === "langsung" ? 66 : 33;
        if (now - pemain.terakhir >= langkau) {
          pemain.terakhir = now;
          try {
            var img = createImageBitmap(pemain.video, { resizeWidth: 320 });
            img.then(function (bm) {
              if (!sesi || sesi !== pemain) { bm.close(); return; }
              pemain.pengesan.detect(bm, now, function (lm) { prosesLandmark(pemain, lm); });
            }).catch(function () { /* abaikan */ });
          } catch (e2) { /* abaikan */ }
        }
      }

      /* kursor idle */
      if (now - pemain.terakhirKursor > 3000 && pemain.kursor.style.display !== "none") {
        pemain.kursor.style.display = "none";
        pemain.status.textContent = "Angkat tangan ke hadapan kamera.";
      }
    }
    pemain.raf = requestAnimationFrame(langkah);
  }

  function prosesLandmark(pemain, lm) {
    if (!lm) return;
    var gerak = klasifikasi(lm, pemain);

    /* kursor: hujung telunjuk (8) atau tapak tangan (9) */
    var titik = gerak === "telunjuk" ? lm[8] : lm[9];
    var p = unjur(pemain, titik.x, titik.y);
    pemain.terakhirKursor = performance.now();
    pemain.kursor.style.display = "block";
    pemain.kursor.style.left = p.x + "px";
    pemain.kursor.style.top = p.y + "px";
    pemain.kursor.classList.toggle("mengisi", !!pemain.dwellEl);

    /* status chip */
    if (gerak !== pemain.gerakAktif) {
      pemain.gerakAktif = gerak;
      pemain.status.textContent = teksGerak(gerak);
    }

    /* Swipe yang disengajakan: tapak terbuka, sapuan mendatar pantas. */
    var t = performance.now();
    if (gerak === "tapak" && !pemain.peralihanPusingan) {
      pemain.swipHist.push({ x: lm[0].x, y: lm[0].y, t: t });
      while (pemain.swipHist.length && t - pemain.swipHist[0].t > 420) pemain.swipHist.shift();
      if (pemain.swipHist.length > 4 && t - pemain.swipCd > 1000) {
        var mulaSwipe = pemain.swipHist[0];
        var dx = lm[0].x - mulaSwipe.x;
        var dy = lm[0].y - mulaSwipe.y;
        var durasi = t - mulaSwipe.t;
        if (Math.abs(dx) > 0.32 && Math.abs(dy) < 0.14 && durasi >= 100 && durasi <= 420) {
          pemain.swipCd = t;
          pemain.swipHist = [];
          AudioMesin.sapu();
          tukarPusingan(pemain, dx < 0 ? 1 : -1);
          return;
        }
      }
    } else {
      pemain.swipHist = [];
    }

    /* Angkat tangan → petunjuk */
    var y = lm[0].y;
    if (pemain.baselineY === null) pemain.baselineY = y;
    pemain.baselineY = Math.min(pemain.baselineY * 1.0006, y);
    if (y < pemain.baselineY - 0.2 && t - pemain.angkatCd > 5000) {
      pemain.angkatCd = t;
      paparPetunjuk(pemain);
    }

    /* Tapak terbuka → legenda; genggam → tutup */
    if (gerak === "tapak" && !pemain.tapakBuka) {
      pemain.tapakBuka = true;
      if (pemain.legendaPanel.hidden) togolLegenda(pemain);
    }
    if (gerak === "genggam" && pemain.tapakBuka) {
      pemain.tapakBuka = false;
      pemain.legendaPanel.hidden = true;
    }

    /* Pilih kad: menunjuk tahan (dwell), cubit atau ibu jari */
    var kad = kadDiKursor(pemain, p);
    if (kad !== pemain.dwellEl) { pemain.dwellEl = kad; pemain.dwellT = performance.now(); }
    if (kad) {
      pemain.ruang.querySelectorAll(".ar-kad").forEach(function (k) {
        k.classList.toggle("dituju", k === kad);
      });
    }

    var lamaTunjuk = kad && performance.now() - pemain.dwellT > 650;
    var cubit = gerak === "cubit";
    var ibu = gerak === "ibuJari";
    if (kad && (lamaTunjuk || cubit || ibu)) {
      pemain.dwellEl = null;
      pemain.dwellT = 0;
      pilihKad(pemain, kad);
    }
  }

  function teksGerak(g) {
    var m = {
      tapak: "Tapak tangan terbuka — legenda kategori dibuka",
      telunjuk: "Menunjuk — tahan di atas kad untuk memilih",
      cubit: "Cubit dikesan — kad diambil",
      ibuJari: "Ibu jari ke atas — jawapan disahkan",
      genggam: "Genggaman — legenda ditutup",
      null: "Angkat tangan ke hadapan kamera"
    };
    return m[g] || m.null;
  }

  function kadDiKursor(pemain, p) {
    var kad = pemain.ruang.querySelectorAll(".ar-kad");
    var r = pemain.ruang.getBoundingClientRect();
    for (var i = 0; i < kad.length; i++) {
      var b = kad[i].getBoundingClientRect();
      if (p.x >= b.left - r.left && p.x <= b.right - r.left && p.y >= b.top - r.top && p.y <= b.bottom - r.top) {
        return kad[i];
      }
    }
    return null;
  }

  function unjur(pemain, x, y) {
    var ruang = pemain.ruang.getBoundingClientRect();
    var vw = pemain.video.videoWidth || 640;
    var vh = pemain.video.videoHeight || 480;
    var px = 1 - x; // cermin paksi-X
    var skala = Math.max(ruang.width / vw, ruang.height / vh);
    var lebarLukis = vw * skala;
    var tinggiLukis = vh * skala;
    return {
      x: px * lebarLukis + (ruang.width - lebarLukis) / 2,
      y: y * tinggiLukis + (ruang.height - tinggiLukis) / 2
    };
  }

  /* ---------- KLASIFIKASI GERAK ISYARAT ---------- */
  function jarak2(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  function lanjut(lm, tip, pip, mcp) {
    if (Math.min(lm[tip].v, lm[pip].v, lm[mcp].v) < 0.35) return false;
    var d1 = jarak2(lm[tip], lm[mcp]);
    var d2 = jarak2(lm[pip], lm[mcp]);
    return d1 > d2 * 1.25;
  }

  function klasifikasi(lm, pemain) {
    var f2 = lanjut(lm, 8, 6, 5);
    var f3 = lanjut(lm, 12, 10, 9);
    var f4 = lanjut(lm, 16, 14, 13);
    var f5 = lanjut(lm, 20, 18, 17);
    var ibuKeluar = jarak2(lm[4], lm[5]) > jarak2(lm[3], lm[5]) * 1.2;
    var semuaLipat = !f2 && !f3 && !f4 && !f5;

    /* Cubit: nisbah jarak ibu jari–telunjuk berbanding saiz tapak */
    var d = jarak2(lm[4], lm[8]);
    var tapak = Math.max(jarak2(lm[0], lm[9]), 0.001);
    var nisbah = d / tapak;
    if (!pemain.cubit) pemain.cubit = { dalam: false };
    if (!pemain.cubit.dalam && nisbah < 0.55) pemain.cubit.dalam = true;
    else if (pemain.cubit.dalam && nisbah > 0.82) pemain.cubit.dalam = false;

    if (semuaLipat && nisbah < 0.75) return "genggam";
    if (pemain.cubit.dalam && !semuaLipat) return "cubit";
    if (semuaLipat && lm[4].v > 0.35 && lm[4].y < lm[2].y - 0.02) return "ibuJari";
    if (f2 && f3 && f4 && f5 && ibuKeluar) return "tapak";
    if (f2 && !f3 && !f4 && !f5) return "telunjuk";
    return null;
  }

  /* ============================================================
     HENTI
     ============================================================ */
  function henti(pemain, biarLapis) {
    var p = pemain || sesi;
    if (!p) return;
    if (p.raf) cancelAnimationFrame(p.raf);
    if (p.stream) {
      p.stream.getTracks().forEach(function (t) { t.stop(); });
    }
    if (p.pekerja) {
      try { p.pekerja.postMessage({ type: "tutup" }); } catch (e) { /* abaikan */ }
      p.pekerja = null;
    }
    if (p.pekerjaUrl) {
      try { URL.revokeObjectURL(p.pekerjaUrl); } catch (e) { /* abaikan */ }
      p.pekerjaUrl = null;
    }
    if (p.langsung && typeof p.langsung.close === "function") {
      try { p.langsung.close(); } catch (e) { /* abaikan */ }
      p.langsung = null;
    }
    if (sesi === p) sesi = null;
  }

  window.addEventListener("hashchange", function () { henti(); });

  return { buka: buka, henti: henti };
})();
