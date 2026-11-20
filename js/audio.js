/* ============================================================
   KATA+ AR — ENJIN AUDIO
   Semua bunyi disintesis dengan Web Audio API (tiada fail,
   muat pantas). Bunyi lembut — tiada kesan yang kasar.
   Audio boleh dimatikan sepenuhnya (tetapan pengguna).
   ============================================================ */
"use strict";

window.AudioMesin = (function () {
  var ctx = null;
  var hidup = true;

  function pastikanCtx() {
    if (!ctx) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
      } catch (e) {
        ctx = null;
      }
    }
    if (ctx && ctx.state === "suspended") {
      try { ctx.resume(); } catch (e) { /* abaikan */ }
    }
    return ctx;
  }

  function setHidup(h) { hidup = !!h; }
  function getHidup() { return hidup; }

  /** Bangunkan konteks pada gerak isyarat pertama pengguna. */
  function bangunkan() { pastikanCtx(); }

  function nada(frek, mula, tempoh, jenis, puncak) {
    var c = ctx;
    if (!c || !hidup) return;
    try {
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = jenis || "sine";
      o.frequency.setValueAtTime(frek, c.currentTime + mula);
      g.gain.setValueAtTime(0.0001, c.currentTime + mula);
      g.gain.exponentialRampToValueAtTime(puncak || 0.16, c.currentTime + mula + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + mula + tempoh);
      o.connect(g); g.connect(c.destination);
      o.start(c.currentTime + mula);
      o.stop(c.currentTime + mula + tempoh + 0.05);
    } catch (e) { /* abaikan */ }
  }

  function glissando(f1, f2, mula, tempoh, jenis, puncak) {
    var c = ctx;
    if (!c || !hidup) return;
    try {
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = jenis || "sine";
      o.frequency.setValueAtTime(f1, c.currentTime + mula);
      o.frequency.exponentialRampToValueAtTime(f2, c.currentTime + mula + tempoh);
      g.gain.setValueAtTime(0.0001, c.currentTime + mula);
      g.gain.exponentialRampToValueAtTime(puncak || 0.14, c.currentTime + mula + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + mula + tempoh);
      o.connect(g); g.connect(c.destination);
      o.start(c.currentTime + mula);
      o.stop(c.currentTime + mula + tempoh + 0.05);
    } catch (e) { /* abaikan */ }
  }

  function desah(mula, tempoh, potongan, puncak) {
    var c = ctx;
    if (!c || !hidup) return;
    try {
      var len = Math.max(1, Math.floor(c.sampleRate * tempoh));
      var buf = c.createBuffer(1, len, c.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      var src = c.createBufferSource();
      src.buffer = buf;
      var tapis = c.createBiquadFilter();
      tapis.type = "lowpass";
      tapis.frequency.setValueAtTime(potongan || 1000, c.currentTime + mula);
      tapis.frequency.exponentialRampToValueAtTime(180, c.currentTime + mula + tempoh);
      var g = c.createGain();
      g.gain.setValueAtTime(0.0001, c.currentTime + mula);
      g.gain.exponentialRampToValueAtTime(puncak || 0.12, c.currentTime + mula + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + mula + tempoh);
      src.connect(tapis); tapis.connect(g); g.connect(c.destination);
      src.start(c.currentTime + mula);
    } catch (e) { /* abaikan */ }
  }

  /* ---------- BUNYI-BUNYI APLIKASI ---------- */

  /** Kejayaan: lonceng dua nada lembut */
  function berjaya() {
    if (!pastikanCtx()) return;
    nada(659.25, 0, 0.22, "sine", 0.14);
    nada(880, 0.09, 0.3, "sine", 0.13);
  }

  /** Jawapan salah: nada rendah lembut, BUKAN bunyi kasar */
  function gagal() {
    if (!pastikanCtx()) return;
    glissando(392, 311, 0, 0.26, "sine", 0.09);
  }

  /** Petunjuk: nada tunggal ringan */
  function petunjuk() {
    if (!pastikanCtx()) return;
    nada(587.33, 0, 0.24, "triangle", 0.11);
  }

  /** Klik butang: sangat ringan */
  function klik() {
    if (!pastikanCtx()) return;
    nada(1100, 0, 0.045, "sine", 0.05);
  }

  /** Lencana dibuka: arpeggio pendek */
  function lencana() {
    if (!pastikanCtx()) return;
    var n = [523.25, 659.25, 783.99, 1046.5];
    for (var i = 0; i < n.length; i++) nada(n[i], i * 0.1, 0.28, "triangle", 0.13);
  }

  /** Bunyi merdu: melodi pentatonik pendek (untuk soalan audio) */
  function merdu() {
    if (!pastikanCtx()) return;
    var m = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
    for (var i = 0; i < m.length; i++) nada(m[i], i * 0.14, 0.26, "triangle", 0.12);
  }

  /** Bunyi bising: desah rendah (untuk soalan audio) */
  function bising() {
    if (!pastikanCtx()) return;
    desah(0, 0.85, 900, 0.16);
    desah(0.1, 0.7, 500, 0.1);
  }

  /** Bunyi tangkap kad AR */
  function tangkap() {
    if (!pastikanCtx()) return;
    glissando(520, 920, 0, 0.18, "sine", 0.12);
    nada(1318.5, 0.12, 0.2, "sine", 0.08);
  }

  /** Sapuan untuk swipe */
  function sapu() {
    if (!pastikanCtx()) return;
    desah(0, 0.24, 1800, 0.08);
  }

  /* ---------- SUARA (TTS Bahasa Melayu) ---------- */
  function cakap(teks) {
    if (!hidup) return;
    try {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(teks);
      u.lang = "ms-MY";
      u.rate = 0.95;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) { /* abaikan */ }
  }

  function hentiCakap() {
    try { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); } catch (e) { /* abaikan */ }
  }

  return {
    setHidup: setHidup, getHidup: getHidup,
    bangunkan: bangunkan,
    berjaya: berjaya, gagal: gagal, petunjuk: petunjuk,
    klik: klik, lencana: lencana,
    merdu: merdu, bising: bising,
    tangkap: tangkap, sapu: sapu,
    cakap: cakap, hentiCakap: hentiCakap
  };
})();
