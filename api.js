import renderApp from "./renderComments.js";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");

let token = 'Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck';
token = null;

export function fetchComments ({ token }) {
    return fetch("https://wedev-api.sky.pro/api/v2/mariia-goppa/comments", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
     let loadingComments = document.getElementById('comments-loader');
    // loadingComments.classList.add('hidden');

    if(response.status === 401) {
      
      //fetchComments();
      throw new Error('No authorization')
    }

  return response.json();
  })
}

    //fetchComments();


  export function postComment ({ text, token }) {

    const commentInputElement = document.getElementById("comment-input");
    const nameInputElement = document.getElementById("name-input");
       return fetch("https://wedev-api.sky.pro/api/v2/mariia-goppa/comments", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ 
          text: commentInputElement.value, 
          name: nameInputElement.value,
          forceError: false,
        }),
      })
      .then((response) => {
        if (response.status === 500) {
          alert("Сервер сломался, попробуй позже");
          throw new Error("Сервер сломался, попробуй позже");
        } 
        else if (response.status === 400) {
          alert("Имя и комментарий должны быть не короче 3 символов"); 
          throw new Error("Имя и комментарий должны быть не короче 3 символов"); 
        } else {
          return response.json();
        };
      })
    };


//  export function deleteComment({ token, id }) {
//    const id = deleteButton.dataset.id;
//    return fetch("https://wedev-api.sky.pro/api/v2/mariia-goppa/comments + id, {
//      method: "DELETE",
//      headers: {
//        Authorization: token,
//      },
//    })
//    .then((response) => {
//      return response.json();
//    })
//  .then((response) => {
//    return fetchComments();
//  });
    

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md

export function loginUser ({ login, password }) {
     return fetch("https://wedev-api.sky.pro/api/user/login", {
      method: "POST",
      body: JSON.stringify({ 
        login,
        password,
      }),
    }).then((response) => {
      if (response.status === 500) {
        alert("Сервер сломался, попробуй позже");
        throw new Error("Сервер сломался, попробуй позже");
      } 
      else if (response.status === 400) { 
        throw new Error("Неверный логин или пароль"); 
      } else {
        return response.json();
      };
    });
  }


  export function registerUser ({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
     method: "POST",
     body: JSON.stringify({ 
       login,
       password,
       name,
     }),
   }).then((response) => {
     if (response.status === 500) {
       alert("Сервер сломался, попробуй позже");
       throw new Error("Сервер сломался, попробуй позже");
     } 
     else if (response.status === 400) { 
       throw new Error("Такой пользователь уже существует"); 
     } else {
       return response.json();
     };
   });
 }