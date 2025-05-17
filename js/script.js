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
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = ""){ 
  const titleLinks = document.querySelector(optTitleListSelector);
  titleLinks.innerHTML = "";  /* remove contents of titleList */

  let html = "";
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

function generateTags(){
  const allArticles = document.querySelectorAll(optArticleSelector);/* find all articles */
  

  for (let article of allArticles){/* START LOOP: for every article: */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);  /* find tags wrapper */

    let html = "";/* make html variable with empty string */

    const articleTags = article.getAttribute("data-tags");  /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(' ');  /* split tags into array */

    for(let tag of articleTagsArray){  /* START LOOP: for each tag */

      const linkHtml = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li>';  /* generate HTML of the link */

      html = html + linkHtml;  /* add generated code to html variable */
    }/* END LOOP: for each tag */

    tagsWrapper.innerHTML = html;/* insert HTML of all the links into the tags wrapper */
  }/* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){
  
  event.preventDefault();/* prevent default action for this event */

  const clickedElement = this;/* make new constant named "clickedElement" and give it the value of "this" */

  const href = clickedElement.getAttribute("href");/* make a new constant "href" and read the attribute "href" of the clicked element */

  const tag = href.replace('#tag-', '');/* make a new constant "tag" and extract tag from the "href" constant */
 
  const tagsActive = document.querySelectorAll('a.active[href^="#tag-"]');/* find all tag links with class active */

  for (let tagActive of tagsActive){/* START LOOP: for each active tag link */

    tagActive.classList.remove("active");/* remove class active */

  }/* END LOOP: for each active tag link */

   const allTagLinks = document.querySelectorAll('a[href="' + href + '"]');/* find all tag links with "href" attribute equal to the "href" constant */
   
  for (let allTagLink of allTagLinks){/* START LOOP: for each found tag link */

    allTagLink.classList.add("active")/* add class active */

  }/* END LOOP: for each found tag link */

  generateTitleLinks('[data-tags~="' + tag + '"]');/* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  const allLinksTags = document.querySelectorAll(optArticleTagsSelector);/* find all links to tags */

  for (let allLinksTag of allLinksTags){/* START LOOP: for each link */
 
    allLinksTag.addEventListener('click', tagClickHandler)/* add tagClickHandler as event listener for that link */
  }/* END LOOP: for each link */
}  
addClickListenersToTags();

function generateAuthors(){
  const allAuthors = document.querySelectorAll(optArticleAuthorSelector);
  
  for (let allAuthor of allAuthors){
    const authorAttribute = allAuthor.getAttribute('data-author');
    const linkHTML = '<a href="#author-'+ authorAttribute +'"> '+ authorAttribute +'</a>';
    allAuthor.innerHTML = linkHTML;
  }
}

generateAuthors();

function addClickListenersToAuthors(){
 const allAuthors = document.querySelectorAll(optArticleAuthorSelector);

 for (let allAuthor of allAuthors){
  allAuthor.addEventListener('click', authorClickHandler);
 }
}

addClickListenersToAuthors();

function authorClickHandler(event){
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute("href");

  const authorName = href.replace('#author-', '');

  const authorsActive = document.querySelectorAll('a.active[href^="#author-"]');

  for (let authorActive of authorsActive){
  authorActive.classList.remove('active');
  }
  const allAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let allAuthorLink of allAuthorLinks){
    allAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author~="' + authorName + '"]');
}
