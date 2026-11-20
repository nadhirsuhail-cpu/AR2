/* ============================================================
   KATA+ AR — BOOT & PENDAWAIAN
   ============================================================ */
"use strict";

(function () {
  function butMula() {
    var s = Store.muat();
    AudioMesin.setHidup(s.sound);
    UI.gunaA11y();
    UI.bunyiUI();
    UI.kepalaXP();

    /* Splash */
    var splash = document.getElementById("splash");
    var mula = performance.now();
    function tutupSplash() {
      var tunggu = Math.max(0, 900 - (performance.now() - mula));
      setTimeout(function () {
        splash.classList.add("tutup");
        setTimeout(function () { splash.remove(); }, 600);
      }, tunggu);
    }
    window.addEventListener("load", tutupSplash);
    setTimeout(tutupSplash, 2000); // jaring keselamatan

    /* Bunyi */
    document.addEventListener("click", function () { AudioMesin.bangunkan(); }, { passive: true });

    /* Butang kepala */
    document.getElementById("btnBunyi").addEventListener("click", function () {
      UI.tukarA11y("bunyi");
      AudioMesin.klik();
    });
    document.getElementById("btnA11y").addEventListener("click", function () {
      UI.bukaPopA11y();
      AudioMesin.klik();
    });
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-a11y]");
      if (t) {
        var kunci = t.getAttribute("data-a11y");
        if (kunci === "reset") UI.tukarA11y("reset");
        else { UI.tukarA11y(kunci); AudioMesin.klik(); }
        return;
      }
      var saiz = e.target.closest("[data-a11y-saiz]");
      if (saiz) {
        UI.tukarA11y("saiz", parseInt(saiz.getAttribute("data-a11y-saiz"), 10));
        AudioMesin.klik();
        return;
      }
      if (!e.target.closest(".pop-a11y") && !e.target.closest("#btnA11y")) {
        UI.tutupPopA11y();
      }
    });

    /* Reset disahkan */
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-sah-reset]");
      if (t) {
        Store.setSemula();
        AudioMesin.setHidup(true);
        UI.gunaA11y(); UI.bunyiUI(); UI.kepalaXP();
        UI.tutupModal();
        UI.toast("Kemajuan telah ditetapkan semula", "info");
        setTimeout(function () { location.hash = "#/"; }, 250);
      }
      var tutup = e.target.closest("[data-tutup-modal]");
      if (tutup) { UI.tutupModal(); AudioMesin.klik(); }
    });

    /* Klik luar modal = tutup */
    var dlg = document.getElementById("modal");
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) UI.tutupModal();
    });
    dlg.addEventListener("close", function () { AudioMesin.hentiCakap(); });

    /* Bunyi klik pada butang */
    document.addEventListener("click", function (e) {
      if (e.target.closest(".btn")) AudioMesin.klik();
    }, { passive: true });

    /* TTS atas permintaan */
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-dengar]");
      if (t) {
        e.preventDefault();
        UI.dengar(t.getAttribute("data-dengar"));
      }
    });

    /* ESC */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") UI.tutupPopA11y();
    });

    /* Router */
    window.addEventListener("hashchange", function () { UI.hala(); });
    UI.hala();

    /* Onboarding kali pertama */
    var st = Store.dapat();
    if (!st.onboarded) {
      setTimeout(function () { Screens.onboardingBuka(); }, 1200);
    }
  }

  /* Daftar laluan */
  UI.daftar(/^\/?$/, function () { return Screens.home(); });
  UI.daftar(/^\/belajar$/, function () { return Screens.belajar(); });
  UI.daftar(/^\/modul\/(jarak|perasaan|pancaindera)$/, function (m) { return Screens.modul(m[1]); });
  UI.daftar(/^\/misi$/, function () { return Screens.misi(); });
  UI.daftar(/^\/misi\/2$/, function () { return Screens.sentuhPilih(); });
  UI.daftar(/^\/misi\/3$/, function () { return Screens.ar(); });
  UI.daftar(/^\/ar$/, function () { return Screens.ar(); });
  UI.daftar(/^\/misi\/4$/, function () { return Screens.binaAyat(); });
  UI.daftar(/^\/misi\/5$/, function () { return Screens.cabaran(); });
  UI.daftar(/^\/adventure$/, function () { return Screens.adventure(); });
  UI.daftar(/^\/skor$/, function () { return Screens.skor(); });
  UI.daftar(/^\/lencana$/, function () { return Screens.lencana(); });
  UI.daftar(/^\/guru$/, function () { return Screens.guru(); });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", butMula);
  } else {
    butMula();
  }
})();
