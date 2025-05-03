"use strict";
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/
const titleClickHandler = function(event){
  const clickedElement = this;
  console.log('clickedElement (with plus): ' + clickedElement);

  const activeLinks = document.querySelectorAll(".titles a.active")
  for (let activeLink of activeLinks){
    activeLink.classList.remove("active");
  }/* remove class 'active' from all article links  */

  clickedElement.classList.add("active");/* add class 'active' to the clicked link */

  /* remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}