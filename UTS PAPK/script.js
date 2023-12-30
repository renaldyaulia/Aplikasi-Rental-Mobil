// Tambahkan skrip untuk mengelola splash screen di dalam script.js
document.addEventListener('DOMContentLoaded', (event) => {
  // Tampilkan splash screen saat konten dimuat
  showSplashScreen();

  // Setelah beberapa detik, sembunyikan splash screen
  setTimeout(() => {
      hideSplashScreen();
  }, 2000); // Sesuaikan waktu tampil splash screen (dalam milidetik)
});

// Fungsi untuk menampilkan splash screen
function showSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.style.display = 'flex';
}

// Fungsi untuk menyembunyikan splash screen
function hideSplashScreen() {
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.style.display = 'none';
}


// Simpan pesanan dalam array
let orders = [];

// Fungsi untuk menambah pesanan
function addOrder() {
  // Dapatkan nilai input
  const selectedType = document.getElementById('type').value;
  const selectedHari = document.getElementById('hari').value;

  // Validasi input
  if (!selectedHari || selectedHari <= 0) {
      alert('Mohon masukkan jumlah hari yang valid.');
      return;
  }

  // Tentukan harga dan diskon berdasarkan jenis mobil dan jumlah hari
  let hargaPerHari;
  let diskon = 0;

  switch (selectedType) {
      case 'Avanza':
        hargaPerHari = 150000;
          if (selectedHari > 3) {
              diskon = 1;
          }
          break;
      case 'Xenia':
        hargaPerHari = 200000;
          if (selectedHari > 4) {
              diskon = 2;
          }
          break;
      case 'Terios':
          hargaPerHari = 250000;
          if (selectedHari > 5) {
              diskon = 3;
          }
          break;
      default:
          hargaPerHari = 0;
  }

  // Validasi harga
  if (hargaPerHari === 0) {
      alert('Jenis mobil tidak valid.');
      return;
  }

  // Hitung total harga dengan mempertimbangkan diskon
  const totalHarga = selectedHari * hargaPerHari - diskon * hargaPerHari;

  // Buat objek pesanan
  const order = {
      type: selectedType,
      hari: selectedHari,
      totalHarga: totalHarga,
  };

  // Tambahkan pesanan ke array
  orders.push(order);

  // Tampilkan pesanan
  showOrders();

  // Reset formulir
  document.getElementById('type').value = 'Avanza';
  document.getElementById('hari').value = '';
}

// Fungsi untuk menampilkan pesanan dalam tabel
function showOrders() {
  const ordersTable = document.getElementById('orders-table');
  ordersTable.innerHTML = ''; // Bersihkan tabel sebelum menambahkan pesanan baru

  // Tampilkan header tabel
  ordersTable.innerHTML += `
      <tr>
          <th>No</th>
          <th>Jenis Mobil</th>
          <th>Hari</th>
          <th>Total Harga</th>
          <th>Aksi</th>
      </tr>
  `;

  // Tampilkan setiap pesanan dalam baris tabel
  orders.forEach((order, index) => {
      const orderRow = `
          <tr>
              <td>${index + 1}</td>
              <td>${order.type}</td>
              <td>${order.hari}</td>
              <td>${order.totalHarga}</td>
              <td>
                  <button onclick="editOrder(${index})">Edit</button>
                  <button onclick="removeOrder(${index})">Hapus</button>
              </td>
          </tr>
      `;
      ordersTable.innerHTML += orderRow;
  });

  // Hitung total pembayaran
  const totalPembayaran = orders.reduce((total, order) => total + order.totalHarga, 0);

  // Tampilkan total pembayaran di bagian bawah tabel
  const totalRow = `
      <tr>
          <td colspan="3" align="right"><strong>Total Pembayaran:</strong></td>
          <td>${totalPembayaran}</td>
          <td></td>
      </tr>
  `;
  ordersTable.innerHTML += totalRow;

  // Update total pembayaran pada elemen HTML
  document.getElementById('total-amount').innerText = totalPembayaran;
}

// Fungsi untuk mengedit pesanan
function editOrder(index) {
  // Dapatkan pesanan berdasarkan indeks
  const selectedOrder = orders[index];

  // Isi formulir dengan nilai pesanan yang akan diubah
  document.getElementById('type').value = selectedOrder.type;
  document.getElementById('hari').value = selectedOrder.hari;

  // Hapus pesanan dari daftar
  orders.splice(index, 1);

  // Tampilkan ulang pesanan setelah diubah
  showOrders();
}

// Fungsi untuk menghapus pesanan
function removeOrder(index) {
  // Hapus pesanan dari array berdasarkan indeks
  orders.splice(index, 1);
  
  // Tampilkan ulang pesanan setelah dihapus
  showOrders();
}

// Fungsi untuk menghitung pembayaran
function calculatePayment() {
  const paymentMethod = document.getElementById('payment-method').value;
  const totalPembayaran = orders.reduce((total, order) => total + order.totalHarga, 0);

  // Dapatkan nilai jumlah pembayaran dari formulir
  const paymentAmount = parseFloat(document.getElementById('payment-amount').value);

  // Validasi jumlah pembayaran
  if (isNaN(paymentAmount) || paymentAmount <= 0) {
      alert('Mohon masukkan jumlah pembayaran yang valid.');
      return;
  }

  // Menampilkan detail pembayaran
  const paymentResult = document.getElementById('payment-result');
  paymentResult.innerHTML = `<strong>Detail Pembayaran (${paymentMethod}):</strong><br>`;
  paymentResult.innerHTML += `Total Pembayaran: ${totalPembayaran}<br>`;
  paymentResult.innerHTML += `Jumlah Pembayaran: ${paymentAmount}<br>`;
  paymentResult.innerHTML += `Kembalian: ${paymentAmount - totalPembayaran}<br>`;
  if (paymentMethod === 'credit') {
      paymentResult.innerHTML += 'Cicilan 3 bulan tanpa bunga.';
  }
}
// Registrasi Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js', { scope: '/' })
      .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
          console.error('Service Worker registration failed:', error);
      });
}
function printReceipt() {
  // Sembunyikan elemen-elemen yang tidak ingin dicetak
  document.querySelector('body').classList.add('printing');
  document.getElementById('splash-screen').style.display = 'none';

  // Panggil fungsi pencetakan browser
  window.print();

  // Tampilkan kembali elemen-elemen yang disembunyikan setelah pencetakan selesai
  document.querySelector('body').classList.remove('printing');
  document.getElementById('splash-screen').style.display = 'flex';
}