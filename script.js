const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSReD9CYF_NYd0KVvIdaMsnCjXmoOGuEECRTf-8PhQyVYOaxq4wf_A6M2DLSrVTqoZ4f5329im3stxT/pub?gid=0&single=true&output=csv'; // Google Sheets paylaşım linkinizi buraya yapıştırın
setInterval(function() {
    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            // CSV verisini işleme
            console.log(data);
        });
}, 5000); // 5000 milisaniye = 5 saniye

async function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    // Hata mesajı kapatma butonunu ekleyin
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        errorMessage.classList.add('hidden');
    };
    errorMessage.appendChild(closeBtn);

    loadingMessage.classList.remove('hidden');

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.split(','));

        setTimeout(() => {
            loadingMessage.classList.add('hidden');
            let memberFound = false;

            for (let i = 1; i < rows.length; i++) {
                if (rows[i][0] === tcNo) {
                    document.getElementById('ad').textContent = rows[i][1];
                    document.getElementById('soyad').textContent = rows[i][2];
                    document.getElementById('aidat').textContent = rows[i][3];
                    document.getElementById('alım').textContent = rows[i][4];
                    document.getElementById('durum').textContent = rows[i][5];
                    memberFound = true;
                    break;
                }
            }

            if (!memberFound) {
                errorMessage.classList.remove('hidden');
                setTimeout(() => {
                    errorMessage.classList.add('hidden');
                }, 2000); // 2 saniye sonra hata mesajını gizle
            }
        }, 1000); // 1 saniye bekleme süresi
    } catch (error) {
        console.error('Hata:', error);
        loadingMessage.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 2000); // 2 saniye sonra hata mesajını gizle
    }
}
document.getElementById('tcNo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Formun varsayılan submit davranışını engelle
        getMemberInfo(); // Bilgileri Getir fonksiyonunu çağır
    }
});

async function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');

    // Hata mesajı kapatma butonunu ekleyin
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        errorMessage.classList.add('hidden');
    };
    errorMessage.appendChild(closeBtn);

    if (tcNo.trim() === "") {
        errorMessage.textContent = "Lütfen TC Kimlik Numaranızı giriniz.";
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 2000); // 2 saniye sonra hata mesajını gizle
        return;
    }

    loadingMessage.classList.remove('hidden');

    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
        const data = await response.text();
        
        const rows = data.split('\n').map(row => row.split(','));

        setTimeout(() => {
            loadingMessage.classList.add('hidden');
            let memberFound = false;

            for (let i = 1; i < rows.length; i++) {
                if (rows[i][0] === tcNo) {
                    document.getElementById('ad').textContent = rows[i][1];
                    document.getElementById('soyad').textContent = rows[i][2];
                    document.getElementById('aidat').textContent = rows[i][3];
                    document.getElementById('alım').textContent = rows[i][4];
                    document.getElementById('durum').textContent = rows[i][5];
                    memberFound = true;
                    break;
                }
            }

            if (!memberFound) {
                errorMessage.textContent = "Lütfen TC Kimlik Numaranızı kontrol edin.";
                errorMessage.classList.remove('hidden');
                setTimeout(() => {
                    errorMessage.classList.add('hidden');
                }, 2000); // 2 saniye sonra hata mesajını gizle
            }
        }, 1000); // 1 saniye bekleme süresi
    } catch (error) {
        console.error('Hata:', error);
        loadingMessage.classList.add('hidden');
        errorMessage.textContent = "Lütfen TC Kimlik Numaranızı kontrol edin.";
        errorMessage.classList.remove('hidden');
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 2000); // 2 saniye sonra hata mesajını gizle
    }
}

// Enter tuşuna basıldığında bilgileri getir
document.getElementById('tcNo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Formun varsayılan submit davranışını engelle
        getMemberInfo(); // Bilgileri Getir fonksiyonunu çağır
    }
});
