document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('member-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const tc = document.getElementById('tc').value;
        fetch('https://docs.google.com/spreadsheets/d/1glUdVNPeMnUMzcncV_jkHzYfs22dK9fS3HxfM1AC9QI/edit?usp=sharing')
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const member = rows.find(row => row[0] === tc);
                if (member) {
                    document.getElementById('name').textContent = member[1];
                    document.getElementById('surname').textContent = member[2];
                    document.getElementById('debt').textContent = member[3];
                    document.getElementById('donation').textContent = member[4];
                    document.getElementById('member-info').style.display = 'block';
                } else {
                    alert('Üye bulunamadı.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });
});
