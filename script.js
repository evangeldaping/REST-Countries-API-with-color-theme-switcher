const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');

getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
	const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
	countriesEl.innerHTML = '';

	countries.forEach(country => {
		const countryEl = document.createElement('div');
		countryEl.classList.add('card');

		countryEl.innerHTML = `
            <div>
                <img src="${country.flags.svg}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name.common}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;
        
		countriesEl.appendChild(countryEl);
	});
}

// toggle theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});