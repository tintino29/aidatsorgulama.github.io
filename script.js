document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('member-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const tc = document.getElementById('tc').value;
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1glUdVNPeMnUMzcncV_jkHzYfs22dK9fS3HxfM1AC9QI/pub?output=csv')
            .then(response => response.text())
            .then(data => {
                const rows = data.split('\n').map(row => row.split(','));
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
