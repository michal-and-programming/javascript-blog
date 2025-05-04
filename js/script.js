"use strict";
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

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
  console.log("click link" + linkAttribute);
    
  const correctArticle = document.querySelector(linkAttribute);  /* find the correct article using the selector (value of 'href' attribute) */
  console.log("article" + correctArticle);
  
   correctArticle.classList.add("active"); /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}