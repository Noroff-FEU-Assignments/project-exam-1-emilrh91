fetch('data/newsData.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(newsData => {
    displayNewsArticles(newsData);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  function displayNewsArticles(newsData) {
    const newsArticle1 = document.querySelector('.news-article1');
    const newsArticle2 = document.querySelector('.news-article2');
    const newsArticle3 = document.querySelector('.news-article3');
  
    newsArticle1.innerHTML = generateNewsArticleHTML(newsData[0]);
    newsArticle2.innerHTML = generateNewsArticleHTML(newsData[1]);
    newsArticle3.innerHTML = generateNewsArticleHTML(newsData[2]);
  }
    
  function generateNewsArticleHTML(article) {
    const articleURL = 'https://www.noroff.no/nyheter/nytt-fra-noroff/1623-derfor-er-noroff-et-godt-valg';
    return `
      <a href="${articleURL}" target="_blank">
        <h3>${article.title}</h3>
        <p>${article.newspage}</p>
        <img src="${article.image}" alt="${article.title}" />
      </a>
    `;
  }