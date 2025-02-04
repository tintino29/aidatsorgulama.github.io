const csvUrl = 'https://drive.google.com/file/d/1MJV8aLAesN9I4K-AhmR3dIm-ibzi_wsq/view?usp=sharing'; // Google Sheets paylaşım linkinizi buraya yapıştırın

async function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;

    const response = await fetch(csvUrl);
    const data = await response.text();
    
    const rows = data.split('\n').map(row => row.split(','));

    for (let i = 1; i < rows.length; i++) {
        if (rows[i][0] == tcNo) {
            document.getElementById('ad').textContent = rows[i][1];
            document.getElementById('soyad').textContent = rows[i][2];
            document.getElementById('aidat').textContent = rows[i][3];
            document.getElementById('alım').textContent = rows[i][4];
            return;
        }
    }

    alert("Üye bulunamadı.");
}
