import assert from "node:assert/strict";
import { test } from "node:test";
import { hitungSisa, statusAcara } from "./hitung-sisa.ts";

const DETIK = 1000;

test("memecah sisa waktu jadi hari, jam, menit, detik", () => {
  const sisa = hitungSisa(0 + (2 * 86_400 + 3 * 3_600 + 4 * 60 + 5) * DETIK, 0);
  assert.deepEqual(sisa, { hari: 2, jam: 3, menit: 4, detik: 5 });
});

test("acara yang tinggal beberapa jam tetap punya hari 0", () => {
  const sisa = hitungSisa(13 * 3_600 * DETIK, 0);
  assert.deepEqual(sisa, { hari: 0, jam: 13, menit: 0, detik: 0 });
});

test("tepat di detik acara dimulai sudah dianggap lewat", () => {
  assert.equal(hitungSisa(1_000, 1_000), null);
});

test("acara yang sudah lewat menghasilkan null", () => {
  assert.equal(hitungSisa(0, 5_000), null);
});

test("sisa di bawah satu detik tidak dibulatkan jadi satu detik", () => {
  assert.deepEqual(hitungSisa(999, 0), { hari: 0, jam: 0, menit: 0, detik: 0 });
});

test("sebelum jam mulai, acara masih dihitung menuju", () => {
  assert.equal(statusAcara(1_000, 9_000, 999), "menuju");
});

test("tepat saat jam mulai, acara sudah berlangsung", () => {
  assert.equal(statusAcara(1_000, 9_000, 1_000), "berlangsung");
});

test("di tengah acara, statusnya berlangsung bukan selesai", () => {
  assert.equal(statusAcara(1_000, 9_000, 8_999), "berlangsung");
});

test("tepat saat jam selesai, acara dianggap selesai", () => {
  assert.equal(statusAcara(1_000, 9_000, 9_000), "selesai");
});
