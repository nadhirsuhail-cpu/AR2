/* ============================================================
   KATA+ AR — PERPUSTAKAAN IKON & ILUSTRASI
   Ikonic stroke asli (gaya garisan minimal, 24x24, tiada emoji).
   ============================================================ */
"use strict";

window.Ikon = (function () {
  var J = {
    play: '<polygon points="6 3 20 12 6 21 6 3"/>',
    anakPanahKanan: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    anakPanahKiri: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    chevronKanan: '<path d="m9 18 6-6-6-6"/>',
    semak: '<path d="M20 6 9 17l-5-5"/>',
    semakBulat: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    silang: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    pembesarSuara: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    pembesarSuaraX: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
    maklumat: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    soalan: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    kamera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    tangan: '<path d="M18 11V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    mata: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    telinga: '<path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0"/><path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4"/>',
    muzik: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    pembaris: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
    jantung: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    sasaran: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    trofi: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    pingat: '<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>',
    anugerah: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    bintang: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    kilau: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    kilat: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    ulang: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    lampu: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    perisai: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    kunci: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    fonKepala: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 0 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>',
    carta: '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
    pencetak: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    pengguna: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    buku: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    rumah: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    gerak: '<polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><path d="M2 12h20"/><path d="M12 2v20"/>',
    pensel: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    jam: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    angin: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
    /* Isyarat tangan — glyph abstrak asli, sentiasa dipasangkan dengan label teks */
    tapakTerbuka: '<circle cx="12" cy="14.5" r="4.2"/><path d="M12 10V5.2"/><path d="M8.4 10.6 7 6.4"/><path d="M15.6 10.6 17 6.4"/><path d="M6.8 13.6 2.8 12"/><path d="M17.2 13.6 21.2 12"/>',
    telunjuk: '<circle cx="12" cy="16" r="4.2"/><path d="M12 11.8V4.5"/><path d="m9.6 7.2 2.4-2.4 2.4 2.4"/>',
    swai: '<path d="M20 12h-8.5"/><path d="m17.5 8.5 3 3.5-3 3.5"/><path d="M4 12h4.5"/><path d="m6.5 8.5-3 3.5 3 3.5"/>',
    cubit: '<circle cx="9" cy="9" r="2.4"/><circle cx="15" cy="15" r="2.4"/><path d="M11.4 11.4 12.6 12.6"/>',
    ibuJari: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    angkatTangan: '<path d="M6 21v-7"/><path d="M6 14V7a2.5 2.5 0 0 1 5 0v7"/><path d="M11 14V4.5a2.5 2.5 0 0 1 5 0V14"/><path d="M16 14V7a2.5 2.5 0 0 1 5 0v7"/><path d="M21 14a4 4 0 0 1-4 4h-4"/><path d="M13 18H6.4a2.6 2.6 0 0 1-1.9-4.4L8 10.2"/>',
    dedah: '<path d="M3 3l18 18"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/>',
    lutut: '<circle cx="9" cy="7" r="4"/><path d="M22 17a10 10 0 0 0-20 0"/>'
  };

  function iko(nama, saiz) {
    var s = saiz || 22;
    return '<svg class="iko" style="width:' + s + 'px;height:' + s + 'px" viewBox="0 0 24 24" aria-hidden="true">' + (J[nama] || '') + '</svg>';
  }

  /* ============================================================
     ILUSTRASI WAJAH (Modul Perasaan) — SVG asli, ekspresif,
     animasi halus melalui CSS pada kening & mulut.
     ============================================================ */
  function wajah(emosi) {
    var mata, mulut, kening = '', tambahan = '';
    var W = {
      gembira: {
        mata: '<path d="M32 54q5-6 11 0" fill="none"/><path d="M77 54q5-6 11 0" fill="none"/>',
        mulut: '<path d="M43 72q17 16 34 0" fill="none"/>',
        kening: '',
        tambahan: ''
      },
      sedih: {
        mata: '<path d="M35 56q5 5 10 0" fill="none"/><path d="M75 56q5 5 10 0" fill="none"/>',
        mulut: '<path d="M45 86q15-14 30 0" fill="none"/>',
        kening: '<path d="M34 48q6-4 11-1" fill="none"/><path d="M75 47q5-3 11 1" fill="none"/>',
        tambahan: '<path d="M40 66q0 8 5 11" fill="#9fd8ff" stroke="none"/>'
      },
      takut: {
        mata: '<circle cx="40" cy="57" r="7.5" fill="#fff"/><circle cx="80" cy="57" r="7.5" fill="#fff"/><circle cx="40" cy="57" r="3" fill="#3a2e2a"/><circle cx="80" cy="57" r="3" fill="#3a2e2a"/>',
        mulut: '<ellipse cx="60" cy="80" rx="7" ry="11" fill="none"/>',
        kening: '<path d="M32 45q8-6 16-1" fill="none"/><path d="M72 44q8-5 16 1" fill="none"/>',
        tambahan: ''
      },
      marah: {
        mata: '<circle cx="40" cy="57" r="4.5" fill="none"/><circle cx="80" cy="57" r="4.5" fill="none"/>',
        mulut: '<path d="M44 82q16-8 32 0" fill="none"/>',
        kening: '<path d="M33 50 48 43" fill="none"/><path d="M72 43l15 7" fill="none"/>',
        tambahan: ''
      },
      kecewa: {
        mata: '<path d="M34 57q6 4 11 0" fill="none"/><path d="M75 57q5 4 11 0" fill="none"/>',
        mulut: '<path d="M48 78h24" fill="none"/>',
        kening: '<path d="M35 48q5 3 10 0" fill="none"/><path d="M75 48q5 3 10 0" fill="none"/>',
        tambahan: ''
      },
      bangga: {
        mata: '<path d="M32 54q5-6 11 0" fill="none"/><path d="M77 54q5-6 11 0" fill="none"/>',
        mulut: '<path d="M44 72q16 13 32 0" fill="none"/>',
        kening: '<path d="M34 47q6-3 11 0" fill="none"/><path d="M75 47q5-3 11 0" fill="none"/>',
        tambahan: '<path d="M92 34l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z" fill="#f6c453" stroke="none"/>'
      }
    };
    var w = W[emosi] || W.gembira;
    return '<svg viewBox="0 0 120 120" role="img" aria-label="Wajah ' + emosi + '">' +
      '<circle cx="60" cy="62" r="46" fill="#fbe3c7" stroke="#3a2e2a" stroke-width="3"/>' +
      '<g stroke="#3a2e2a" stroke-width="3.5" stroke-linecap="round" fill="none">' + w.kening + w.mata + w.mulut + '</g>' +
      w.tambahan + '</svg>';
  }

  /* ============================================================
     ILUSTRASI OBJEK (Modul Pancaindera) — SVG rata lembut,
     gaya konsisten, tiada emoji.
     ============================================================ */
  function objek(id) {
    var O = {
      limau: '<svg viewBox="0 0 120 120" role="img" aria-label="Sebiji limau">' +
        '<ellipse cx="60" cy="68" rx="38" ry="34" fill="#f7d33e" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M54 64h12M50 74h20M56 84h8" stroke="#3a3a2e" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M60 34q-2-12 8-18" fill="none" stroke="#3a3a2e" stroke-width="2.5" stroke-linecap="round"/>' +
        '<path d="M60 30q6-10 18-12-4 12-18 12z" fill="#7bbf4d" stroke="#3a3a2e" stroke-width="2.5"/></svg>',
      madu: '<svg viewBox="0 0 120 120" role="img" aria-label="Balang madu">' +
        '<rect x="38" y="46" width="44" height="52" rx="10" fill="#f2a93b" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<rect x="48" y="30" width="24" height="18" rx="4" fill="#e09025" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M46 60h28M46 72h28M46 84h20" stroke="#8a5a12" stroke-width="2" stroke-linecap="round" opacity="0.7"/>' +
        '<path d="M40 38h40" stroke="#3a3a2e" stroke-width="2.5"/></svg>',
      garam: '<svg viewBox="0 0 120 120" role="img" aria-label="Bekas garam">' +
        '<rect x="42" y="34" width="36" height="46" rx="8" fill="#eef1f4" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<rect x="52" y="22" width="16" height="12" rx="3" fill="#d7dce2" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<g fill="#3a3a2e" stroke="none"><circle cx="52" cy="48" r="1.6"/><circle cx="60" cy="44" r="1.6"/><circle cx="68" cy="50" r="1.6"/>' +
        '<circle cx="50" cy="58" r="1.6"/><circle cx="64" cy="60" r="1.6"/><circle cx="70" cy="68" r="1.6"/><circle cx="56" cy="70" r="1.6"/></g></svg>',
      kopi: '<svg viewBox="0 0 120 120" role="img" aria-label="Secawan kopi pahit">' +
        '<path d="M36 52h48v26a18 18 0 0 1-18 18H54a18 18 0 0 1-18-18z" fill="#fff" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M84 58h8a8 8 0 0 1 0 16h-8" fill="none" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M30 52l4-8h52l4 8z" fill="#a5633a" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M48 64c2 5 8 5 10 0M62 64c2 5 8 5 10 0" stroke="#a5633a" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>',
      bunga: '<svg viewBox="0 0 120 120" role="img" aria-label="Bunga yang harum">' +
        '<g stroke="#3a3a2e" stroke-width="2.2"><path d="M60 70v34"/><path d="M60 88q-14 2-20-8"/><path d="M60 82q14 2 20-8"/></g>' +
        '<ellipse cx="46" cy="86" rx="10" ry="5" fill="#7bbf4d"/><ellipse cx="74" cy="86" rx="10" ry="5" fill="#7bbf4d"/>' +
        '<circle cx="60" cy="52" r="9" fill="#f6c453"/>' +
        '<g fill="#f28db4" stroke="#3a3a2e" stroke-width="2"><ellipse cx="60" cy="34" rx="11" ry="14"/><ellipse cx="46" cy="44" rx="11" ry="14" transform="rotate(-35 46 44)"/>' +
        '<ellipse cx="74" cy="44" rx="11" ry="14" transform="rotate(35 74 44)"/><ellipse cx="44" cy="62" rx="11" ry="14" transform="rotate(35 44 62)"/>' +
        '<ellipse cx="76" cy="62" rx="11" ry="14" transform="rotate(-35 76 62)"/></g></svg>',
      sampah: '<svg viewBox="0 0 120 120" role="img" aria-label="Tong sampah">' +
        '<path d="M38 46h44l-5 46a10 10 0 0 1-10 9H53a10 10 0 0 1-10-9z" fill="#c9ced6" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M44 34h32" stroke="#3a3a2e" stroke-width="2.5"/><path d="M52 34l2-8h12l2 8" fill="#c9ced6" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M48 64q8-8 16 0M64 64q8-8 16 0" stroke="#7a8a5a" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/></svg>',
      kapas: '<svg viewBox="0 0 120 120" role="img" aria-label="Kapas yang lembut">' +
        '<circle cx="46" cy="52" r="20" fill="#f4f6f9" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<circle cx="72" cy="46" r="24" fill="#f4f6f9" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<circle cx="62" cy="68" r="22" fill="#f4f6f9" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<circle cx="80" cy="66" r="14" fill="#f4f6f9" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M28 76q14-4 22-14M86 30q10 6 14 14" stroke="#3a3a2e" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
      batu: '<svg viewBox="0 0 120 120" role="img" aria-label="Batu yang kasar">' +
        '<path d="M34 82 44 54l20-18 24 24-8 24z" fill="#aab2bd" stroke="#3a3a2e" stroke-width="2.5" stroke-linejoin="round"/>' +
        '<path d="M44 54l12-4M64 36l14 4" stroke="#7c858f" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M30 96h62" stroke="#3a3a2e" stroke-width="2.5" stroke-linecap="round"/></svg>',
      lampu: '<svg viewBox="0 0 120 120" role="img" aria-label="Lampu yang terang">' +
        '<g stroke="#f6c453" stroke-width="3" stroke-linecap="round"><path d="M60 26V14"/><path d="M40 32 32 22"/><path d="M80 32l8-10"/><path d="M26 56H14"/><path d="M94 56h12"/></g>' +
        '<circle cx="60" cy="62" r="26" fill="#ffe08a" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M54 62h12" stroke="#3a3a2e" stroke-width="2.2" stroke-linecap="round"/><path d="M60 56v12" stroke="#3a3a2e" stroke-width="2.2" stroke-linecap="round"/>' +
        '<rect x="52" y="92" width="16" height="10" rx="3" fill="#c9ced6" stroke="#3a3a2e" stroke-width="2.2"/></svg>',
      malam: '<svg viewBox="0 0 120 120" role="img" aria-label="Malam yang gelap">' +
        '<rect x="14" y="14" width="92" height="92" rx="20" fill="#2c3050" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M78 30a16 16 0 1 0 12 28 20 20 0 0 1-12-28z" fill="#f6e7a8"/>' +
        '<g fill="#f6e7a8" stroke="none"><circle cx="34" cy="38" r="2"/><circle cx="44" cy="52" r="1.6"/><circle cx="58" cy="34" r="1.6"/><circle cx="38" cy="64" r="1.6"/></g>' +
        '<path d="M24 90h72" stroke="#3a3a2e" stroke-width="2.5" stroke-linecap="round"/></svg>',
      gitar: '<svg viewBox="0 0 120 120" role="img" aria-label="Gitar yang merdu">' +
        '<path d="M48 26h24" stroke="#3a3a2e" stroke-width="2.5"/><path d="M54 26v10l-6 4" stroke="#3a3a2e" stroke-width="2.5" fill="none"/>' +
        '<circle cx="52" cy="26" r="3" fill="#f2a93b" stroke="#3a3a2e" stroke-width="2"/><circle cx="68" cy="26" r="3" fill="#f2a93b" stroke="#3a3a2e" stroke-width="2"/>' +
        '<path d="M40 66c8-4 14-8 20-20 4-8 8-14 8-20 10 10 6 20-2 30-10 12-18 16-26 10z" fill="#c98a4b" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<circle cx="52" cy="74" r="9" fill="#8a5a2a" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M42 76 34 96M62 76l10 20" stroke="#3a3a2e" stroke-width="2" stroke-linecap="round"/></svg>',
      pembinaan: '<svg viewBox="0 0 120 120" role="img" aria-label="Tapak pembinaan yang bising">' +
        '<path d="M20 96h80" stroke="#3a3a2e" stroke-width="2.5" stroke-linecap="round"/>' +
        '<path d="M36 96V60h48v36" fill="#f2a93b" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M36 60 60 38l24 22" fill="#f7d33e" stroke="#3a3a2e" stroke-width="2.5"/>' +
        '<path d="M28 96V78M92 96V78" stroke="#c9ced6" stroke-width="2.5"/>' +
        '<g stroke="#3a3a2e" stroke-width="2.5" stroke-linecap="round"><path d="M22 46v10M17 46v8M27 46v8"/><path d="M22 34h16"/><path d="M30 34 22 56"/></g></svg>'
    };
    return O[id] || '';
  }

  /* Kad objek untuk soalan jarak: dua titik A & B pada trek */
  function jarakVisual(jarakNilai) {
    // jarakNilai: 0..100 (%)
    var px = 6 + (jarakNilai / 100) * 88;
    return '<svg viewBox="0 0 300 110" style="width:100%;max-width:340px" role="img" aria-label="Dua objek pada jarak tertentu">' +
      '<line x1="20" y1="80" x2="280" y2="80" stroke="currentColor" stroke-width="2" stroke-dasharray="6 7" opacity="0.35"/>' +
      '<circle cx="' + 20 + '" cy="80" r="16" fill="#dde3ea" stroke="currentColor" stroke-width="2.5"/>' +
      '<text x="' + 20 + '" y="85.5" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor" opacity="0.75">A</text>' +
      '<circle cx="' + px + '" cy="80" r="16" fill="#dce6ff" stroke="currentColor" stroke-width="2.5"/>' +
      '<text x="' + px + '" y="85.5" text-anchor="middle" font-size="15" font-weight="800" fill="currentColor" opacity="0.75">B</text>' +
      '<text x="' + 20 + '" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" opacity="0.55">Objek A</text>' +
      '<text x="' + px + '" y="106" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" opacity="0.55">Objek B</text>' +
      '</svg>';
  }

  return { J: J, iko: iko, wajah: wajah, objek: objek, jarakVisual: jarakVisual };
})();
