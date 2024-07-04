import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';



let dashboardTemplate = (catalog) => html`
      <!-- Dashboard page -->
      <h2>Available Motorcycles</h2>
      <section id="dashboard">
        <!-- Display a div with information about every post (if any)-->
        ${catalog.length > 0 ? catalog.map(c => html`
        <div class="motorcycle">
          <img src="${c.imageUrl}" alt="example1" />
          <h3 class="model">${c.model}</h3>
          <p class="year">Year: ${c.year}</p>
          <p class="mileage">Mileage: ${c.mileage} km.</p>
          <p class="contact">Contact Number: ${c.contact}</p>
          <a class="details-btn" href="/details/${c._id}">More Info</a>
        </div>
     `) : html`
     <!-- Display an h2 if there are no posts -->
        <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>
      `}
      </section>

  
     `

const getCatalog = () => {
    return fetch('http://localhost:3030/data/motorcycles?sortBy=_createdOn%20desc')
        .then(res => res.json())
        .then(data => Object.values(data))
        
}

export const catalogView = (ctx) =>
    getCatalog()
        .then(catalog => render(dashboardTemplate(catalog), document.querySelector('main')))