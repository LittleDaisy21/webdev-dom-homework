
//export { time };
import { renderApp } from "./renderComments.js";
import { getCommentsList } from "./listComments.js";
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
   let userComments = [];

   const fetchCommentsAndRender = () => {
    return fetchComments()
      .then((responseData) => {
        let userComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleString().slice(0, -3),
          comment: comment.text,
          likeCounter: 0,
          isLiked: false,
          active: "",
          isEdit: false,
          };
      });
    return renderApp(userComments, getCommentsList);
      })
      .then ((response) => {
      //  comments-loader.style.display = none;
      })
      .catch((error) => {
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          fetchComments();
        } else if (error.message === "Нет авторизации") {          
            console.log(error);
          } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.log(error);
          }
      });
      };
  
    fetchCommentsAndRender();


    // Time function
    
  //  function time () {
  //  let myDate = new Date();
  //  const months = ["01", "02", "03", "04", "05", "06","07", "08", "09", "10", "11", "12"];
  //  let fullDate = myDate.getDate() + "." + months[myDate.getMonth()] + "." + myDate.getFullYear() + " " + myDate.getHours() +":" + myDate.getMinutes();
  //  return fullDate;
 //   }

    export { fetchCommentsAndRender }
   