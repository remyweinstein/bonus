'use stirct';

export const html = '' +
'    <div id="registration" class="section">' +
'        <div class="container">' +
'          <!-- Блок регистрации -->' +
'          <div id="registration_cont" class="row">' +
'            <p class="hero-heading">Для завершения регистрации укажите свои контактные данные</p>' +
'            <div class="reg_inp">' +
'              <input class="u-full-width" type="text" placeholder="Имя" id="reg_firstname">' +
'            </div>' +
'            <!-- Номер телефона -->' +
'            <div class="popup"><span class="popup-text" id="reg_phone_popup">Введите номер телефона</span></div>' +
'            <div class="reg_inp required">' +
'              <input class="u-full-width required" type="text" placeholder="+7-___-___-__-__" id="reg_phone" maxlength="16">' +
'            </div>' +
'            <div class="popup"><span class="popup-text" id="reg_birthdate_popup">Введите дату рождения</span></div>' +
'            <div class="reg_inp required">' +
'              <input class="u-full-width" data-date-format="dd-mm-yyyy" type="text" placeholder="__-__-____" id="reg_birthdate" maxlength="10">' +
'            </div>' +
'            <!-- Дата рождения -->' +
'            <div class="reg_inp">' +
'              <input class="u-full-width" type="email" placeholder="e-mail" id="reg_email">' +
'            </div>' +
'            <!-- Пароль -->' +
'            <div class="popup"><span class="popup-text" id="reg_pass_popup">Введите пароль, не менее 6 символов</span>' +
'            </div>' +
'            <div id="reg_password_group" class="reg_inp required" style="display: grid; grid-template-columns: 1fr 1fr 1fr;">' +
'              <input class="u-full-width" style="grid-area: 1/1/1/4;" type="password" placeholder="Пароль" id="reg_pass">' +
'              <i id="reg_pass_toggle" class="material-icons" style="grid-area: 1/3/1/4; align-self: center; justify-self: right; width: 40px; height: 40px;">remove_red_eye</i>' +
'            </div>' +
'            <div id="reg_password_group" class="reg_inp required" style="display: grid; grid-template-columns: 1fr 1fr 1fr;">' +
'              <input class="u-full-width" style="grid-area: 1/1/1/4;" type="password" placeholder="Повторите пароль" id="reg_pass_confirm">' +
'              <i id="reg_pass_toggle_confirm" class="material-icons" style="grid-area: 1/3/1/4; align-self: center; justify-self: right; width: 40px; height: 40px;">remove_red_eye</i>' +
'            </div>' +
'            <label for="subscribe" class="subscribe_info"><span>Я хочу получать уведомления об акциях, новинках,' +
'                сообщениях. Сменить <a>подписки и уведомления</a> можно в <a>настройках</a></span></label>' +
'            <span class="required-desc">* поля обязательные к заполнению</span>' +
'            <hr>' +
'            <!-- Система скидок -->' +
'            <div id="loyalty-system" class="system system-reg">' +
'              <p class="system_title">Выберите систему скидок</p>' +
'              <div class="system_tabs">' +
'                <div class="system_tabs-head">' +
'                  <span class="system_tabs-head-item tab_h_active"><input id="prem" type="radio" name="system" value="0" checked=""><label for="prem">Бонусная <br> скидки до 50%</label></span>' +
'                  <span class="system_tabs-head-item"><input id="discount" type="radio" name="system" value="1"><label for="discount">Дисконтная</label></span>' +
'                </div>' +
'                <div class="system_tabs-content">' +
'                  <div class="system_tabs-content-item tab_c_active"><span>Кэшбек бонусами до 15%, бонусы в подарок, 2000 бонусов в подарок при регистрации.</span></div>' +
'                  <div class="system_tabs-content-item"><span>Вы можете получать скидки от 5% до 10% на товар, который можно приобрести со скидкой.</span></div>' +
'                </div>' +
'              </div>' +
'            </div>' +
'            <!-- Согласие с условиями -->' +
'            <p class="reg_confirm">Создавая аккаунт, я соглашаюсь с <a data-click="Util.showRules">правилами</a> и даю' +
'              согласие' +
'              на <a data-click="Util.showTerms">обработку персональных данных</a>.</p>' +
'            <!-- Кнопка регистрации -->' +
'            <button class="button button-primary" style="width: 100%;" id="reg_button">Создать аккаунт</button>' +
'          </div>' +
'          <!-- Блок подтверждения регистрации -->' +
'          <div id="reg_confirmation" style="display: none;">' +
'            <div id="reg_confirmation_info"></div>' +
'            <div id="reg_confirmation_remind"></div>' +
'            <div class="popup"><span class="popup-text" id="reg_confirmation_code_popup"></span></div>' +
'            <input class="u-full-width" type="number" placeholder="Код" id="reg_confirmation_code">' +
'            <button class="button button-primary" style="width: 100%;" data-click="Conn.confirmation" id="confirmation_button">Подтвердить</button>' +
'            <button class="button button-primary" style="width: 100%; display: none" data-click="Conn.confirmationReset" id="confirmation_button_reset">Получить СМС</button>' +
'          </div>' +
'          <!-- Авторизация -->' +
'          <p class="reg_auth" style="font-size: 1.3rem;">' +
'            <span>Постойте, но ведь</span>' +
'            <a href="#" data-link-section="authorization">я уже зарегистрирован</a>' +
'          </p>' +
'        </div>' +
'      </div>';