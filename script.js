document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const tcNo = document.getElementById('tcNo').value;

    fetch('uyeler.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const member = jsonData.find(member => member['TC Kimlik No'] === tcNo);
            if (member) {
                document.getElementById('result').innerHTML = `
                    <p>İsim: ${member['İsim']}</p>
                    <p>Soyisim: ${member['Soyisim']}</p>
                    <p>Aidat Borcu: ${member['Aidat Borcu']}</p>
                    <p>Dernek Lokali İçin Verilen Para: ${member['Dernek Lokali İçin Verilen Para']}</p>
                `;
            } else {
                document.getElementById('result').innerHTML = `<p>Üye bulunamadı.</p>`;
            }
        })
        .catch(error => console.error('Error:', error));
});
4. CSS ile Stil Verme
styles.css dosyanızda sayfanızın stilini belirleyin:

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
    color: #555;
}

input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

#result {
    margin-top: 20px;
}
