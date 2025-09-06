//Referensi pertama kita, didasarkan pada section pertama
const soluteType = document.getElementById("solute-type");
const inputType = document.getElementById("input-type")

//Untuk memunculkan input yang diperlukan (untuk section kedua)
const containerValency = document.getElementById("container-valency");
const containerKaKb = document.getElementById("container-ka-kb");
const containerMolality = document.getElementById("container-molality");
const containerMass = document.getElementById("container-mass");
const containerVolume = document.getElementById("container-volume");

//Menyimpan nilai dari setiap form (baik section pertama dan kedua)
const valencyValues = document.getElementById("valency-value");
const kaKbValues = document.getElementById("ka-kb-value");
const molalValues = document.getElementById("molal-value");
const massValues = document.getElementById("mass-value");
const volumeValues = document.getElementById("volume-value");

/**
 * Selanjutnya kita simpan setiap jenis input;
 * Tujuannya adalah agar setiap kali user mengetik angka atau teks
 * dan memilih selection, page akan direload
 */

const allInputs = [soluteType, inputType, valencyValues, molalValues, massValues, volumeValues];
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

        containerMolality.style.display = 'none';
    } else {
        containerMolality.style.display = 'block';

        containerMass.style.display = 'none';
        containerVolume.style.display = 'none';
    }
}