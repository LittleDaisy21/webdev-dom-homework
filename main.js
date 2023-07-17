
//export { time };
import renderApp from "./renderComments.js";
import { fetchComments } from "./api.js";

const buttonElement = document.getElementById("add-button");
const deleteButtonElement = document.getElementById("delete-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const likeButtonElements = document.querySelectorAll(".like-button");
const editButtonElements = document.querySelectorAll(".edit-button");
const commentElements = document.querySelectorAll(".comment");



    // Data in array


   export let userComments = [];



      // Data from API
    
      //fetchComments();


      renderApp(userComments);


  

    // Time function
    
  //  function time () {
  //  let myDate = new Date();
  //  const months = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
  //  let fullDate = myDate.getDate() + "." + months[myDate.getMonth()] + "." + myDate.getFullYear() + " " + myDate.getHours() +":" + myDate.getMinutes();
  //  return fullDate;
 //   }

    
   