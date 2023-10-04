import './style.css'

const quotePlaceholder = document.getElementById('placeholder-quote')
const authorPlaceholder = document.getElementById('placeholder-author')
const quoteForm = document.getElementById('form-quote')
const quoteModal = document.getElementById('modal-quote')
const addQuoteButton = document.getElementById('form-quote')
const nextQuoteButton = document.getElementById('btn-next')
const closeModalButton = document.getElementById('btn-close')
const modalQuoteButton = document.getElementById('btn-modal')

let id = 1
async function getQuote() {
    const quote = await fetch(`http://localhost:3000/quote/${id++}`)
    const resp = await quote.json()
    quotePlaceholder.innerText = `"${resp.quote}"`
    authorPlaceholder.innerText = `- ${resp.author} -`
}

async function postQuote() {
    const formData = new URLSearchParams(new FormData(quoteForm))
    const response = await fetch('http://localhost:3000/quote', {
        method: "POST",
        body: formData
    })
    const result = await response.json()
    alert(result.status)
    hideModal()
}

function hideModal() {
    quoteModal.classList.add('hidden')
}

function showModal() {
    quoteModal.classList.remove('hidden')
}

addQuoteButton.addEventListener('click', postQuote)
nextQuoteButton.addEventListener('click', getQuote)
modalQuoteButton.addEventListener('click', showModal)
closeModalButton.addEventListener('click', hideModal)
getQuote()
