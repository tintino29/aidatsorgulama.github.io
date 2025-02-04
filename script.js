const csvUrl = 'https://drive.google.com/file/d/161MZimUGBJCLsNreaKSmsZLaQSaIVDrg/view?usp=sharing'; // Google Sheets paylaşım linkinizi buraya yapıştırın

async function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.split(','));

        for (let i = 1; i < rows.length; i++) {
            if (rows[i][0] === tcNo) {
                document.getElementById('ad').textContent = rows[i][1];
                document.getElementById('soyad').textContent = rows[i][2];
                document.getElementById('aidat').textContent = rows[i][3];
                document.getElementById('alım').textContent = rows[i][4];
                return;
            }
        }

        alert("Üye bulunamadı.");
    } catch (error) {
        console.error('Hata:', error);
        alert("Bir hata oluştu. Lütfen bağlantıyı ve dosya formatını kontrol edin.");
    }
}
