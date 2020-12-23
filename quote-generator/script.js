const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function startLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function stopLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Get Quote from API
async function getQuote() {
  //Start Loader
  startLoadingSpinner();
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyURL + apiURl);
    const data = await response.json();

    authorText.innerText =
      data.quoteAuthor === " " ? "Anonymous" : data.quoteAuthor;

    //Reduce fontSize if  quoteText is long
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    //stop Loader, show quote
    stopLoadingSpinner();
  } catch (err) {
    getQuote();
    console.error("Whoops no Quote", err);
  }
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
//on Load
getQuote();
startLoadingSpinner();
