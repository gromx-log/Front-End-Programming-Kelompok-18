//Referensi pertama kita, didasarkan pada section pertama
const soluteType = document.getElementById("solute-type");
const inputType = document.getElementById("input-type");

//Untuk memunculkan container input yang diperlukan (untuk section kedua)
const containerValency = document.getElementById("container-valency");
const containerKaKb = document.getElementById("container-ka-kb");
const containerMolality = document.getElementById("container-molality");
const containerMass = document.getElementById("container-mass");
const containerVolume = document.getElementById("container-volume");
const containerMr = document.getElementById("container-mr");

//Menyimpan nilai dari setiap form (baik section pertama dan kedua)
const valencyValue = document.getElementById("valency-value");
const kaKbValue = document.getElementById("ka-kb-value");
const molalValue = document.getElementById("molal-value");
const massValue = document.getElementById("mass-value");
const volumeValue = document.getElementById("volume-value");
const mrValue = document.getElementById("mr-value");

//Memunculkan hasil perhitungan akhir
const containerResult = document.getElementById("container-result");
/**
 * Selanjutnya kita simpan setiap jenis input;
 * Tujuannya adalah agar setiap kali user mengetik angka atau teks
 * dan memilih selection, page akan direload
 */

const allInputs = [soluteType, inputType, valencyValue, molalValue, massValue, volumeValue];
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
    }

    //Memunculkan form Massa dan Volume atau Molalitas
    if (input === 'mass-and-volume'){
        containerMass.style.display = 'block';
        containerVolume.style.display = 'block';
        containerMr.style.display = 'block';

        containerMolality.style.display = 'none';
    } else {
        containerMolality.style.display = 'block';

        containerMass.style.display = 'none';
        containerVolume.style.display = 'none';
        containerMr.style.display = 'none';
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
        molal: parseFloat(molalValue.value),
        mass: parseFloat(massValue.value),
        volume: parseFloat(volumeValue.value),
        mr: parseFloat(mrValue.value),
        kaKb: parseFloat(kaKbValue.value.replace(',','.'))
    };
}

//Fungsi untuk menghitung konsentrasi/molal
function getMolality (inputs){
    if (inputs.method === 'molality'){
        return inputs.molal;
    }
    else {
        if (inputs.mass > 0 && inputs.mr && inputs.volume > 0){
            //Rumus molar = mass/Mr (massa molekul relatif)
            const molar = inputs.mass/inputs.mr;

            //Ubah volume dari mL ke L
            const volumeLiter = inputs.volume/1000;

            //Rumus molal = mol / Volume (L)
            return molar/volumeLiter;
        }
    }
    return NaN; //NaN kalau input tidak valid
}

//Fungsi untuk hitung pH dan pOH
function calculatePh(type, molal, inputs){
    let pH = null;
    let pOH = null;

    switch (type){
        //Larutan bersifat kuat, menggunakan valensi
        case 'asam-kuat':{
            const hPlus = inputs.valency * molal;
            pH = -Math.log10(hPlus);
            break;
        }
        case 'basa-kuat':{
            const ohMin = inputs.valency * molal;
            pOH = -Math.log10(ohMin);
            break;
        }

        //Larutan bersifat lemah, menggunakan Ka/Kb
        case 'asam-lemah':{
            //Cek apakah nilai Ka  kurang atau sama dengan nol atau berupa string asal
            if (inputs.kaKb <= 0 || isNaN(inputs.kaKb)){
                return null;
            }
            const hPlus = Math.sqrt(inputs.kaKb * molal);
            pH = -Math.log10(hPlus);
            break;
        }
        case 'basa-lemah': {
                //Cek apakah nilai Kb  kurang atau sama dengan nol atau berupa string asal
                if (inputs.kaKb <= 0 || isNaN(inputs.kaKb)){
                    return null;
                }
                const ohMin = Math.sqrt(inputs.kaKb * molal);
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
        return
    }
    const description = getpHDescription(pH);
    //Hapus placeholder kita
    containerResult.classList.remove('result-placeholder');

    containerResult.innerHTML = `
        <div class="ph-value">${pH.toFixed(2)}</div>
        <div class="poh-value">${pOH.toFixed(2)}</div>
        <div class="ph-description">${description}</div>
    `
}

//Fungsi utama untuk kalkulasi program ini
function calculateAllAndDisplay(){
    try {
        //Ambil semua input data yang diberikan
        const inputs = getInputs();

        //Lalu cari nilai Molal/konsentrasinya
        const molal = getMolality(inputs);

        if (isNaN(molal) || molal <= 0){
            containerResult.innerHTML = `<p>Hasil akan muncul di sini</p>`;
            containerResult.classList.add('result-placeholder');
            return;
        }

        const results = calculatePh (inputs.type, molal, inputs);

        if(results && results.pH !== null){
            displayResult(results.pH, results.pOH);
        }
        else {
            let message = 'Hasil akan muncul disini';
            if ((inputs.type === 'asam-lemah' || inputs.type === 'basa-lemah') && isNaN(inputs.kaKb)){
                message = `Masukkan nilai Ka / Kb yang valid`;
            }
            containerResult.innerHTML = `<p>${message}</p>`
            containerResult.classList.add(`result-placeholder`);
        }
    } catch (error){
        containerResult.innerHTML = `<p style="color: red;">Error: INPUT TIDAK VALID!</p>`
        containerResult.classList.add('result-placeholder');
    }
}