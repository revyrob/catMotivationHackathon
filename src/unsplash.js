// to do: obscure API key
// to do: photo attribution
//Will have to let the client put their own API key for unsplash in the required area
/**
 * function to grab unsplash URL
 * You will need API key with your own key
 * Since this is a frontend server there is no .env file to change the user api key
 */
(function () {
  // url below grabs a random landscape cat photo.
  const unsplashURL = `https://api.unsplash.com//photos/random?client_id=${API_KEY}&query=cats&orientation=landscape`;

  let catPicsArray = [
    "../imgs/cat-1.jpeg",
    "../imgs/cat-2.jpeg",
    "../imgs/cat-3.jpeg",
    "../imgs/cat-4.jpeg",
    "../imgs/cat-5.jpeg",
    "../imgs/cat-6.jpeg",
    "../imgs/cat-7.jpeg",
    "../imgs/cat-8.jpeg",
    "../imgs/cat-9.jpeg",
    "../imgs/cat-10.jpeg",
    "../imgs/cat-11.jpeg",
    "../imgs/cat-12.jpeg",
    "../imgs/cat-13.jpeg",
    "../imgs/cat-14.jpeg",
    "../imgs/cat-15.jpeg",
  ];

  const displayLocalCat = (array) => {
    const randomIndex = Math.floor(Math.random() * catPicsArray.length);
    const item = array[randomIndex];
    return item;
  };

  const catPic = document.querySelector(".poster__cat");
  const catImg = document.createElement("img");
  catPic.appendChild(catImg);

  const displayCat = () => {
    axios
      .get(unsplashURL)
      .then((response) => {
        const catURL = response.data.urls.regular;
        const borderColor = response.data.color;
        catImg.setAttribute("src", catURL);
        catImg.setAttribute("class", "poster__mainimg");
        catImg.style.borderColor = borderColor;
        catPic.appendChild(catImg);
      })
      .catch((error) => {
        console.log(error);
        const catfile = displayLocalCat(catPicsArray);
        catImg.setAttribute("src", catfile);
        catImg.setAttribute("class", "poster__mainimg");
        catPic.appendChild(catImg);
      });
  };

  /**
   * QUOTE CODE
   */
  const quoteURL = "https://type.fit/api/quotes";
  const quoteMainText = document.querySelector(".poster__text--maintext");
  const quoteAuthor = document.querySelector(".poster__text--attribution");
  const quoteButton = document.querySelector(".main__btn");

  const loadQuote = () => {
    axios
      .get(quoteURL)
      .then((response) => {
        //call an array of the data
        const motivationQuotes = response.data;

        //random function to choose an quote in the array
        function getRandomItem(arr) {
          // get random index value
          const randomIndex = Math.floor(Math.random() * arr.length);

          // get random item
          const item = arr[randomIndex];
          return item;
        }
        const result = getRandomItem(motivationQuotes);
        quoteMainText.innerText = result.text;
        // console.log(result.author);
        quoteAuthor.innerText = result.author;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
   * array of healine words
   */
  const headlineArray = [
    "Action",
    "Accomplishment",
    "Courage",
    "Bravery",
    "Adventure",
    "Appreciation",
    "Ambition",
    "Perserverance",
    "Patience",
    "Possibilities",
    "Power",
    "Practice",
  ];

  /**
   * generate the headline
   */
  const headline = document.querySelector(".poster__text--headline");
  const generateHeadline = (array) => {
    const random = Math.floor(Math.random() * array.length);
    const headlineString = array[random].split("").join(" • ");
    headline.innerText = headlineString;
  };

  /**
   * Display the quote & headline when the button is clicked.
   */
  quoteButton.addEventListener("click", () => {
    displayCat();
    generateHeadline(headlineArray);
    loadQuote();
  });

  /**
   * load the contents when the page loads.
   */
  displayCat();
  generateHeadline(headlineArray);
  loadQuote();

  /**
   * don't delete this.
   */
})();

const shareBtn = document.querySelector(".main__copy");
const topTen = document.querySelector(".topTenPoster");

shareBtn.addEventListener("click", () => {
  html2canvas(document.querySelector(".poster__wrapper"), {
    letterRendering: 1,
    allowTaint: true,
    onrendered,
  }).then(function (canvas) {
    const posterList = document.createElement("ul");
    posterList.classList.add("topten__list");
    const posterListItem = document.createElement("li");
    posterListItem.classList.add("topten__poster");
    posterListItem.appendChild(canvas);
    posterList.appendChild(posterListItem);
    topTen.appendChild(posterList);
  });
});
