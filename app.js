document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('lang');

    // Fetch languages from restcountries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            langSelect.innerHTML = ''; // Clear initial loading option
            const languages = new Set();
            data.forEach(country => {
                if (country.languages) {
                    Object.values(country.languages).forEach(language => languages.add(language));
                }
            });

            languages.forEach(language => {
                const option = document.createElement('option');
                option.value = language;
                option.textContent = language;
                langSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching languages:', error);
            langSelect.innerHTML = '<option value="">Error loading languages</option>';
        });

    document.getElementById('textForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const text = document.getElementById('text').value;
        const lang = document.getElementById('lang').value;

        fetch('https://web-production-da9a.up.railway.app/convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text, lang: lang })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const audioUrl = URL.createObjectURL(blob);
            const audio = document.getElementById('audio');
            audio.src = audioUrl;
            audio.play();
        })
        .catch(error => console.error('Error:', error));
    });
});
