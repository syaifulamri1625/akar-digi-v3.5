/**
 * Layanan Cache Cerdas untuk Mempercepat Pembacaan Matriks Drive
 */
var CACHE_EXPIRATION_SEC = 300; // Cache berlaku selama 5 menit

function getCachedStandardsData(tahunAjaran) {
  var cache = CacheService.getScriptCache();
  var cacheKey = "standards_data_" + tahunAjaran;
  var cachedData = cache.get(cacheKey);
  
  if (cachedData) {
    // Jika data ada di memori cache, kembalikan secara instan (Super Cepat!)
    return JSON.parse(cachedData);
  }
  
  // Jika belum ada atau kedaluwarsa, jalankan fungsi pemindaian asli
  var freshData = getStandardsData(tahunAjaran);
  
  try {
    // Simpan hasil ke cache
    cache.put(cacheKey, JSON.stringify(freshData), CACHE_EXPIRATION_SEC);
  } catch (e) {
    // Abaikan jika ukuran data melebihi batas maksimal cache
  }
  
  return freshData;
}

/**
 * Hapus cache secara otomatis setiap kali ada file baru yang diunggah
 */
function clearStandardsCache(tahunAjaran) {
  var cache = CacheService.getScriptCache();
  cache.remove("standards_data_" + tahunAjaran);
}