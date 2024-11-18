import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js'

// ini adalah konfigurasi firebase
const firebaseConfig = {
apiKey: "AIzaSyCRRFaBrm14cIoJ1nW5knt4Afd10H402Lo",
    authDomain: "insan-cemerlang-bbed3.firebaseapp.com",
    projectId: "insan-cemerlang-bbed3",
    storageBucket: "insan-cemerlang-bbed3.appspot.com",
    messagingSenderId: "1014883164148",
    appId: "1:1014883164148:web:f4c238c0022fb007eee3a1",
    measurementId: "G-81DKK8YWJT"
  };

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function ambilDaftarBarang() {
  const refDokumen = collection(basisdata, "inventory");
  const kueri = query(refDokumen, orderBy("item"));
  const cuplikanKueri = await getDocs(kueri);

  let hasilKueri = [];
  cuplikanKueri.forEach((dokumen) => {
    hasilKueri.push({
      id: dokumen.id,
      item: dokumen.data().item,
      jumlah: dokumen.data().jumlah,
      harga: dokumen.data().harga
    })
  })

  return hasilKueri;
}

export async function tambahBarang(item, harga, jumlah) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "inventory"), {
      item: item,
      jumlah: jumlah,
      harga: harga
    })

    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data barang")
  } catch (error) {
    // menampilkan pesan gagal
    console.log("gagal menyimpan data barang")
  }
}