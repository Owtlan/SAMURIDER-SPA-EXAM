import { html, render } from '../node_modules/lit-html/lit-html.js';

// Define the search template
const searchTemplate = (fruits = []) => html`
      <section id="search">

        <div class="form">
          <h4>Search</h4>
          <form class="search-form" @submit=${onSearch}>
            <input type="text" name="search" id="search-input" />
            <button class="button-list">Search</button>
          </form>
        </div>
        <h4 id="result-heading">Results:</h4>
        <div class="search-result">
         ${fruits.length === 0
        ? html`<h2 class="no-avaliable">No result.</h2>`
        : fruits.map(motorTemplate)}
        </div>
      </section>
`;

const motorTemplate = (motor) => html`
    <div class="motorcycle">
            <img src="${motor.imageUrl}" alt="example1" />
            <h3 class="model">${motor.model}</h3>
            <a class="details-btn" href="/details/${motor.id}">More Info</a>
          </div>
`;

// Reference to the root element
const root = document.querySelector('main');

// Event handler for the search form
async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('search').trim();

    if (query === '') {
        return alert('Please enter a search query');
    }

    try {
        const response = await fetch(`http://localhost:3030/data/motorcycles?where=model%20LIKE%20%22${query}%22`);
        const fruits = await response.json();
        render(searchTemplate(fruits), root);
    } catch (error) {
        console.error('Error fetching fruits:', error);
    }
}

// Function to render the search page
export const createSearch = () => {
    render(searchTemplate([]), root);
}

// Initial render with an empty list
createSearch();