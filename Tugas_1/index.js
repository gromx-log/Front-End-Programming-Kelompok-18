//Referensi pertama kita, didasarkan pada section pertama
const soluteType = document.getElementById("solute-type");
const inputType = document.getElementById("input-type")

//Untuk memunculkan input yang diperlukan (untuk section kedua)
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

/**
 * Selanjutnya kita simpan setiap jenis input;
 * Tujuannya adalah agar setiap kali user mengetik angka atau teks
 * dan memilih selection, page akan direload
 */

const allInputs = [soluteType, inputType, valencyValue, molalValue, massValue, volumeValue];
allInputs.forEach((input) => {
    input.addEventListener('change', ()=> {
        updateUI();
    })
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
        volume: parseFloat(massValue.value),
        mr: parseFloat(mrValue.value),
        kaKb: parseFloat(kaKbValue.value.replace(',','.'))
    };
}

//Fungsi untuk menghitung konsentrasi/molal
function getMolality (inputs){
    if (inputs.method === 'molality'){
        return inputs.concentration;
    }
    else {
        if (inputs.mass > 0 && inputs.mr && inputs.volume > 0){
            //Rumus molar = mass/Mr (massa molekul relatif)
            const molar = mass/mr;

            //Ubah volume dari mL ke L
            const volumeLiter = volume/1000;

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
}