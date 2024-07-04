import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';

const detailsTemplate = (items, isOwner, onDelete) => html`
        <section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${items.imageUrl}" alt="example1" />
          <p id="details-title">${items.model}</p>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="year">Year: ${items.year}</p>
              <p class="mileage">Mileage: ${items.mileage} km.</p>
              <p class="contact">Contact Number: ${items.contact}</p>
              <p id="motorcycle-description">${items.about}</p>
            </div>
            <!--Edit and Delete are only for creator-->
             ${isOwner ? html`
            <div id="action-buttons">
              <a href="/edit/${items._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            </div>`
        : ''}
          </div>
        </div>
      </section>
`;

const getDetails = (detailsId) => {
    return fetch(`http://localhost:3030/data/motorcycles/${detailsId}`)
        .then(res => res.json())
}

const deleteAlbum = (id) => {
    return fetch(`http://localhost:3030/data/motorcycles/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        }
    })
        .then(res => res.json());
}

export const detailsView = (ctx) => {
    getDetails(ctx.params.detailsId)
        .then(items => {
            const isOwner = localStorage.ownerId === items._ownerId;

            const onDelete = () => {
                if (confirm('Are you sure you want to delete this album?')) {
                    deleteAlbum(ctx.params.detailsId)
                        .then(() => {
                            page.redirect('/dashboard');
                        })
                        .catch(err => {
                            alert('Failed to delete album: ' + err.message);
                        });
                }
            };
            render(detailsTemplate(items, isOwner, onDelete), document.querySelector('main'));
        })
}