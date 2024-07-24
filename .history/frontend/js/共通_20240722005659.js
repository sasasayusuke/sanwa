/**
 * 指定された文言と完全に一致する最初のリンクを検索し、href属性を'#'に変更して、クリック時にカスタム関数を実行する関数
 * @param {string} searchText - リンクを検索するための文言（完全一致）
 * @param {function} customClickHandler - クリック時に実行されるカスタム関数
 * @returns {boolean} - リンクが見つかって修正されたかどうか
 */
function commonModifyLink(searchText, customClickHandler) {
    // 指定された文言と完全に一致する最初のリンクを検索
    const link = Array.from(document.getElementsByTagName('a')).find(a =>
        a.textContent.trim() === searchText.trim()
    );

    if (link) {
        // data-value 属性を取得 (存在しない場合は null)
        const dataValue = link.closest('[data-value]')?.getAttribute('data-value');

        // href属性を'#'に変更
        link.setAttribute('href', '#');

        // onclick属性を追加
        link.onclick = function(event) {
            event.preventDefault();
            customClickHandler(dataValue, link.textContent);
            return false;
        };

        return true;
    } else {
        // リンクが見つからなかった場合
        alert(`"${searchText}" と完全に一致するリンクが見つかりませんでした。`);
        return false;
    }
}

/**
 * コマンドエリアにボタンを追加する関数です。
 * @param {String} buttonId     ボタンID
 * @param {Function} clickFunc  click時関数
 * @param {String} label        ラベル
 * @param {String} title        タイトル
 * @param {String} style        スタイル
 * @param {String} icon         アイコン（empty指定でアイコンなし）
 * @param {String} appendId     appendする要素ID
 * @param {Array} applys        適用するステータス
 */
function commonAddButton(buttonId, clickFunc, label, title, style, icon = "ui-icon-disk", appendId = "MainCommands", applys = "all") {
    if (!commonCheckStatus(applys)) return

    let target = document.getElementById(appendId)
    let elem = document.createElement('button')
    elem.id = buttonId
    elem.className = 'button button-icon ui-button ui-corner-all ui-widget applied'
    elem.onclick = clickFunc
    if (!commonIsNull(title)) elem.title = title
    if (!commonIsNull(style)) elem.style = style
    elem.innerText = label
    if (icon !== "empty") {
        let span = document.createElement('span')
        span.className = `ui-button-icon ui-icon ${icon}`
        elem.appendChild(span)
    }
    let space = document.createElement('span')
    space.className = "ui-button-icon-space"
    elem.appendChild(space)

    target.appendChild(elem)
}

/**
 * ステータスをチェックする関数です。
 * @param {Array} applys        適用するステータス
 */
function commonCheckStatus(applys = "all") {
    let allFlg = false
    if (!Array.isArray(applys)) {
        if (applys = "all") {
            allFlg = true
        } else {
            applys = [applys]
        }
    }
    return allFlg || applys.map(v => +v).includes(+commonGetVal("Status", true))
}


/**
 * Null判定する関数です。
 * @param {object} obj オブジェクト
 *
 * @return {boolean} 判定結果
 */
function commonIsNull(obj) {
    if (Array.isArray(obj)) {
        return obj.filter(v => String(v).trim() !== '').length == 0
    } else if (typeof obj === 'object') {
        return !obj || Object.keys(obj).length === 0 && obj.constructor === Object
    } else {
        return !obj && obj !== 0 || String(obj).trim() == ''
    }
}
