'use stirct';

export const html = '' +
'    <div id="personal_update" class="section personal-update">' +
'        <div class="container">' +
'          <div id="replace_card" style="display: none">' +
'            <p class="hero-heading">Переход на пластиковую карту:</p>' +
'            <div class="popup"><span class="popup-text" id="personal_new_card_popup">Введите номер карты</span></div>' +
'            <input class="u-full-width" type="text" placeholder="Номер карты" id="personal_new_card" popup_id="personal_new_card_popup">' +
'            <button id="personal_changeCard_button" class="button-primary">Подтвердить</button>' +
'          </div>' +
'          <div class="set_plastic-top">' +
'            <a href="#" data-link-section="set_plastic">Привязать пластиковую карту</a>' +
'            <p>Пластиковую карту можно получить в магазине.</p>' +
'            <a href="#" data-link-section="stores">Найти магазин.</a>' +
'          </div>' +
'          <p class="hero-heading text-center">Изменить пароль</p>' +
'          <div class="popup"><span class="popup-text" id="personal_new_pass_popup">Введите новый пароль</span></div>' +
'          <div class="update__pass">' +
'            <input class="u-full-width" type="password" placeholder="введите новый пароль" id="personal_new_pass" popup_id="personal_new_pass_popup">' +
'            <i id="update_pass_toggle" class="material-icons" style="grid-area: 1/3/1/4; align-self: center; justify-self: right; width: 40px; height: 40px;">remove_red_eye</i>' +
'          </div>' +
'          <div class="popup"><span class="popup-text" id="personal_new_pass_confirmation_popup">Введенные пароли не' +
'              совпадают</span></div>' +
'          <div class="update__pass">' +
'            <input class="u-full-width" type="password" placeholder="повторите новый пароль" id="personal_new_pass_confirmation" popup_id="personal_new_pass_confirmation_popup">' +
'            <i id="update_pass_toggle_confirm" class="material-icons" style="grid-area: 1/3/1/4; align-self: center; justify-self: right; width: 40px; height: 40px;">remove_red_eye</i>' +
'          </div>' +
'        </div>' +
'        <div class="personal-update-system">' +
'          <div class="container">' +
'            <p class="hero-heading text-center" style="margin-top: 0px;text-transform: uppercase">Выберите тип карты</p>' +
'            <div class="system system-update">' +
'              <div class="system_tabs">' +
'                <div class="system_tabs-head">' +
'                  <span class="system_tabs-head-item-change tab_h_active"><input id="premChange" type="radio" name="systemChange" value="0" checked=""><label for="premChange">Бонусная</label></span>' +
'                  <span class="system_tabs-head-item-change"><input id="discountChange" type="radio" name="systemChange" value="1"><label for="discountChange">Дисконтная</label></span>' +
'                </div>' +
'                <div class="system_tabs-content">' +
'                  <div class="system_tabs-content-item-change tab_c_active"><span>С покупок Вы получаете кэшбек' +
'                      бонусными' +
'                      рублями. Свои скидки Вы сможете смотреть в личном кабинете.</span></div>' +
'                  <div class="system_tabs-content-item-change"><span>Вы можете получать скидки от 5% до 10% на товар,' +
'                      который можно приобрести со скидкой.</span></div>' +
'                </div>' +
'              </div>' +
'            </div>' +
'          </div>' +
'          <div class="container">' +
'            <p style="text-align: center;font-size: 13px;">Сменить вид программы Вы можете один раз в сутки. <a onclick="rules.style.display=\'\'">Подробнее</a></p>' +
'            <button id="personal_changePassword_button" class="button-primary" style="width: 100%;">Внести' +
'              изменения</button>' +
'          </div>' +
'        </div>' +
'      </div>';