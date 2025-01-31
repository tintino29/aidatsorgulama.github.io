document.getElementById('aidatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var tcNo = document.getElementById('tcNo').value;
    var url = 'https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/17D0IltGD3NRqqMSBcuVDzZrn3dp35kMj9sReAopsA0g/export?format=xlsx';

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            var workbook = XLSX.read(data, { type: 'array' });
            var sheet = workbook.Sheets[workbook.SheetNames[0]];
            var json = XLSX.utils.sheet_to_json(sheet);

            console.log(json); // Verileri konsolda kontrol edin

            var uye = json.find(row => row['TC Kimlik No'] == tcNo);
            if (uye) {
                document.getElementById('sonuc').innerHTML = `
                    Adı: ${uye['Adı']}<br>
                    Soyadı: ${uye['Soyadı']}<br>
                    Aidat Borcu: ${uye['Aidat Borcu']}<br>
                    Dernek Alımında Verilen Para: ${uye['Verilen Para']}
                `;
            } else {
                document.getElementById('sonuc').innerText = 'TC Kimlik Numarası bulunamadı';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('sonuc').innerText = 'Veri çekme hatası. Lütfen tekrar deneyin.';
        });
});
