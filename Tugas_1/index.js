document.addEventListener('DOMContentLoaded', () => {
    //Referensi pertama kita, didasarkan pada section pertama
    const soluteType = document.getElementById("solute-type");
    const inputType = document.getElementById("input-type");

    //Untuk memunculkan container input yang diperlukan (untuk section kedua)
    const containerValency = document.getElementById("container-valency");
    const containerKaKb = document.getElementById("container-ka-kb");
    const containerMolarity = document.getElementById("container-molarity");
    const containerMass = document.getElementById("container-mass");
    const containerVolume = document.getElementById("container-volume");
    const containerMr = document.getElementById("container-mr");

    //Menyimpan nilai dari setiap form (baik section pertama dan kedua)
    const valencyValue = document.getElementById("valency-value");
    const kaKbValue = document.getElementById("ka-kb-value");
    const molarValue = document.getElementById("molar-value");
    const massValue = document.getElementById("mass-value");
    const volumeValue = document.getElementById("volume-value");
    const mrValue = document.getElementById("mr-value");

    //Memunculkan hasil perhitungan akhir
    const containerResult = document.getElementById("container-result");
    /**
     * Selanjutnya kita simpan setiap jenis input;
     * Tujuannya adalah agar setiap kali user mengetik angka atau teks
     * dan memilih selection, page akan melakukan kalkulasi langsung
     */

    const allInputs = [soluteType, inputType, kaKbValue, valencyValue, molarValue, massValue, volumeValue, mrValue];
    allInputs.forEach((input) => {
        input.addEventListener('change', ()=> {
            updateUI();
            calculateAllAndDisplay();
        })
        if (input.type === 'number' || input.type === 'text'){
            input.addEventListener('input', calculateAllAndDisplay);
        }
    })

    //Perubahan UI (Berpengaruh di Section 2)
    function updateUI(){
        const solute = soluteType.value;
        const input = inputType.value;

        //Memunculkan form Ka/Kb atau Valensi
        if (solute === 'asam-lemah' || solute === 'basa-lemah'){
            containerKaKb.style.display = 'block';
            containerValency.style.display = 'none';
        } else {
            containerValency.style.display = 'block';
            containerKaKb.style.display = 'none';
            
            // Hapus nilai Ka/Kb ketika mengganti pilihan menjadi asam kuat/basa kuat
            kaKbValue.value = '';
        }

        //Memunculkan form Massa dan Volume atau Molaritas
        if (input === 'mass-and-volume'){
            containerMass.style.display = 'block';
            containerVolume.style.display = 'block';
            containerMr.style.display = 'block';

            containerMolarity.style.display = 'none';

            // Hapus nilai konsentrasi/molar ketika mengganti pilihan input menjadi massa + volume
            molarValue.value = '';
        } else {
            containerMolarity.style.display = 'block';

            containerMass.style.display = 'none';
            containerVolume.style.display = 'none';
            containerMr.style.display = 'none';

            // Sebaliknya hapus nilai Massa, Volume dan MR, ketika mengubah metode input menjadi konsentrasi
            massValue.value = '';
            volumeValue.value = '';
            mrValue.value = '';
        }
    }

    /**
     * Selanjutnya, kita membuat sebuah fungsi untuk menyimpan semua input
     * Fungsi ini akan return sebuah objek, agar setiap propertinya bisa diakses
     * oleh setiap helper function
     */
    //Fungsi untuk mengambil semua input
    function getInputs (){
        return {
            type: soluteType.value,
            method: inputType.value,
            valency: parseInt(valencyValue.value) || 1,
            molar: parseFloat(molarValue.value),
            mass: parseFloat(massValue.value),
            volume: parseFloat(volumeValue.value),
            mr: parseFloat(mrValue.value),
            // Diberikan safety tambahan semisalnya seseorang menulis decimal point dengan , atau .
            kaKb: parseFloat(kaKbValue.value.replace(',','.'))
        };
    }

    //Fungsi untuk menghitung konsentrasi/molar
    function getMolarity (inputs){
        if (inputs.method === 'molarity'){
            return inputs.molar;
        }
        else {
            if (inputs.mass > 0 && inputs.mr && inputs.volume > 0){
                //Rumus molar = mass/Mr (massa molekul relatif)
                const molar = inputs.mass/inputs.mr;

                //Ubah volume dari mL ke L
                const volumeLiter = inputs.volume/1000;

                //Rumus molar = mol / Volume (L)
                return molar/volumeLiter;
            }
        }
        return NaN; //NaN kalau input tidak valid
    }

    //Fungsi untuk hitung pH dan pOH
    function calculatePh(type, molar, inputs){
        let pH = null;
        let pOH = null;

        switch (type){
            //Larutan bersifat kuat, menggunakan valensi
            case 'asam-kuat':{
                const hPlus = inputs.valency * molar;
                pH = -Math.log10(hPlus);
                break;
            }
            case 'basa-kuat':{
                const ohMin = inputs.valency * molar;
                pOH = -Math.log10(ohMin);
                break;
            }

            //Larutan bersifat lemah, menggunakan Ka/Kb
            case 'asam-lemah':{
                //Cek apakah nilai Ka  kurang atau sama dengan nol atau berupa string asal
                if (inputs.kaKb <= 0 || isNaN(inputs.kaKb)){
                    return null;
                }
                const hPlus = Math.sqrt(inputs.kaKb * molar);
                pH = -Math.log10(hPlus);
                break;
            }
            case 'basa-lemah': {
                    //Cek apakah nilai Kb  kurang atau sama dengan nol atau berupa string asal
                    if (inputs.kaKb <= 0 || isNaN(inputs.kaKb)){
                        return null;
                    }
                    const ohMin = Math.sqrt(inputs.kaKb * molar);
                    pOH = -Math.log10(ohMin);
                    break;
            }
        }

        //Isi nilai pH dan pOH untuk ditampilkan nanti
        if (pOH !== null && pH === null){
            pH = 14 - pOH;
        }
        else if(pOH === null && pH !== null){
            pOH = 14 - pH;
        }

        //Return object berupa pH dan pOH
        return {
            pH, pOH
        }
    }

    //Tampilkan analisa / sifat dari pH
    //Deskripsi diambil berdasarkan website: https://www.zenius.net/blog/cara-menghitung-ph-larutan-asam-basa/
    function getpHDescription(pH){
        if (pH < 0 || pH > 14)  return "Tidak Terdefinisi";
        if (pH > 11)            return "Sangat Basa";
        if (pH > 9.5)           return "Basa";
        if (pH > 7.5)           return "Sedikit Basa";
        if (pH > 6.5)           return "Netral";
        if (pH > 4.5)           return "Sedikit Asam";
        if (pH > 3)             return "Asam";
        if (pH >= 0)            return "Sangat Asam";
    }
    //Menampilkan hasil perhitungan pH dan pOH
    function displayResult(pH, pOH){
        if (pH === null || isNaN (pH) || !isFinite(pH)){
            containerResult.innerHTML = '<p>Hasil tidak dapat dihitung</p>';
            containerResult.classList.add ('result-placeholder');

            //Bila user mengganti isi kalkulator dengan input invalid
            //Hapus kelas class="result-display"
            containerResult.classList.remove('result-display');
            return
        }
        const description = getpHDescription(pH);
        //Hapus placeholder kita dan tambahkan display result menggunakan class="result-display"
        containerResult.classList.remove('result-placeholder');
        containerResult.classList.add('result-display');

        containerResult.innerHTML = `
            <div class="ph-value">${pH.toFixed(2)}</div>
            <div class="ph-description">${description}</div>
            <div class="sub-value">pH: ${pH.toFixed(2)}</div>
            <div class="sub-value">pOH: ${pOH.toFixed(2)}</div>
        `
        const descriptionElement = containerResult.querySelector('.ph-description');

        // Ubah warna pada deskripsi pH
        // Di sini, dihapus warna sebelumnya dengan colorClasses
        // Ini berguna agar setiap kali kita, mengetik angka dan perhitungan dilakukan
        // Warna bisa berubah tanpa saling menumpuk dengan warna pada perhitungan sebelumnya
        const colorClasses = ['sangat-asam', 'asam', 'sedikit-asam', 'netral', 'sedikit-basa', 'basa', 'sangat-basa', 'tidak-terdefinisi'];
        descriptionElement.classList.remove(...colorClasses);

        // Beri warna berdasarkan deskripsi pH, caranya dengan menambahkan
        // class baru sesuai dengan nama deskripsi, lalu diberikan styling di dalam style.css
        const classDescriptionColor = description.toLowerCase().replace(' ', '-');
        descriptionElement.classList.add(classDescriptionColor)
    }

    //Fungsi utama untuk kalkulasi program ini
    function calculateAllAndDisplay(){
        try {
            //Ambil semua input data yang diberikan
            const inputs = getInputs();
            //Lalu cari nilai Molar/konsentrasinya
            const molar = getMolarity(inputs);

            //Hitung nilai pH dan pOH
            const results = calculatePh (inputs.type, molar, inputs);

            if (results && results.pH !== null && !isNaN(results.pH)){
                displayResult(results.pH, results.pOH)
            }
            else {
                let message = 'Periksa input anda';
                if ((inputs.type === 'asam-lemah' || inputs.type === 'basa-lemah') && isNaN(inputs.kaKb)) {
                    // Jika kolomnya berisi teks tidak valid
                    if (kaKbValue.value !== '') {
                        message = 'Nilai Ka / Kb harus berupa angka';
                    } 
                    // Jika kolomnya memang kosong
                    else {
                        message = 'Masukkan nilai Ka / Kb';
                    }
                }

                // Cek apakah nilai Molar sudah benar
                else if (isNaN(molar) || molar <= 0){
                    if (inputs.method === 'mass-and-volume'){
                        message = 'Isi nilai Massa (m), Mr, dan Volume (V)';
                    }
                    else {
                        message = 'Masukkan nilai Molaritas / Konsentrasi (M)'
                    }
                }        
                // Tampilkan pesan error yang paling relevan
                containerResult.innerHTML = `<p>${message}</p>`;
                containerResult.classList.add('result-placeholder');
                containerResult.classList.remove('result-display');
            }

        } catch (error){
            containerResult.innerHTML = `<p style="color: red;">Error: INPUT TIDAK VALID!</p>`
            containerResult.classList.add('result-placeholder');
            containerResult.classList.remove('result-display');
        }
    }
});