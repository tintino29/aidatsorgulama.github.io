function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;
    const fileUpload = document.getElementById('fileUpload').files[0];
    
    if (!fileUpload) {
        alert("Lütfen bir Excel dosyası yükleyin.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        for (let i = 1; i < jsonData.length; i++) {
            if (jsonData[i][0] == tcNo) {
                document.getElementById('ad').textContent = jsonData[i][1];
                document.getElementById('soyad').textContent = jsonData[i][2];
                document.getElementById('aidat').textContent = jsonData[i][3];
                document.getElementById('alım').textContent = jsonData[i][4];
                return;
            }
        }

        alert("Üye bulunamadı.");
    };
    
    reader.readAsArrayBuffer(fileUpload);
}
