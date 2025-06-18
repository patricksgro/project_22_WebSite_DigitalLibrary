const param = new URLSearchParams(window.location.search)

const id = param.get('id')

//contenitori
const imgDiv = document.getElementById('imgDiv')
const infoDiv = document.getElementById('infoDiv')

const titoloLibro = document.getElementById('titoloLibro')
const asinLibro = document.getElementById('asinLibro')
const prezzoLibro = document.getElementById('prezzoLibro')
const aggiungiAlCarrello = document.getElementById('aggiungiAlCarrello')


function fetchBookSelected () {
    fetch('https://striveschool-api.herokuapp.com/books/'+ id)
        .then(response => response.json())
        .then(book => {
            console.log(book)
            detailsBookSelected(book)
        })
}

fetchBookSelected()

function detailsBookSelected(book) {

    const imgBook = document.createElement('img')
    imgBook.src = book.img
    imgBook.alt = book.title
    imgBook.classList.add('img','img-fluid')
    imgBook.style.minHeight = '25%'
    imgDiv.appendChild(imgBook)

    titoloLibro.innerHTML = book.title
    asinLibro.innerHTML = `Codice libro: ${book.asin}`
    prezzoLibro.innerHTML = `€ ${book.price}`
    prezzoLibro.style.fontSize = '4rem'
    aggiungiAlCarrello.innerText = 'Aggiungi al carrello'
    aggiungiAlCarrello.style.backgroundColor = 'green'
    

}

















