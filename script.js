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

            var borc = json.find(row => row['TC Kimlik No'] == tcNo)?.['Aidat Borcu'];
            if (borc) {
                document.getElementById('sonuc').innerText = `Aidat Borcu: ${borc}`;
            } else {
                document.getElementById('sonuc').innerText = 'TC Kimlik Numarası bulunamadı';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('sonuc').innerText = 'Veri çekme hatası. Lütfen tekrar deneyin.';
        });
});
