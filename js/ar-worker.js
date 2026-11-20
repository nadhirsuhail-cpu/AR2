/* ============================================================
   KATA+ AR — PEKERJA PENGESAN TANGAN (MediaPipe Hand Landmarker)
   Pekerja klasik (BUKAN module): inferens di luar benang UI
   supaya animasi kekal lancar. 21 titik tangan dihantar balik.
   ============================================================ */
"use strict";

var landmarker = null;
var sibuk = false;

self.onmessage = async function (ev) {
  var m = ev.data;

  if (m.type === "init") {
    try {
      var vision = await import(m.wasmBundleUrl);
      var fileset = await vision.FilesetResolver.forVisionTasks(m.wasmDirUrl);
      var pilihan = {
        baseOptions: { modelAssetPath: m.modelUrl, delegate: "GPU" },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      };
      var delegateTerpakai = "GPU";
      try {
        landmarker = await vision.HandLandmarker.createFromOptions(fileset, pilihan);
      } catch (eGpu) {
        pilihan.baseOptions.delegate = "CPU";
        landmarker = await vision.HandLandmarker.createFromOptions(fileset, pilihan);
        delegateTerpakai = "CPU";
      }
      self.postMessage({ type: "sedia", delegate: delegateTerpakai });
    } catch (ralat) {
      self.postMessage({ type: "ralat", msg: String((ralat && ralat.message) || ralat) });
    }
    return;
  }

  if (m.type === "detect" && landmarker) {
    if (sibuk) { try { m.img.close(); } catch (e) { /* abaikan */ } return; }
    sibuk = true;
    try {
      var hasil = landmarker.detectForVideo(m.img, m.ts);
      var lm = hasil.landmarks && hasil.landmarks[0]
        ? hasil.landmarks[0].map(function (p) {
            return { x: p.x, y: p.y, v: typeof p.visibility === "number" ? p.visibility : 1 };
          })
        : null;
      self.postMessage({ type: "landmarks", id: m.id, lm: lm });
    } catch (e) {
      self.postMessage({ type: "landmarks", id: m.id, lm: null });
    } finally {
      if (m.img && typeof m.img.close === "function") m.img.close();
      sibuk = false;
    }
  }

  if (m.type === "tutup") {
    if (landmarker && typeof landmarker.close === "function") {
      try { landmarker.close(); } catch (e) { /* abaikan */ }
    }
    landmarker = null;
    self.close();
  }
};
