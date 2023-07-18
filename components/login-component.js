import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchCommentsAndRender }) {
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
          type="password"
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
            fetchCommentsAndRender();
          }).catch(error => {
            alert(error.message);
          })
        });
}