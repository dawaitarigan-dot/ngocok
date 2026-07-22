/* ==========================================================
   BANK DIGITAL
   SCRIPT.JS
   PART 1
   Inisialisasi + localStorage + Splash + Login + Navigation
========================================================== */


/* ==========================================================
   ELEMENT
========================================================== */

const splash = document.getElementById("splash-screen");
const loginPage = document.getElementById("login-page");
const app = document.getElementById("app");

const pinInput = document.getElementById("pinInput");
const loginBtn = document.getElementById("loginBtn");

const toast = document.getElementById("toast");

const namaRekening = document.getElementById("namaRekening");
const nomorRekening = document.getElementById("nomorRekening");
const saldo = document.getElementById("saldo");

const profilNama = document.getElementById("profilNama");
const profilRekening = document.getElementById("profilRekening");

const copyBtn = document.getElementById("copyBtn");

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

const todayMasuk = document.getElementById("todayMasuk");
const todayKeluar = document.getElementById("todayKeluar");


/* ==========================================================
   DATA DEFAULT
========================================================== */

const DEFAULT_DATA = {

    nama: "MUTIA PALASARI",

    rekening: "901663014851",

    saldo: 0,

    pin: "123456",

    mutasi: []

};


/* ==========================================================
   LOCAL STORAGE
========================================================== */

function initStorage(){

    if(localStorage.getItem("bankData")==null){

        localStorage.setItem(
            "bankData",
            JSON.stringify(DEFAULT_DATA)
        );

    }

}

initStorage();


function getData(){

    return JSON.parse(
        localStorage.getItem("bankData")
    );

}

function saveData(data){

    localStorage.setItem(
        "bankData",
        JSON.stringify(data)
    );

}


/* ==========================================================
   FORMAT RUPIAH
========================================================== */

function rupiah(angka){

    return "Rp" +

    Number(angka).toLocaleString(
        "id-ID"
    );

}

/* ==========================================================
   HITUNG MASUK / KELUAR HARI INI
========================================================== */

function updateToday(){

    const data = getData();

    let masuk = 0;
    let keluar = 0;

    const hariIni = new Date().toLocaleDateString("id-ID");

    data.mutasi.forEach(item=>{

        if(item.tanggal === hariIni){

            if(item.tipe === "masuk"){

                masuk += Number(item.nominal);

            }else{

                keluar += Number(item.nominal);

            }

        }

    });

animateSaldo(todayMasuk, masuk);

animateSaldo(todayKeluar, keluar);

}


/* ==========================================================
   REFRESH DATA KE HTML
========================================================== */

function renderData(){

    const data = getData();

    namaRekening.innerText = data.nama;

    nomorRekening.innerText = data.rekening;

    animateSaldo(saldo, data.saldo);

    profilNama.innerText = data.nama;

    profilRekening.innerText = data.rekening;

    updateToday();

}

renderData();


/* ==========================================================
   SPLASH SCREEN
========================================================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        splash.classList.add("hideSplash");

    },2000);

});


/* ==========================================================
   LOGIN
========================================================== */

loginBtn.onclick = ()=>{

    const data = getData();

    const pin = pinInput.value.trim();

    if(pin===""){

        showToast("Masukkan PIN");

        return;

    }

    if(pin!==data.pin){

        showToast("PIN Salah");

        pinInput.value="";

        return;

    }

    loginPage.style.display="none";

    app.style.display="block";

    showToast("Login Berhasil");

};


/* ==========================================================
   ENTER LOGIN
========================================================== */

pinInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        loginBtn.click();

    }

});


/* ==========================================================
   NAVIGATION
========================================================== */

function showPage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    navButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList.add("active");

    document
    .querySelector(
        `.nav-btn[data-page="${id}"]`
    )
    .classList.add("active");

}


navButtons.forEach(btn=>{

    btn.onclick=()=>{

        showPage(
            btn.dataset.page
        );

    };

});


/* ==========================================================
   COPY REKENING
========================================================== */

copyBtn.onclick=()=>{

    const data=getData();

    navigator.clipboard.writeText(
        data.rekening
    );

    showToast(
        "Nomor rekening berhasil disalin"
    );

};


/* ==========================================================
   TOAST
========================================================== */

function showToast(text){

    toast.innerText=text;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer=setTimeout(()=>{

        toast.classList.remove("show");

    },2200);

}


/* ==========================================================
   GENERATE NOMOR REKENING
========================================================== */

function generateRekening(){

    let hasil="";

    for(let i=0;i<16;i++){

        hasil += Math.floor(
            Math.random()*10
        );

    }

    return hasil;

}


/* ==========================================================
   CEK NOMOR REKENING
========================================================== */

(function(){

    const data=getData();

    if(data.rekening==""){

        data.rekening=generateRekening();

        saveData(data);

    }

})();


/* ==========================================================
   AUTO REFRESH
========================================================== */

setInterval(()=>{

    renderData();

},500);


/* ==========================================================
   DEBUG
========================================================== */

console.log(

"===================================="

);

console.log(

" BANK DIGITAL "

);

console.log(

" PART 1 BERHASIL DIMUAT "

);

console.log(

"===================================="

);

/* ==========================================================
   PART 2
   SALDO MASUK + SALDO KELUAR + MUTASI OTOMATIS
========================================================== */


/* ==========================================================
   ELEMENT TAMBAHAN
========================================================== */

const btnSaldoMasuk =
document.getElementById("saldoMasuk");


const btnSaldoKeluar =
document.getElementById("saldoKeluar");


const popupSaldo =
document.getElementById("popupSaldo");


const popupTitle =
document.getElementById("popupTitle");


const nominalInput =
document.getElementById("nominal");


const simpanSaldo =
document.getElementById("simpanSaldo");


const batalPopup =
document.getElementById("batalPopup");


const mutasiList =
document.getElementById("mutasiList");



let tipeTransaksi = "";



/* ==========================================================
   BUKA POPUP SALDO MASUK
========================================================== */


btnSaldoMasuk.onclick=()=>{


    tipeTransaksi="masuk";


    popupTitle.innerText=
    "Saldo Masuk";


    nominalInput.value="";


    popupSaldo.classList.add("active");


};



/* ==========================================================
   BUKA POPUP SALDO KELUAR
========================================================== */


btnSaldoKeluar.onclick=()=>{


    tipeTransaksi="keluar";


    popupTitle.innerText=
    "Saldo Keluar";


    nominalInput.value="";


    popupSaldo.classList.add("active");


};




/* ==========================================================
   TUTUP POPUP
========================================================== */


batalPopup.onclick=()=>{


    popupSaldo.classList.remove("active");


};



/* ==========================================================
   SIMPAN TRANSAKSI
========================================================== */


simpanSaldo.onclick=()=>{


    let nominal =
    Number(nominalInput.value);



    if(!nominal || nominal<=0){


        showToast(
        "Masukkan nominal yang benar"
        );


        return;


    }



    let data=getData();



    /* =========================
       SALDO MASUK
    ========================== */


    if(tipeTransaksi==="masuk"){


        data.saldo += nominal;


    }



    /* =========================
       SALDO KELUAR
    ========================== */


    else{


        if(nominal > data.saldo){


            showToast(
            "Saldo tidak mencukupi"
            );


            return;


        }


        data.saldo -= nominal;


    }




    /* =========================
       BUAT MUTASI
    ========================== */


    const waktu =
    new Date();



    let transaksi={


        id:Date.now(),


        tanggal:
        waktu.toLocaleDateString(
            "id-ID"
        ),


        jam:
        waktu.toLocaleTimeString(
            "id-ID"
        ),


        tipe:
        tipeTransaksi,


        nominal:
        nominal


    };



    data.mutasi.unshift(
        transaksi
    );



    saveData(data);



    renderData();


    renderMutasi();



    popupSaldo.classList.remove(
        "active"
    );



    showToast(
    "Transaksi berhasil"
    );
	
	confettiSaldo();


};





/* ==========================================================
   TAMPILKAN MUTASI
========================================================== */


function renderMutasi(){



    const data=getData();



    mutasiList.innerHTML="";



    if(data.mutasi.length===0){


        mutasiList.innerHTML=`

        <div class="mutasi-item">

            <h3>
            Belum ada transaksi
            </h3>

        </div>

        `;


        return;


    }



    data.mutasi.forEach(item=>{


        let warna="";


        let tanda="";



        if(item.tipe==="masuk"){


            warna=
            "nominal-masuk";


            tanda="+";


        }


        else{


            warna=
            "nominal-keluar";


            tanda="-";


        }




        mutasiList.innerHTML += `


        <div class="mutasi-item">


            <div class="mutasi-header">


                <h3>


                ${
                item.tipe==="masuk"
                ?
                "Saldo Masuk"
                :
                "Saldo Keluar"
                }


                </h3>


                <small>

                ${item.tanggal}

                </small>


            </div>



            <div class="mutasi-footer">


                <small>

                ${item.jam}

                </small>



                <h2 class="${warna}">


                ${tanda}

                ${rupiah(item.nominal)}


                </h2>



            </div>



        </div>


        `;


    });



}




/* ==========================================================
   LOAD MUTASI SAAT START
========================================================== */


renderMutasi();



/* ==========================================================
   UPDATE OTOMATIS
========================================================== */


setInterval(()=>{


    renderMutasi();


},1000);

/* ==========================================================
   PART 3
   GANTI NAMA + GANTI PIN + COPY REKENING
   TOAST + LOGOUT + FINISHING
========================================================== */


/* ==========================================================
   ELEMENT
========================================================== */


const ubahNama =
document.getElementById("ubahNama");


const popupNama =
document.getElementById("popupNama");


const namaBaru =
document.getElementById("namaBaru");


const simpanNama =
document.getElementById("simpanNama");


const batalNama =
document.getElementById("batalNama");



const ubahPin =
document.getElementById("ubahPin");


const popupPin =
document.getElementById("popupPin");


const pinLama =
document.getElementById("pinLama");


const pinBaru =
document.getElementById("pinBaru");


const simpanPin =
document.getElementById("simpanPin");


const batalPin =
document.getElementById("batalPin");



const logout =
document.getElementById("logout");




/* ==========================================================
   POPUP GANTI NAMA
========================================================== */


ubahNama.onclick=()=>{


    namaBaru.value="";


    popupNama.classList.add(
        "active"
    );


};




batalNama.onclick=()=>{


    popupNama.classList.remove(
        "active"
    );


};





/* ==========================================================
   SIMPAN NAMA BARU
========================================================== */


simpanNama.onclick=()=>{


    let nama =
    namaBaru.value.trim();



    if(nama===""){


        showToast(
        "Nama tidak boleh kosong"
        );


        return;


    }



    let data=getData();



    data.nama=nama;



    saveData(data);



    renderData();



    popupNama.classList.remove(
        "active"
    );



    showToast(
    "Nama berhasil diganti"
    );


};





/* ==========================================================
   POPUP GANTI PIN
========================================================== */


ubahPin.onclick=()=>{


    pinLama.value="";

    pinBaru.value="";


    popupPin.classList.add(
        "active"
    );


};



batalPin.onclick=()=>{


    popupPin.classList.remove(
        "active"
    );


};





/* ==========================================================
   SIMPAN PIN BARU
========================================================== */


simpanPin.onclick=()=>{


    let data=getData();



    if(pinLama.value !== data.pin){


        showToast(
        "PIN lama salah"
        );


        return;


    }




    if(pinBaru.value.length !== 6){


        showToast(
        "PIN harus 6 digit"
        );


        return;


    }




    data.pin =
    pinBaru.value;



    saveData(data);



    popupPin.classList.remove(
        "active"
    );



    showToast(
    "PIN berhasil diganti"
    );


};





/* ==========================================================
   COPY REKENING
========================================================== */


copyBtn.onclick=()=>{


    let data=getData();



    navigator.clipboard.writeText(
        data.rekening
    )
    .then(()=>{


        showToast(
        "Nomor rekening disalin"
        );


    });


};






/* ==========================================================
   LOGOUT
========================================================== */


logout.onclick=()=>{


    app.style.display="none";


    loginPage.style.display="flex";


    pinInput.value="";



    showToast(
    "Anda telah logout"
    );


};





/* ==========================================================
   CLOSE POPUP CLICK OUTSIDE
========================================================== */


document.querySelectorAll(".popup")
.forEach(popup=>{


    popup.addEventListener(
    "click",
    function(e){


        if(e.target===this){


            this.classList.remove(
                "active"
            );


        }


    });


});





/* ==========================================================
   FORMAT WAKTU LENGKAP
========================================================== */


function waktuLengkap(){


    let now=new Date();



    return {

        tanggal:
        now.toLocaleDateString(
        "id-ID",
        {

            day:"2-digit",

            month:"long",

            year:"numeric"

        }),


        jam:
        now.toLocaleTimeString(
        "id-ID"
        )

    };


}





/* ==========================================================
   CEK DATA SAAT LOAD
========================================================== */


window.addEventListener(
"load",
()=>{


    renderData();


    renderMutasi();



});





/* ==========================================================
   FINAL CHECK
========================================================== */


console.log(
`
=================================

 BANK DIGITAL

 ALL SCRIPT LOADED

 LOGIN
 SALDO
 MUTASI
 PROFIL
 PIN
 STORAGE

 READY

=================================
`
);

/* ========================= */
/* RIPPLE EFFECT */
/* ========================= */

document.querySelectorAll(".ripple-btn").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

const rect=this.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.className="ripple";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

// =======================================
// ANIMASI ANGKA SALDO
// =======================================

function animateSaldo(target, nilaiBaru) {

    let awal = parseInt(target.dataset.value || 0);

    let akhir = parseInt(nilaiBaru);

    let durasi = 800; // 0.8 detik

    let langkah = 20;

    let kenaikan = (akhir - awal) / (durasi / langkah);

    let sekarang = awal;

    clearInterval(target.counter);

    target.counter = setInterval(() => {

        sekarang += kenaikan;

        if ((kenaikan >= 0 && sekarang >= akhir) ||
            (kenaikan < 0 && sekarang <= akhir)) {

            sekarang = akhir;

            clearInterval(target.counter);

        }

        target.innerHTML = "Rp" + Math.round(sekarang).toLocaleString("id-ID");

    }, langkah);

    target.dataset.value = akhir;

}

function confettiSaldo(){


const container = document.getElementById(
"confetti-container"
);


const icon = [
"🎉",
"✨",
"🎊",
"💰",
"⭐"
];


for(let i=0;i<50;i++){


let item=document.createElement("div");


item.className="confetti";


item.innerHTML=
icon[
Math.floor(
Math.random()*icon.length
)
];


item.style.left =
Math.random()*100+"%";


item.style.fontSize =
(15+Math.random()*20)+"px";


item.style.animationDuration =
(1+Math.random()*2)+"s";


container.appendChild(item);



setTimeout(()=>{

item.remove();

},3000);


}


}
