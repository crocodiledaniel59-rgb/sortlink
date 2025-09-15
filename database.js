// --- DATABASE ALKEMIS UNIVERSAL (EKSPANSI BESAR-BESARAN) ---
const recipes = {
    // TIER 1: KOMBINASI DASAR
    "Air+Api": "Uap",
    "Api+Tanah": "Lava",
    "Air+Tanah": "Lumpur",
    "Api+Udara": "Energi",
    "Air+Udara": "Kabut",
    "Tanah+Udara": "Debu",

    // TIER 2: BENTUK GEOLOGI & CUACA
    "Lava+Udara": "Batu",
    "Air+Batu": "Pasir",
    "Api+Pasir": "Kaca",
    "Air+Debu": "Hujan",
    "Batu+Batu": "Dinding",
    "Api+Batu": "Logam",
    "Energi+Uap": "Petir",
    "Air+Hujan": "Banjir",

    // =======================================================
    // == ERA KEHIDUPAN ==
    // =======================================================
    // TIER 3: KEMUNCULAN KEHIDUPAN DASAR
    "Lumpur+Energi": "Kehidupan", // Jalur alternatif menuju Kehidupan
    "Hujan+Tanah": "Tumbuhan",
    "Air+Kehidupan": "Alga",
    "Tanah+Kehidupan": "Jamur",
    "Lumpur+Tumbuhan": "Rawa",
    "Tumbuhan+Tumbuhan": "Hutan",
    "Api+Tumbuhan": "Arang",
    "Arang+Arang": "Berlian",
    "Api+Tumbuhan": "Asap",

    // TIER 4: HEWAN PERTAMA
    "Kehidupan+Rawa": "Bakteri",
    "Bakteri+Air": "Plankton",
    "Kehidupan+Pasir": "Kalajengking",
    "Kehidupan+Batu": "Telur",
    "Telur+Udara": "Burung",
    "Telur+Api": "Telur Dadar", // Resep lucu
    "Telur+Tanah": "Dinosaurus",
    "Api+Dinosaurus": "Naga",
    "Burung+Burung": "Kawanan Burung",

    // =======================================================
    // == ERA MANUSIA ==
    // =======================================================
    // TIER 5: KEMUNCULAN MANUSIA & ALAT
    "Dinosaurus+Waktu": "Fosil", // Membutuhkan Waktu (resep spesial)
    "Alat+Batu": "Pahat",
    "Alat+Logam": "Peralatan",
    "Manusia+Batu": "Gua",
    "Api+Manusia": "Mayat",
    "Kayu+Peralatan": "Roda",
    "Manusia+Tumbuhan": "Petani",
    "Petani+Tanah": "Ladang",
    "Batu+Peralatan": "Patung",

    // TIER 6: PERADABAN AWAL
    "Manusia+Manusia": "Desa",
    "Dinding+Desa": "Kota",
    "Kota+Kota": "Negara",
    "Peralatan+Roda": "Gerobak",
    "Manusia+Peralatan": "Kerja",
    "Kerja+Manusia": "Uang",
    "Lumpur+Api": "Batu Bata",
    "Batu Bata+Manusia": "Rumah",
    "Manusia+Logam": "Baju Zirah",
    "Baju Zirah+Manusia": "Ksatria",
    "Ksatria+Naga": "Pahlawan",

    // =======================================================
    // == ERA TEKNOLOGI ==
    // =======================================================
    // TIER 7: PENEMUAN & MESIN
    "Arang+Logam": "Baja",
    "Logam+Petir": "Listrik",
    "Peralatan+Uap": "Mesin",
    "Mesin+Uang": "Pabrik",
    "Arang+Mesin": "Mesin Uap",
    "Mesin Uap+Roda": "Lokomotif",
    "Lokomotif+Gerobak": "Kereta Api",
    "Kaca+Listrik": "Lampu Pijar",
    "Lampu Pijar+Manusia": "Ide",
    "Kaca+Kaca": "Lensa",
    "Lensa+Logam": "Teleskop",

    // TIER 8: ERA DIGITAL
    "Listrik+Pasir": "Silikon",
    "Peralatan+Silikon": "Transistor",
    "Listrik+Transistor": "Elektronik",
    "Transistor+Transistor": "Chip Komputer",
    "Chip Komputer+Layar": "Komputer", // Membutuhkan Layar
    "Komputer+Komputer": "Internet",
    "Ide+Internet": "Meme",
    "Komputer+Manusia": "Programmer",
    "AI+Programmer": "Bug", // Resep lucu lagi

    // =======================================================
    // == ERA LUAR ANGKASA & FANTASI ==
    // =======================================================
    // TIER 9: PENJELAJAHAN & IMAJINASI
    "Udara+Baja": "Pesawat",
    "Manusia+Bulan": "Astronot", // Membutuhkan Bulan
    "Pesawat+Luar Angkasa": "Pesawat Luar Angkasa",
    "Negara+Pesawat Luar Angkasa": "Program Luar Angkasa",
    "Pesawat Luar Angkasa+Astronot": "Roket",
    "Bintang+Roket": "Perjalanan Antarbintang",
    "Kehidupan+Luar Angkasa": "Alien",
    "Alien+Roket": "UFO",
    "Kehidupan+Mayat": "Zombie",
    "Kuda+Pelangi": "Unicorn", // Membutuhkan Kuda & Pelangi
    "Kehidupan+Logam": "Golem",

    // =======================================================
    // == ELEMEN ABSTRAK & FINAL ==
    // =======================================================
    "Manusia+Jiwa": "Filsafat",
    "Kaca+Matahari": "Panel Surya",
    "Energi+Energi": "Bintang",
    "Bintang+Langit": "Galaksi",
    "Kehidupan+Waktu": "Kematian",
    "Manusia+Cerita": "Buku",
    "Programmer+Buku": "Kode",

    // =======================================================
    // == RESEP TIGA ELEMEN (MASTER) ==
    // =======================================================
    "Air+Api+Tanah": "Planet",
    "Api+Batu+Energi": "Matahari",
    "Udara+Air+Langit": "Surga",
    "Kehidupan+Manusia+Logam": "Robot",
    "Robot+Komputer+Listrik": "AI",
    "Air+Kehidupan+Udara": "Jiwa",
    "Baja+Listrik+Kehidupan": "Android",
    "Air+Kaca+Udara": "Pelangi",
    "Api+Langit+Udara": "Luar Angkasa",
    "Udara+Air+Api": "Badai",
    "Manusia+Waktu+Kematian": "Siklus"
};

// RESEP SPESIAL & PENTING
const specialRecipes = {
    // Resep ini adalah gerbang menuju era manusia
    "Kehidupan+Tanah Liat": "Manusia",
    "Lumpur+Pasir": "Tanah Liat",

    // Resep untuk elemen abstrak kunci
    "Api+Langit": "Siang",
    "Bintang+Siang": "Matahari",
    "Langit+Uap": "Awan",
    "Tanah+Udara": "Langit",
    "Langit+Matahari": "Siang",
    "Langit+Bintang": "Malam",
    "Malam+Matahari": "Fajar",
    "Bulan+Malam": "Cahaya Bulan",
    "Batu+Langit": "Bulan",
    "Jam Pasir+Pasir": "Waktu", // Jalur alternatif menuju Waktu
    "Kaca+Pasir": "Jam Pasir"
};
