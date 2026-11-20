/* ============================================================
   KATA+ AR — KERANGKA UI
   Router hash, toast, modal, konfeti, bar kebolehcapaian,
   kesan reveal & paralaks. Semua elemen dibina dengan JS.
   ============================================================ */
"use strict";

window.UI = (function () {
  var routes = [];
  var pemerhati = null;
  var kurangkanGerak = function () {
    try {
      return window.matchMedia && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("no-anim"));
    } catch (e) { return false; }
  };

  /* ---------- RENDER ---------- */
  function render(html) {
    document.getElementById("view").innerHTML = html;
    lekatPemerhati();
    AudioMesin.hentiCakap();
  }

  function $(sel, akar) {
    return (akar || document).querySelector(sel);
  }
  function semua(sel, akar) {
    return Array.prototype.slice.call((akar || document).querySelectorAll(sel));
  }

  /* ---------- ROUTER ---------- */
  function daftar(pat, renderFn) {
    routes.push({ pat: pat, render: renderFn });
  }

  function hala() {
    var h = (location.hash || "#/").replace(/^#/, "") || "/";
    if (h.length > 1 && h.charAt(h.length - 1) === "/") h = h.slice(0, -1);
    var ditemui = false;
    for (var i = 0; i < routes.length; i++) {
      var m = h.match(routes[i].pat);
      if (m) {
        var hasil = routes[i].render(m);
        render(hasil.html);
        if (hasil.init) hasil.init(m);
        ditemui = true;
        break;
      }
    }
    if (!ditemui) location.hash = "#/";
    aktifNav(h);
    window.scrollTo({ top: 0, behavior: kurangkanGerak() ? "auto" : "smooth" });
    var judul = $("#view h1, #view .kepala-skrin h1");
    if (judul) { judul.setAttribute("tabindex", "-1"); judul.focus({ preventScroll: true }); }
    else { var utama = document.getElementById("utama"); utama.focus({ preventScroll: true }); }
  }

  function aktifNav(h) {
    var peta = {
      "home": /^\/?$/, "belajar": /^\/(belajar|modul)/, "misi": /^\/(misi|adventure)/,
      "ar": /^\/ar$|^\/misi\/3/, "skor": /^\/(skor|lencana|guru)/
    };
    semua("[data-nav]").forEach(function (a) {
      var kunci = a.getAttribute("data-nav");
      a.classList.toggle("aktif", peta[kunci] && peta[kunci].test(h));
    });
  }

  /* ---------- TOAST ---------- */
  function toast(teks, jenis, ikon) {
    var zon = document.getElementById("toast-zone");
    var t = document.createElement("div");
    t.className = "toast toast-" + (jenis || "info");
    t.setAttribute("role", "status");
    t.innerHTML = (ikon ? Ikon.iko(ikon, 18) : "") + "<span>" + teks + "</span>";
    zon.appendChild(t);
    var s = kurangkanGerak() ? 1 : 4;
    setTimeout(function () {
      t.classList.add("tutup");
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, s * 1000);
  }

  function toastXp(n) {
    toast("+" + n + " XP", "xp", "kilat");
  }

  /* ---------- MODAL ---------- */
  function modal(html) {
    var d = document.getElementById("modal");
    var isi = document.getElementById("modalIsi");
    isi.innerHTML = html;
    if (typeof d.showModal === "function") {
      if (!d.open) d.showModal();
    } else {
      d.setAttribute("open", "");
    }
    var tutup = $("[data-tutup-modal]", isi);
    if (tutup) tutup.focus();
    return d;
  }

  function tutupModal() {
    var d = document.getElementById("modal");
    if (d.open) d.close();
    AudioMesin.hentiCakap();
  }

  /* ---------- KONFETI ---------- */
  function konfeti(n) {
    if (kurangkanGerak()) return;
    var k = document.getElementById("konfeti");
    var warna = ["#2e63f0", "#0e9d8c", "#d9507b", "#6f52e0", "#f6c453", "#12865f"];
    var banyak = n || 26;
    for (var i = 0; i < banyak; i++) {
      var p = document.createElement("i");
      p.className = "konfeti-t";
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = warna[Math.floor(Math.random() * warna.length)];
      p.style.animationDuration = (2.2 + Math.random() * 1.4) + "s";
      p.style.animationDelay = (Math.random() * 0.5) + "s";
      p.style.transform = "rotate(" + (Math.random() * 360) + "deg)";
      k.appendChild(p);
      (function (el) {
        setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 4200);
      })(p);
    }
  }

  /* ---------- KESAN REVEAL & PARALAKS ---------- */
  function lekatPemerhati() {
    if (!("IntersectionObserver" in window)) {
      semua(".buka").forEach(function (el) { el.classList.add("nampak"); });
      return;
    }
    if (!pemerhati) {
      pemerhati = new IntersectionObserver(function (entri) {
        entri.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("nampak");
            pemerhati.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });
    }
    semua(".buka").forEach(function (el) {
      if (!el.classList.contains("nampak")) pemerhati.observe(el);
    });
  }

  function lekatParalaks() {
    var pentas = $(".hero-pentas");
    if (!pentas) return;
    if (kurangkanGerak() || (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)) return;
    var kad = semua(".kad-3d", pentas);
    var berjalan = false;
    window.addEventListener("scroll", function () {
      if (berjalan) return;
      berjalan = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 900) {
          kad.forEach(function (k, i) {
            var f = (i - 1) * 26;
            k.style.translate = "0 " + (y * (0.08 + i * 0.02) - f * 0.4) * -0.4 + "px";
          });
        }
        berjalan = false;
      });
    }, { passive: true });
  }

  /* ---------- BAR KEBOLECAPAIAN ---------- */
  function gunaA11y() {
    var s = Store.dapat();
    var h = document.documentElement;
    h.classList.toggle("font-lg", s.a11y.saiz === 1);
    h.classList.toggle("font-xl", s.a11y.saiz === 2);
    h.classList.toggle("dyslexic", !!s.a11y.disleksia);
    h.classList.toggle("kontras", !!s.a11y.kontras);
    h.classList.toggle("no-anim", !!s.a11y.noanim);
  }

  function bukaPopA11y() {
    var pop = document.getElementById("popA11y");
    if (!pop.hidden) { pop.hidden = true; return; }
    var s = Store.dapat();
    var h = document.documentElement;
    pop.innerHTML =
      '<h3>Kebolehcapaian</h3>' +
      '<div class="pop-item"><span>Saiz teks</span><span class="pop-langkah">' +
      '<button class="btn btn-ghost btn-kecil" data-a11y-saiz="-1" aria-label="Kurangkan saiz teks">A−</button>' +
      '<button class="btn btn-ghost btn-kecil" data-a11y-saiz="1" aria-label="Besarkan saiz teks">A+</button></span></div>' +
      '<div class="pop-item"><span>Font disleksia</span><button class="togol ' + (s.a11y.disleksia ? "hidup" : "") + '" data-a11y="disleksia" role="switch" aria-checked="' + !!s.a11y.disleksia + '" aria-label="Font disleksia"></button></div>' +
      '<div class="pop-item"><span>Kontras tinggi</span><button class="togol ' + (s.a11y.kontras ? "hidup" : "") + '" data-a11y="kontras" role="switch" aria-checked="' + !!s.a11y.kontras + '" aria-label="Kontras tinggi"></button></div>' +
      '<div class="pop-item"><span>Kurang animasi</span><button class="togol ' + (s.a11y.noanim ? "hidup" : "") + '" data-a11y="noanim" role="switch" aria-checked="' + !!s.a11y.noanim + '" aria-label="Kurang animasi"></button></div>' +
      '<div class="pop-item"><span>Bunyi</span><button class="togol ' + (s.sound ? "hidup" : "") + '" data-a11y="bunyi" role="switch" aria-checked="' + !!s.sound + '" aria-label="Bunyi"></button></div>' +
      '<div class="pop-item"><span>Kemajuan</span><button class="btn btn-ghost btn-kecil" data-a11y="reset">Tetapkan semula</button></div>';
    pop.hidden = false;
    var p = $("[data-a11y-saiz='-1']", pop);
    if (p) p.focus();
  }

  function tukarA11y(kunci, nilai) {
    var s = Store.dapat();
    if (kunci === "saiz") {
      s.a11y.saiz = Math.max(0, Math.min(2, s.a11y.saiz + nilai));
    } else if (kunci === "bunyi") {
      s.sound = !s.sound;
      AudioMesin.setHidup(s.sound);
      bunyiUI();
    } else if (kunci === "reset") {
      tutupPopA11y();
      modal(
        '<div class="modal-kepala"><h2>Tetapkan semula kemajuan?</h2></div>' +
        '<div class="modal-badan"><p>Semua XP, lencana dan skor akan dipadamkan daripada peranti ini. Tindakan ini tidak boleh dibatalkan.</p>' +
        '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
        '<button class="btn btn-ghost" data-tutup-modal>Batal</button>' +
        '<button class="btn btn-utama" data-sah-reset>Ya, tetapkan semula</button></div></div>'
      );
      return;
    } else {
      s.a11y[kunci] = !s.a11y[kunci];
    }
    Store.simpan();
    gunaA11y();
    if (kunci === "bunyi") syncTogol("bunyi", s.sound);
    else if (kunci !== "saiz") syncTogol(kunci, s.a11y[kunci]);
    UI.toast(kunci === "bunyi" ? (s.sound ? "Bunyi dihidupkan" : "Bunyi dimatikan") : "Tetapan disimpan", "info");
  }

  function syncTogol(kunci, hidup) {
    var butang = $("#popA11y [data-a11y='" + kunci + "']");
    if (!butang) return;
    butang.classList.toggle("hidup", !!hidup);
    butang.setAttribute("aria-checked", String(!!hidup));
  }

  function tutupPopA11y() {
    var pop = document.getElementById("popA11y");
    pop.hidden = true;
  }

  /* ---------- BUNYI & XP UI ---------- */
  function bunyiUI() {
    var b = document.getElementById("btnBunyi");
    if (!b) return;
    var hidup = AudioMesin.getHidup();
    b.innerHTML = Ikon.iko(hidup ? "pembesarSuara" : "pembesarSuaraX", 20);
    b.setAttribute("aria-label", hidup ? "Bunyi: hidup" : "Bunyi: mati");
    b.setAttribute("aria-pressed", String(hidup));
  }

  function kepalaXP() {
    var t = document.getElementById("teksXp");
    if (t) t.textContent = Store.dapat().xp + " XP";
  }

  /* ---------- UTILITI ---------- */
  function acak(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function dengar(teks) {
    AudioMesin.bangunkan();
    AudioMesin.cakap(teks);
  }

  function esc(html) {
    return String(html).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function chipKategori(id) {
    var k = DataApp.KATEGORI[id];
    if (!k) return "";
    return '<span class="cip cip-kat ' + id + '">' + Ikon.iko(k.ikon, 15) + k.label + "</span>";
  }

  function ikonKategori(id, s) {
    var k = DataApp.KATEGORI[id];
    return Ikon.iko(k.ikon, s || 22);
  }

  return {
    daftar: daftar, hala: hala, render: render,
    $: $, semua: semua, acak: acak, esc: esc, dengar: dengar,
    toast: toast, toastXp: toastXp,
    modal: modal, tutupModal: tutupModal,
    konfeti: konfeti,
    lekatParalaks: lekatParalaks, kurangkanGerak: kurangkanGerak,
    gunaA11y: gunaA11y, bukaPopA11y: bukaPopA11y, tukarA11y: tukarA11y, tutupPopA11y: tutupPopA11y,
    bunyiUI: bunyiUI, kepalaXP: kepalaXP,
    chipKategori: chipKategori, ikonKategori: ikonKategori
  };
})();
