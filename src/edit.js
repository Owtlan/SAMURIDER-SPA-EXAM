import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const editTemplate = (album, onSubmit) => html`
        <section id="edit">
        <h2>Edit Motorcycle</h2>
        <div class="form">
          <h2>Edit Motorcycle</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="model" id="model" placeholder="Model" value="${album.model}"/>
            <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" value="${album.imageUrl}"/>
            <input type="number" name="year" id="year" placeholder="Year" value="${album.year}"/>
            <input type="number" name="mileage" id="mileage" placeholder="mileage" value="${album.mileage}"/>
            <input type="number" name="contact" id="contact" placeholder="contact" value="${album.contact}"/>
            <textarea id="about" name="about" placeholder="about" rows="10" cols="50">${album.about}</textarea>
            <button type="submit">Edit Motorcycle</button>
          </form>
        </div>
      </section>
`

const getAlbumDetails = (id) => {

    return fetch(`http://localhost:3030/data/motorcycles/${id}`)
        .then(res => res.json())
};

const editAlbum = (id, album) => {
    return fetch(`http://localhost:3030/data/motorcycles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(album)
    })
        .then(res => res.json())
};


export const editView = (ctx) => {
    const albumId = ctx.params.albumId
    console.log(albumId);
    getAlbumDetails(albumId)
        .then(album => {
            const onSubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);


                let model = document.getElementById('model').value
                let imageUrl = document.getElementById('moto-image').value
                let year = document.getElementById('year').value
                let mileage = document.getElementById('mileage').value
                let contact = document.getElementById('contact').value
                let about = document.getElementById('about').value



                if (model === '' || imageUrl === '' || year === '' || mileage === '' || contact === '' || about === '') {
                    window.alert('you need to fill all fields')
                    return
                }

                const editedAlbum = {
                    model,
                    imageUrl,
                    year,
                    mileage,
                    contact,
                    about
                };
                if (Object.values(editedAlbum).some(field => field.trim() === '')) {
                    return alert('All fields are required!');
                }

                editAlbum(albumId, editedAlbum)
                    .then(() => {
                        page.redirect(`/details/${albumId}`);
                    });
            }
            render(editTemplate(album, onSubmit), document.querySelector('main'))
        })
}