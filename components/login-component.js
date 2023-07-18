import { login } from "../api.js";

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
          login ({
            login: "admin",
            password: "admin",
          }).then((user) => {
            setToken(`Bearer ${user.user.token}`);
            fetchCommentsAndRender();
          });
        });
}