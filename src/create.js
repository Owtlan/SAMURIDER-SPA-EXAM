import page from '../node_modules/page/page.mjs';
import { html, render } from '../node_modules/lit-html/lit-html.js';


const createTemplate = () => html`
      <section id="create">
        <h2>Add Motorcycle</h2>
        <div class="form">
          <h2>Add Motorcycle</h2>
          <form class="create-form" @submit=${addItem}>
            <input type="text" name="model" id="model" placeholder="Model" />
            <input type="text" name="imageUrl" id="moto-image" placeholder="Moto Image" />
            <input type="number" name="year" id="year" placeholder="Year" />
            <input type="number" name="mileage" id="mileage" placeholder="mileage" />
            <input type="text" name="contact" id="contact" placeholder="contact" />
            <textarea id="about" name="about" placeholder="about" rows="10" cols="50"></textarea>
            <button type="submit">Add Motorcycle</button>
          </form>
        </div>
      </section>
`

function addItem(e) {
    e.preventDefault()

    let model = document.getElementById('model').value
    let imageUrl = document.getElementById('moto-image').value
    let year = document.getElementById('year').value
    let mileage = document.getElementById('mileage').value
    let contact = document.getElementById('contact').value
    let about = document.getElementById('about').value



    if (model === '' || imageUrl === '' || year === '' || mileage === ''|| contact === ''|| about === '') {
        window.alert('you need to fill all fields')
        return
    }


    fetch('http://localhost:3030/data/motorcycles', {
        method: 'POST',
        headers: {
            'X-Authorization': localStorage.token
        },
        body: JSON.stringify({
            model,
            imageUrl, 
            year, 
            mileage,
            contact,
            about          
        })
    })
        .then(res => res.json())
        .then(data => {
            page.redirect('/dashboard')
        })
        .catch(error => alert(error.message))
}

export const createView = (ctx) =>
    render(createTemplate(), document.querySelector('main'))