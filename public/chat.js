// Konfigurasi DOM
const message = document.getElementById("message");
const handle = document.getElementById('handle');
const button = document.getElementById("send");
const output = document.getElementById("output");
const typing = document.getElementById("feedback");
// Buat koneksi
var socket = io.connect('http://localhost:4000/');
// Kirim Pesan
button.addEventListener('click', () => {
    socket.emit('chat', {
        message : message.value, 
        handle : handle.value
    })
})
// Typing =====  Sedang Mengetik
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value)
})
socket.on('typing', (data) => {
    typing.innerHTML = `<p><em>${data} is typing Message.....</em></p>`
})
// Dapatkan Pesan
socket.on('chat', (data) => {
    typing.innerHTML = ''
    output.innerHTML += `<p><strong>${data.handle} : </strong>${data.message}</p><br>`
})


