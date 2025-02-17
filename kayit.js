document.getElementById('kayitFormu').addEventListener('submit', function(event) {
    event.preventDefault();

    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const tcno = document.getElementById('tcno').value;
    const dogumTarihi = document.getElementById('dogumTarihi').value;
    const telefon = document.getElementById('telefon').value;

    const data = {
        ad: ad,
        soyad: soyad,
        tcno: tcno,
        dogumTarihi: dogumTarihi,
        telefon: telefon
    };

    fetch('https://script.google.com/macros/s/AKfycbziZ-cB4PpUI8hHVws1mqeX6radSu8J6_vOJqg_6fZl4dHRbtzPGfzQLiT1pa-ZWa3P/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        alert('Bilgiler başarıyla kaydedildi!');
    }).catch(error => {
        console.error('Error:', error);
        alert('Bilgiler kaydedilirken bir hata oluştu.');
    });
});
