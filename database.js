// --- DATABASE ALKEMIS UNIVERSAL (Dihasilkan dengan Bantuan AI) ---
const recipes = {
    // TIER 1: Kombinasi Dasar
    "Air+Api": "Uap",
    "Api+Tanah": "Lava",
    "Air+Tanah": "Lumpur",
    "Api+Udara": "Energi",
    "Air+Udara": "Kabut",
    "Tanah+Udara": "Debu",

    // TIER 2: Menggunakan Hasil Tier 1
    "Lava+Udara": "Batu",
    "Api+Lumpur": "Batu Bata",
    "Energi+Uap": "Petir",
    "Air+Batu": "Pasir",
    "Api+Batu": "Logam",
    "Air+Debu": "Hujan",
    "Api+Pasir": "Kaca",

    // TIER 3: Kombinasi Lebih Kompleks
    "Kehidupan+Batu": "Telur",
    "Lumpur+Pasir": "Tanah Liat",
    "Logam+Petir": "Listrik",
    "Hujan+Tanah": "Tumbuhan",
    "Api+Tumbuhan": "Arang",
    "Batu+Batu": "Dinding",
    "Udara+Kehidupan": "Burung",

    // TIER 4: Resep Lanjutan
    "Arang+Logam": "Baja",
    "Telur+Api": "Telur Dadar", // Contoh resep lucu
    "Burung+Tumbuhan": "Buah",
    "Tanah Liat+Api": "Keramik",
    "Kehidupan+Logam": "Golem",
    "Tumbuhan+Air": "Alga",
    "Manusia+Logam": "Cyborg", // Contoh resep sci-fi

    // TIER 5: Resep Master (Membutuhkan 3 Elemen)
    "Air+Api+Tanah": "Kehidupan",
    "Api+Batu+Energi": "Matahari", // Lebih epik dari Logam
    "Kehidupan+Manusia+Logam": "Robot",
    "Air+Kehidupan+Udara": "Jiwa",
    "Baja+Listrik+Kehidupan": "Android",

    // Resep Tersembunyi & Abstrak
    "Manusia+Jiwa": "Filsafat",
    "Matahari+Kaca": "Teleskop",
    "Energi+Energi": "Bintang"
};

// Resep yang membutuhkan 'Manusia' sebagai bahan (ditemukan secara spesial)
const specialRecipes = {
    "Kehidupan+Tanah Liat": "Manusia"
};