'use stirct';

export const html = '' +
'<div id="personal" class="section personal">' +
'        <div class="personal__top">' +
'          <div class="personal__top-avatar">' +
'            <img src="assets/avatar.png">' +
'          </div>' +
'          <div class="personal__top-name">' +
'            <span id="personal_name" class="neutral" style="color: #616161;">Наш Любимый Покупатель</span>' +
'          </div>' +
'          <div class="personal__top-birthdate">' +
'            <hr class="personal__hr-one">' +
'            <span id="personal_birthdate" class="neutral"></span>' +
'            <hr class="personal__hr-two">' +
'          </div>' +
'          <div class="personal__top-phone">' +
'            <span id="personal_phone" class="neutral" style="color: #616161;">+7-___-___-__-__</span>' +
'          </div>' +
'        </div>' +
'        <div class="container">' +
'          <div class="personal__bottom">' +
'            <p class="personal__bottom-level-title">Ваша карта</p>' +
'            <div class="personal__bottom-level">' +
'              <img src="assets/level-bg.png">' +
'              <span id="personalCardType" class="level"></span>' +
'            </div>' +
'            <div id="notMatchCardType" style="display: none; font-size: 18px;color: #616161;margin-top: 40px">' +
'              Завтра Ваша карта станет <span id="notMatchCardTypeValue"></span>' +
'            </div>' +
'            <div class="personal__bottom-event">' +
'              <button class="button-white" data-link-section="personal_update">сменить данные</button>' +
'            </div>' +
'          </div>' +
'        </div>' +
'      </div>';