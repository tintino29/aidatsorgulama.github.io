document.getElementById('kayitFormu').addEventListener('submit', function(event) {
    event.preventDefault();

    const ad = document.getElementById('ad').value;
    const soyad = document.getElementById('soyad').value;
    const tcno = document.getElementById('tcno').value;
    const dogumTarihi = document.getElementById('dogumTarihi').value;
    const telefon = document.getElementById('telefon').value;

    const data = [
        ['Ad', 'Soyad', 'TC No', 'Doğum Tarihi', 'Telefon'],
        [ad, soyad, tcno, dogumTarihi, telefon]
    ];

    let csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kayit.csv");
    document.body.appendChild(link);

    link.click();
});
