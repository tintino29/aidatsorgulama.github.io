document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const tcNo = document.getElementById('tcNo').value;

    fetch('uyeler.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const member = jsonData.find(member => member['TC Kimlik No'] === tcNo);
            if (member) {
                document.getElementById('result').innerHTML = `
                    <p>İsim: ${member['İsim']}</p>
                    <p>Soyisim: ${member['Soyisim']}</p>
                    <p>Aidat Borcu: ${member['Aidat Borcu']}</p>
                    <p>Dernek Lokali İçin Verilen Para: ${member['Dernek Lokali İçin Verilen Para']}</p>
                `;
            } else {
                document.getElementById('result').innerHTML = `<p>Üye bulunamadı.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
});
