document.getElementById('uyeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    getMemberInfo();
});

function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;
    const url = 'https://raw.githubusercontent.com/tintino29/aidatsorgulama.github.io/main/uye.xlsx'; // GitHub'daki dosyanızın URL'si

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const member = jsonData.find(member => member.TC === tcNo);
            if (member) {
                document.getElementById('ad').textContent = member.Ad;
                document.getElementById('soyad').textContent = member.Soyad;
                document.getElementById('aidat').textContent = member.Aidat;
                document.getElementById('alım').textContent = member.Alım;
                document.getElementById('durum').textContent = member.Durum;
            } else {
                document.getElementById('error-message').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('error-message').classList.remove('hidden');
        });
}
function showError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000); // 3 saniye sonra hata mesajını gizler
}
