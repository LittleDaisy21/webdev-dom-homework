import { loginUser, registerUser } from "../api.js";
import { fetchCommentsAndRender } from "../main.js";


export function renderLoginComponent({ userComments, appEl, setToken, setName, fetchComments }) {
    let isLoginMode = true;

   const userCommentsHtmlNotEdit = userComments.map((userComment, index) => {
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
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${userComment.likeCounter}</span>
            <button data-index="${index}" class="like-button ${userComment.active}"></button>
          </div>
        </div>
      </li>`;
    }).join('');
   let appHtml = `<div class="container">
    <ul class="comments">
     ${userCommentsHtmlNotEdit}
    </ul>  
    <div>Чтобы добавить комментарий, <a  id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
    </div>`;
  
    appEl.innerHTML = appHtml;

    document.getElementById('login-link').addEventListener('click', () => {
    const renderForm = () => {
      let  appHtml = `
        <div class="container">
        <div id="new-comment-section" class="add-form">
          <h3 class="login-form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
          <div class="login-form">
            ${
            isLoginMode 
            ? '' 
            : 
            `<p class="login-form-text">Имя</p>
            <input id="name-input" value=""type="text" class="add-form-name" />
            <br>`
            }
            
            <p class="login-form-text">Логин</p> 
            <input id="login-input" value=""type="text" class="add-form-name" />
            <br> <br>
            <p class="login-form-text">Пароль</p>
            <input id="password-input" value=""type="password" class="add-form-name" />
    
            
          </div>
          <div class="login-form">
            <button id="login-button" class="login-button">${isLoginMode ? "Войти" : "Зарегистрироваться"}</button>
            <button id="toggle-button" class="toggle-button">Перейти ${isLoginMode ? "к регистрации" : "ко входу"}</button>
        </div>
        </div>`;
        
        appEl.innerHTML = appHtml;
        document.getElementById('toggle-button').addEventListener('click', () => {
          isLoginMode = !isLoginMode;
          renderForm();
      });
        
        
            document.getElementById('login-button').addEventListener('click', () => {
            if(isLoginMode) {
                const login = document.getElementById('login-input').value;
                const password = document.getElementById('password-input').value;
       
                if(!login) {
                   alert('Введите логин')
                   return;
                }
       
                if(!password) {
                   alert('Введите пароль')
                   return;
                }
       
                 loginUser ({
                   login: login,
                   password: password,
                 }).then((user) => {
                   setToken(`Bearer ${user.user.token}`);
                   setName(user.user.name);
                   fetchCommentsAndRender();
                 }).catch(error => {
                  if (error.message === "Сервер сломался") {
                    alert("Сервер сломался, попробуйте позже");
                    fetchComments();
                  } else if (error.message === "Нет авторизации") {          
                      alert(error.message);
                    } else {
                      alert('Кажется, у вас сломался интернет, попробуйте позже');
                      console.log(error);
                    }
               });
            } else {
               const login = document.getElementById('login-input').value;
               const name = document.getElementById('name-input').value;
               const password = document.getElementById('password-input').value;

               if(!name) {
                alert('Введите имя')
                return;
             }
      
               if(!login) {
                  alert('Введите логин')
                  return;
               }
      
               if(!password) {
                  alert('Введите пароль')
                //  return;
               }
      
                registerUser ({
                  login: login,
                  password: password,
                  name: name,
                }).then((user) => {
                  setToken(`Bearer ${user.user.token}`);
                  fetchCommentsAndRender();
                }).catch(error => {
                  if (error.message === "Сервер сломался") {
                    alert("Сервер сломался, попробуйте позже");
                    fetchComments();
                  } else if (error.message === "Нет авторизации") {          
                      alert(error.message);
                    } else {
                      alert('Кажется, у вас сломался интернет, попробуйте позже');
                      console.log(error);
                    }
            });
            
      };

  });
       }
    renderForm();
});
}