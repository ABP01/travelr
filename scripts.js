document.getElementById('searchButton').addEventListener('click', function() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    fetchRecommendations(keyword);
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('recommendations').innerHTML = '';
    document.getElementById('searchInput').value = '';
});

function fetchRecommendations(keyword) {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const results = [];
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
                        results.push(city);
                    }
                });
            });
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(keyword) || temple.description.toLowerCase().includes(keyword)) {
                    results.push(temple);
                }
            });
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(keyword) || (beach.description && beach.description.toLowerCase().includes(keyword))) {
                    results.push(beach);
                }
            });
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(results) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '';
    if (results.length === 0) {
        recommendationsDiv.innerHTML = '<p class="text-center text-xl">No results found.</p>';
        return;
    }
    results.forEach(item => {
        const div = document.createElement('div');
        div.className = 'bg-gray-700 p-4 rounded-md mb-4 max-w-md mx-auto';
        div.innerHTML = `
            <h3 class="text-2xl font-bold mb-2">${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-64 object-cover mb-2 rounded-md">
            <p>${item.description}</p>
        `;
        recommendationsDiv.appendChild(div);
    });
}