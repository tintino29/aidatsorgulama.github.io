document.getElementById('aidatForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var tcNo = document.getElementById('tcNo').value;
    var url = 'https://docs.google.com/spreadsheets/d/1ugyFLdSX0-Ljq-wcdyN4QnwkjxJXXWb3/edit?usp=drive_link&ouid=110270215720798091379&rtpof=true&sd=true';

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            var workbook = XLSX.read(data, { type: 'array' });
            var sheet = workbook.Sheets[workbook.SheetNames[0]];
            var json = XLSX.utils.sheet_to_json(sheet);

            var borc = json.find(row => row['TC Kimlik No'] == tcNo)?.['Aidat Borcu'];
            document.getElementById('sonuc').innerText = borc ? `Aidat Borcu: ${borc}` : 'TC Kimlik Numarası bulunamadı';
        })
        .catch(error => console.error('Error:', error));
});