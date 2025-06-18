
//costanti
const nomeUtente = document.getElementById('nomeUtente')
const divRow = document.getElementById('divRow')
const inputUser = document.getElementById('inputUser')
const libriCarrello = []
const carrelloModal = document.querySelector('.modal-body')
const svuotaCarrello = document.getElementById('svuotaCarrello')
const btnCarrello = document.getElementById('btnCarrello')
const counter = document.getElementById('counter')
let contatoreProdotti = 0

window.onload = () => {
    fetchBooks()
}


//funzione ricerca libro
let filteredBooks = []

inputUser.addEventListener('keyup', findBook)

function findBook() {

    const valoreInput = inputUser.value.toLowerCase().trim()

    const filteredResults = filteredBooks.filter(filteredBook => filteredBook.title.toLowerCase().trim().includes(valoreInput))

    renderBooks(filteredResults)

}


//funzioe fetch
function fetchBooks() {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            filteredBooks.push(...data)
            renderBooks(data)
        })
        .catch(error => console.log(error))
}


function renderBooks(books) {

    divRow.innerHTML = ''

    books.forEach(book => {

        const divCol = document.createElement('div')
        divCol.classList.add('col-12','col-lg-3', 'col-md-4', 'col-sm-6')


        const divContainerCard = document.createElement('div')
        divContainerCard.classList.add('card', 'h-100', 'mb-4') 
        divContainerCard.style.maxWidth = '100%'

        const linkToDetails = document.createElement('a')
        linkToDetails.href = `details.html?id=${book.asin}`

        const imgCard = document.createElement('img')
        imgCard.classList.add('card-img-top')
        imgCard.style.width = '100%'
        imgCard.style.height = '300px'
        imgCard.style.objectFit = 'cover'
        imgCard.src = book.img
        imgCard.alt = `Copertina di ${book.title}`

        const divCardBody = document.createElement('div')
        divCardBody.className = 'card-body'

        const cardTitle = document.createElement('h5')
        cardTitle.className = 'card-title'
        cardTitle.innerHTML = book.title

        const paragraph = document.createElement('p')
        paragraph.className = 'card-text'
        paragraph.innerText = `€ ${book.price}`
        paragraph.style.fontWeight = 'bold'
        paragraph.style.fontSize = '1.5em'

        const btn = document.createElement('button')
        btn.style.display = 'flex'
        btn.style.alignItems = 'center'
        btn.style.backgroundColor = 'green'
        btn.style.color = 'white'
        btn.style.gap = '10px'
        btn.style.padding = '5px'
        btn.addEventListener('click', () => aggiungiCarrello(book))

        const imgCarrell = document.createElement('img')
        imgCarrell.src = 'assets/shopping_cart_tatjh597qwze_32.png'

        const textCarrell = document.createElement('span')
        textCarrell.innerText = 'Aggiungi al carrello'
        textCarrell.style.color = 'white'

        const saltaProdotto = document.createElement('button')
        saltaProdotto.title = 'Non mi interessa'
        saltaProdotto.addEventListener('click', () => removeBook(divCol))


        const imgNonInteressato = document.createElement('img')
        imgNonInteressato.src = 'assets/banned_lu3xtqxeyhtk_16.png'


        //appends
        divCardBody.appendChild(cardTitle)
        divCardBody.appendChild(paragraph)
        divCardBody.appendChild(btn)
        btn.appendChild(imgCarrell)
        btn.appendChild(textCarrell)
        saltaProdotto.appendChild(imgNonInteressato)
        divCardBody.appendChild(saltaProdotto)
        linkToDetails.appendChild(imgCard)
        divContainerCard.appendChild(linkToDetails)
        divContainerCard.appendChild(divCardBody)
        divCol.appendChild(divContainerCard)
        divRow.appendChild(divCol)

        return divRow

    });
}

function aggiungiCarrello(book) {

    libriCarrello.push(book)

    const carrello = libriCarrello.map(book => strutturaCarrello(book)) 


    carrelloModal.innerHTML = ''
    carrelloModal.append(...carrello)

    /*let totale = contatoreProdotti += 1
    counter.innerHTML = totale*/

    totaleProdottiCarrello(1)

}



function strutturaCarrello(book) {


    const rigaCarrello = document.createElement('div')
    rigaCarrello.className = 'row'

    const colImmagine = document.createElement('div')
    colImmagine.classList.add('col-3')
    rigaCarrello.appendChild(colImmagine)

    const imagArticolo = document.createElement('img')
    imagArticolo.src = book.img
    imagArticolo.classList.add('img-fluid')
    colImmagine.appendChild(imagArticolo)

    const colTitolo = document.createElement('div')
    colTitolo.className = 'col-4'
    colTitolo.classList.add('d-flex', 'justify-content-center', 'align-items-center')
    rigaCarrello.appendChild(colTitolo)

    const titoloArticolo = document.createElement('h5')
    titoloArticolo.classList.add('title', 'card-title')
    titoloArticolo.innerText = book.title
    colTitolo.appendChild(titoloArticolo)

    const colPrezzo = document.createElement('div')
    colPrezzo.classList.add('col-2', 'd-flex', 'justify-content-center', 'align-items-center', 'align-content-center')
    rigaCarrello.appendChild(colPrezzo)

    const containerRemove = document.createElement('div')
    containerRemove.classList.add('col-3', 'd-flex', 'justify-content-center', 'align-items-center')
    rigaCarrello.appendChild(containerRemove)

    const btnRimuovi = document.createElement('button')
    btnRimuovi.textContent = 'Elimina'
    btnRimuovi.style.backgroundColor = 'red'
    btnRimuovi.setAttribute('data-asin', book.asin)
    containerRemove.appendChild(btnRimuovi)
    btnRimuovi.addEventListener('click', () => rimuoviProdottoCorrente(event))

    const prezzoArticolo = document.createElement('p')
    prezzoArticolo.classList.add('text-center')
    prezzoArticolo.innerText = `€ ${book.price}`
    colPrezzo.appendChild(prezzoArticolo)

    return rigaCarrello

}



//funzione rimuovi prodotto corrente dall'array e dal DOM
function rimuoviProdottoCorrente(event) {

    const asin = event.target.dataset.asin
    const indice = libriCarrello.findIndex(libro => libro.asin === asin)
    if (indice !== -1) {
        libriCarrello.splice(indice, 1)
    }
    console.log(libriCarrello)

    event.target.closest('.row').remove()

    /*let totale = contatoreProdotti += -1
    counter.innerHTML = totale*/

    totaleProdottiCarrello(-1)

}




//funzione svuota carrello
svuotaCarrello.addEventListener('click', svuotoCarrello)

function svuotoCarrello() {
    carrelloModal.innerHTML = ''
    libriCarrello.length = 0

    /*let totale = contatoreProdotti = 0
    counter.innerHTML = totale*/

    totaleProdottiCarrello('reset')
}

//funzione totale prodotti correnti
function totaleProdottiCarrello(delta) {

    if (delta === 'reset') {
        contatoreProdotti = 0
    } else {
        contatoreProdotti += delta
    }
    counter.innerHTML = contatoreProdotti

}

function removeBook (divCol) {
    divCol.remove()
}


//aggiungere al carrello solo un libro
//scritta 'nessun articolo presente' se il carello è vuoto


