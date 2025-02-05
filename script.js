const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSReD9CYF_NYd0KVvIdaMsnCjXmoOGuEECRTf-8PhQyVYOaxq4wf_A6M2DLSrVTqoZ4f5329im3stxT/pub?gid=0&single=true&output=csv'; // Google Sheets paylaşım linkinizi buraya yapıştırın

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
                document.getElementById('durum').textContent = rows[i][5];
                return;
            }
        }

        alert("Üye bulunamadı.");
    } catch (error) {
        console.error('Hata:', error);
        alert("Bir hata oluştu. Lütfen bağlantıyı ve dosya formatını kontrol edin.");
    }
}
