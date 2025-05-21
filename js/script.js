"use strict";
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post-author',
      optTagsListSelector = '.list.tags',
      optCloudClassCount = 5,
      optCloudClassPrefix = 'tag-size-',
      optAuthorsListSelector = '.list.authors';

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

function calculateTagsParams(tags){ //checks how many times tag in "data-tags" is occurs
  const params = {
    max: 0,
    min: 9999,
  };
  for (let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  };
  return params;
}

function calculateTagClass(count, params){ // count-allTags[tag] object and params-tagsParams
  const normalizedCount = count - params.min; //minus because must start at 0
  const normalizedMax = params.max -params.min; // calculate difference max to min to be able calculate percentage
  const percentage = normalizedCount / normalizedMax; // calculate percentage
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) +1); //count what class will be used 
  return optCloudClassPrefix + classNumber;
}

function generateTags(){
  const allArticles = document.querySelectorAll(optArticleSelector);/* find all articles */
  let allTags = {}; //object with "data-tags"

  for (let article of allArticles){/* START LOOP: for every article: */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);  /* find tags wrapper */

    let html = "";/* make html variable with empty string */

    const articleTags = article.getAttribute("data-tags");  /* get tags from data-tags attribute */

    const articleTagsArray = articleTags.split(' ');  /* split tags into array */

    for(let tag of articleTagsArray){  /* START LOOP: for each tag */

      const linkHtml = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li>';  /* generate HTML of the link */

      html = html + linkHtml;  /* add generated code to html variable */
    
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
        } else {
        allTags[tag]++;
      }
      
    }/* END LOOP: for each tag */

    tagsWrapper.innerHTML = html;/* insert HTML of all the links into the tags wrapper */
  }/* END LOOP: for every article: */

   /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  
  const tagsParams = calculateTagsParams(allTags); //call the function with object("data-tags") as argument
  
  let allTagsHTML = ''; /* [NEW] create variable for all links HTML code */

  for(let tag in allTags){  /* [NEW] START LOOP: for each tag in allTags: */  
    const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + tagLinkHTML + '">' + tag + '</a></li>'; /* [NEW] generate code of a link and add it to allTagsHTML */
  }  /* [NEW] END LOOP: for each tag in allTags: */

  tagList.innerHTML = allTagsHTML; /*[NEW] add HTML from allTagsHTML to tagList */
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
  const allLinksTags = document.querySelectorAll('.post-tags a'/*???optArticleTagsSelector*/);/* find all links to tags */

  for (let allLinksTag of allLinksTags){/* START LOOP: for each link */
 
    allLinksTag.addEventListener('click', tagClickHandler)/* add tagClickHandler as event listener for that link */
  }/* END LOOP: for each link */
}  
addClickListenersToTags();

function generateAuthors(){
  const allAuthors = document.querySelectorAll(optArticleAuthorSelector);
  const authorsWrapper = document.querySelector(optAuthorsListSelector);
  let authors = {};
  for (let allAuthor of allAuthors){
    const authorAttribute = allAuthor.getAttribute('data-author');
    const linkHTML = '<a href="#author-'+ authorAttribute +'"> '+ authorAttribute +'</a>';
    allAuthor.innerHTML = linkHTML;
    if (!authors[authorAttribute]){
      authors[authorAttribute] = 1;
    } else {
      authors[authorAttribute]++;
    }
  }
  let html = '';
  for (let author in authors){
    const linkHtml = '<li><a href="#author-' + author + '">' + author + ' (' + authors[author] + ')</a></li>';;
    html += linkHtml;
  }
  authorsWrapper.innerHTML = html;
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
