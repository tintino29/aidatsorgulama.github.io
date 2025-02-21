document.getElementById('uyeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    getMemberInfo();
});

function getMemberInfo() {
    const tcNo = document.getElementById('tcNo').value;
    const url = 'https://script.google.com/macros/s/AKfycbxLIZuZu05pKPF_WvkPrShSJQdp3M86KOlaWyryR5VVDj7nyfvPca0hPJiPns5kTufW/exec?tc=' + tcNo;

    document.getElementById('loading-message').classList.remove('hidden');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading-message').classList.add('hidden');
            if (data && data.length > 0) {
                document.getElementById('ad').textContent = data[1]; // Ad
                document.getElementById('soyad').textContent = data[2]; // Soyad
                document.getElementById('aidat').textContent = data[3]; // Aidat
                document.getElementById('alım').textContent = data[4]; // Alım
                document.getElementById('durum').textContent = data[5]; // Durum
            } else {
                showError();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('loading-message').classList.add('hidden');
            showError();
        });
}

function showError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000); // 3 saniye sonra hata mesajını gizler
}
