"use strict";
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll(".titles a.active")
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }  /* remove class 'active' from all article links  */

  clickedElement.classList.add("active");  /* add class 'active' to the clicked link */

  const disableArticles = document.querySelectorAll(".post")
  for (let disableArticle of disableArticles) {
    disableArticle.classList.remove("active");
  }  /* remove class 'active' from all articles */

  const linkAttribute = clickedElement.getAttribute("href");  /* get 'href' attribute from the clicked link */
    
  const correctArticle = document.querySelector(linkAttribute);  /* find the correct article using the selector (value of 'href' attribute) */
  
  correctArticle.classList.add("active");  /* add class 'active' to the correct article */
}

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

function generateTitleLinks(){
  
  const titleLinks = document.querySelector(optTitleListSelector);
  titleLinks.innerHTML = "";  /* remove contents of titleList */

  let html = "";
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const articleId = article.getAttribute("id");  /* get the article id */
    const articleTitle = article.querySelector(optTitleSelector);  /* find the title element */
    const title = articleTitle.innerHTML;  /* get the title from the title element */
    const linkHTML = '<li><a href="#'+ articleId +'"><span>'+ title +'</span></a></li>';  /* create HTML of the link */
    html = html + linkHTML;  /* insert link into titleList */
  }
  titleLinks.innerHTML = html;
  
  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }   
}

generateTitleLinks();
