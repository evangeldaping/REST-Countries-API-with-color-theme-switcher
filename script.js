const countriesEl = document.getElementById('countries');
const toggleBtn = document.getElementById('toggle');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');
const regionFilters = filterBtn.querySelectorAll('li');
const modal = document.getElementById('modal');
const closeBtn = document.getElementById('close');

getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v3.1/all');
	const countries = await res.json();
    console.log(countries);
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

        countryEl.addEventListener('click', () => {
			modal.style.display = 'flex';
			showCountryDetails(country);
		});
        
		countriesEl.appendChild(countryEl);
	});
}

function showCountryDetails(country) {
	const modalBody = modal.querySelector('.modal-body');
	const modalImg = modal.querySelector('img');

	modalImg.src = country.flags.svg;

	modalBody.innerHTML = `
        <h2>${country.name.common}</h2>
        <p>
            <strong>Population:</strong>
            ${country.population}
        </p>
        <p>
            <strong>Region:</strong>
            ${country.region}
        </p>
        <p>
            <strong>Sub Region:</strong>
            ${country.subregion}
        </p>
        <p>
            <strong>Capital:</strong>
            ${country.capital}
        </p>
    `;
}

// toggle theme - dark & light
toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});

// show and hide the filters (li tags)
filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});

// close the modal
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

searchEl.addEventListener('input', e => {
	const { value } = e.target;
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .country-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});

// add a filter on the li's inside the .dropdown
regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});