import { loginUser } from "../api.js";

export function renderLoginComponent({ appEl, setToken, fetchCommentsAndRender }) {
    let isLoginMode = false;

    const renderForm = () => {
        const appHtml = `
        <div class="container">
        
        <div id="new-comment-section" class="add-form">
          <h3 class="login-form-title">Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
          <div class="login-form">
            ${
            isLoginMode 
            ? '' 
            : 
            `<p class="login-form-text">Имя</p>
            <input id="password-input" value=""type="text" class="add-form-name" />
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
        </div>
        `;
        
        
            appEl.innerHTML = appHtml;
        
            document.getElementById('login-button').addEventListener('click', () => {
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
    
    
            document.getElementById('toggle-button').addEventListener('click', () => {
                isLoginMode = !isLoginMode;
                renderForm();
            });
    };
    renderForm();
}