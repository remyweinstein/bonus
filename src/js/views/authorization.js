'use stirct';

export const html = '' +
'      <div id="authorization" class="section">' +
'        <div class="container">' +
'          <p class="hero-heading">Введите ваш номер телефона и пароль</p>' +
'          <!-- Номер телефона -->' +
'          <div class="popup"><span class="popup-text" id="auth_phone_popup">Введите номер телефона</span></div>' +
'          <input class="u-full-width" type="text" placeholder="+7-___-___-__-__" id="auth_phone" maxlength="16">' +
'          <!-- Пароль -->' +
'          <div class="popup"><span class="popup-text" id="auth_pass_popup">Введите пароль</span></div>' +
'          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr;">' +
'            <input class="u-full-width" style="grid-area: 1/1/1/4;" type="password" placeholder="Пароль" id="auth_pass">' +
'            <i id="auth_pass_toggle" class="material-icons" style="grid-area: 1/3/1/4; align-self: center; justify-self: right; width: 40px; height: 40px;">remove_red_eye</i>' +
'          </div>' +
'          <!-- Кнопки -->' +
'          <p style="text-align: right;"><a style="font-size: 1.3rem;" href="#" data-link-section="reset">Забыли' +
'              пароль?</a></p>' +
'          <button class="button button-primary" style="width: 100%;" data-click="Conn.auth" id="auth_button">Войти</button>' +
'          <p style="font-size: 1.3rem;">' +
'            <span>У вас ещё нет аккунта?</span>' +
'            <a href="#" data-link-section="pre_registration">Зарегистрироваться</a>' +
'          </p>' +
'        </div>' +
'      </div>';