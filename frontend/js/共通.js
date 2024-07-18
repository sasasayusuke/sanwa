
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
