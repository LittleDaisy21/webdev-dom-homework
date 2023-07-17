const listElement = document.getElementById("list");
import { fetchComments, postComment } from "./api.js";

let token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck';
token = null;

const renderApp = (userComments) => {

  const appEl = document.getElementById("app");

 if(!token) {
  const appHtml = `

<div class="container">

<div id="new-comment-section" class="add-form">
  <h3 class="login-form-title">Форма входа</h3>
  <div class="login-form">
    <p class="login-form-text">Логин</p> 
    <input id="login-input" value=""
      type="text"
      class="add-form-name"
      />
      <br> <br>
      <p class="login-form-text">Пароль</p>
    <input id="password-input" value=""
      type="text"
      class="add-form-name"
      />
  </div>
  
  <div class="login-form">
    <button id="log-button" class="login-button">Войти</button>
  </div>
</div>
`;


    appEl.innerHTML = appHtml;

    document.getElementById('log-button').addEventListener('click', () => {
      token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck';
      fetchComments();
    })

    return;
 }  


  let userCommentsHtml = userComments.map((userComment, index) => {
    if (!userComments[index].isEdit) {
      userComments.isEdit = true;
      return `<li class="comment" data-index="${index}" data-name="${userComment.name}" data-text="${userComment.comment}">
      <div class="comment-header">
        <div>${userComment.name}</div>
        <div>${userComment.date}</div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          ${userComment.comment}
        </div>
      </div>
      <button data-index="${index}" class="edit-button" type="button">Редактировать</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${userComment.likeCounter}</span>
          <button data-index="${index}" class="like-button ${userComment.active}"></button>
        </div>
      </div>
    </li>`;
    } else {
      userComments.isEdit = false;
      return `<li class="comment">
      <div class="comment-header">
        <div>${userComment.name}</div>
        <div>${userComment.date}</div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          <textarea class="comment-text-edit">${userComment.comment}</textarea>
        </div>
      </div>
      <button data-index="${index}" class="edit-button" type="button">Сохранить</button>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${userComment.likeCounter}</span>
          <button data-index="${index}" class="like-button ${userComment.active}"></button>
        </div>
      </div>
    </li>`;
    }
  }).join('');

const appHtml = `

<div class="container">
<p id="comments-loader" class="visible">Пожалуйста, подождите, загружаю комментарии...</p>
<ul id="list" class="comments">
  <!-- The list is rendering from JS --> 
${userCommentsHtml}
</ul>
<p id="new-comment-loader" class="hidden">Комментарий добавляется...</p>
<div id="new-comment-section" class="add-form">
  <input id="name-input" value=""
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
  />
  <textarea id="comment-input" value=""
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш комментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button disabled="true" id="add-button" class="add-form-button">Написать</button>
    <button id="delete-button" class="add-form-button">Удалить последний</button>
  </div>
</div>
</div>`;


    appEl.innerHTML = appHtml;

    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
     const commentInputElement = document.getElementById("comment-input");
     const deleteButtonElement = document.getElementById("delete-button");


          // Edit button

          const initEditButton = (userComments) => {
            const editButtonElements = document.querySelectorAll(".edit-button");
            for (const editButtonElement of editButtonElements) {
              const index = editButtonElement.dataset.index;
              editButtonElement.addEventListener("click", (event) => {
                event.stopPropagation();
                if (!userComments[index].isEdit) {
                  userComments[index].isEdit = true;
                } else {
                  userComments[index].isEdit = false;
                }
                renderApp(userComments);
              });
            }
          };

         // Like button

         const initLikeButton = (userComments) => {
          const likeButtonElements = document.querySelectorAll(".like-button");
          for (const likeButtonElement of likeButtonElements) {
            const index = likeButtonElement.dataset.index;
            likeButtonElement.addEventListener("click", (event) => {
              event.stopPropagation();
              if (!userComments[index].isLiked) {
                userComments[index].isLiked = true;
                userComments[index].active = "-active-like";
                userComments[index].likeCounter += 1;
              } else {
                userComments[index].isLiked = false;
                userComments[index].active = "";
                userComments[index].likeCounter -= 1;
              }
              renderApp(userComments);
            });
          }
        };
     

    const addNewElementToList = () => {


      // Validation data check

      nameInputElement.classList.remove('error');
       if (nameInputElement.value === "") {
        nameInputElement.classList.add('error');
        return;
      }
      commentInputElement.classList.remove('error');
      if (commentInputElement.value === "") {
        commentInputElement.classList.add('error');
        return;
      }

      // Post from API

        postComment();

      //  renderUserComments();
        
     };


     buttonElement.addEventListener("click", addNewElementToList);
     
     

         // Validation form check for the button

    const validateForm = () => {
      if (nameInputElement.value === "") {
        buttonElement.disabled = true;
        return;
      }
  
      if (commentInputElement.value === "") {
        buttonElement.disabled = true;
        return;
      }

      buttonElement.disabled = false;
    };

    nameInputElement.addEventListener("input", validateForm);
    commentInputElement.addEventListener("input", validateForm);


    // Enter button

    document.addEventListener("keyup", (event) => {
      console.log("keyup", `${event.code}`);
      if (event.code === 'Enter') {
        addNewElementToList();
      }
    });

    // Delete button

    deleteButtonElement.addEventListener("click", () => {
      // const listComments = document.getElementById("list");
      // listComments.lastChild.remove();

      const comments = document.getElementById("list");
      const lastIndex = comments.innerHTML.lastIndexOf('<li class="comment"');
      comments.innerHTML = comments.innerHTML.slice(0, lastIndex);
      initLikeButton(userComments);
      initEditButton(userComments);
    });

    // Reply to a comment

      const replyToComment = (userComments) => {
      const commentElements = document.querySelectorAll(".comment");
        for (const commentElement of commentElements) {
          commentElement.addEventListener("click", () => {
              let userName = commentElement.dataset.name;
              let textComment = commentElement.dataset.text;
              commentInputElement.value = userName +"\n" + textComment;
          });
        }
      };

    


    initLikeButton(userComments);
    initEditButton(userComments);
    replyToComment(userComments);
  };

  export default renderApp;