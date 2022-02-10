'use stirct';

export const html = '' +
'    <div id="reset" class="section">' +
'        <div class="container">' +
'          <h3>Не удается войти?</h3>' +
'          <i class="material-icons" style="font-size: 48px">no_encryption</i>' +
'          <p class="hero-heading">Введите ваш номер мобильного телефона</p>' +
'          <div class="popup"><span class="popup-text" id="reset_phone_popup">Введите номер телефона</span></div>' +
'          <input class="u-full-width" type="text" placeholder="+7-___-___-__-__" id="reset_phone" maxlength="16">' +
'          <button class="button button-primary" style="width: 100%;" id="reset_button">Получить код для входа</button>' +
'          <!-- Блок подтверждения входа -->' +
'          <div id="reset_confirmation" style="display: none;">' +
'            <div id="reset_confirmation_info" style="font-weight: bold;"></div>' +
'            <input class="u-full-width" type="number" placeholder="Код" id="reset_confirmation_code" maxlength="4">' +
'            <p id="reset_confirmation_time" class="neutral" style="display: none;"></p>' +
'            <p style="font-size: 1.3rem;">' +
'              <span>Мне не позвонили,</span>' +
'              <a href="#" onclick="feedback.style.display=\'\'">что мне делать?</a>' +
'            </p>' +
'            <button class="button button-primary" style="width: 100%;" data-click="Conn.checkResetConfirmationCode" id="reset_confirmation_button" disabled="">Войти</button>' +
'          </div>' +
'          <div class="gridstone">' +
'            <hr>' +
'            <div>или</div>' +
'            <hr>' +
'          </div>' +
'          <p style="font-size: 1.3rem;">' +
'            <a href="#" data-link-section="pre_registration">Создать новый аккаунт</a>' +
'          </p>' +
'        </div>' +
'      </div>';