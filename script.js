document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('member-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const tc = document.getElementById('tc').value;
        fetch('https://drive.google.com/file/d/17Zj4-_f1eR_V-bmogzFTbgnYxqqE3zvc/view?usp=sharing')
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
