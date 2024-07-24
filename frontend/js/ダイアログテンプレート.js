// スタイルを追加
const styleElement = document.createElement('style');
styleElement.textContent = `
    .dialog input:disabled,
    .dialog select:disabled,
    .dialog textarea:disabled {
        background-color: #f0f0f0;
        color: #888;
        cursor: not-allowed;
    }
    .dialog .error {
        border: 1px solid red;
    }
    .dialog .error-message {
        color: red;
        font-size: 0.8em;
        margin-top: 5px;
    }
    .field-wide {
        width: 100%;
    }
    .field-normal {
        width: 50%;
    }
    .both {
        clear: both;
    }
    .range-container {
        display: flex;
        align-items: center;
    }
    .range-input {
        flex-grow: 1;
        margin: 0 10px;
        -webkit-appearance: none;
        width: 100%;
        height: 5px;
        background: #d3d3d3;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s;
    }
    .range-input:hover {
        opacity: 1;
    }
    .range-input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 15px;
        height: 15px;
        background: #4CAF50;
        cursor: pointer;
        border-radius: 50%;
    }
    .range-input::-moz-range-thumb {
        width: 15px;
        height: 15px;
        background: #4CAF50;
        cursor: pointer;
        border-radius: 50%;
    }
    .range-label {
        min-width: 30px;
        text-align: center;
    }
    .range-text-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .range-text-input {
        width: 45%;
    }
    .range-text-separator {
        margin: 0 10px;
    }
    .SdtRequired::after {
        content: "*";
        color: red;
        margin-left: 3px;
    }
    .radioButton{
        padding-top:7px;
    }
    .radioButton input[type="radio"]{
        vertical-align: sub;
    }
    .inputText{
        width:20%;
    }
    .disableText{
        width:80%;
    }
`;
document.head.appendChild(styleElement);

// ダイアログのベース構造を定義
const createDialogHTML = (dialogId, title, content) => `
    <div id="${dialogId}" class="dialog" title="${title}">
        ${content}
        <div class="command-center">
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="submitDialog('${dialogId}');">
                <span class="ui-button-icon ui-icon ui-icon-disk"></span>
                <span class="ui-icon-disk"> </span>作成
            </button>
            <button class="button button-icon ui-button ui-corner-all ui-widget applied" type="button" onclick="closeDialog('${dialogId}');">
                <span class="ui-button-icon ui-icon ui-icon-cancel"></span>
                <span class="ui-button-icon-space"> </span>戻る
            </button>
        </div>
    </div>
`;

// フィールド作成のヘルパー関数
const createField = (dialogId, type, id, label, options = {}) => {
    const fullId = `${dialogId}_${id}`;
    const disabledAttr = options.disabled ? 'disabled' : '';
    const requiredAttr = options.required ? 'required' : '';
    const additionalAttrs = Object.entries(options.attributes || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    const widthClass = options.width === 'wide' ? 'field-wide' : 'field-normal';
    const requiredClass = requiredAttr == 'required' ? "SdtRequired" : '';

    let fieldHTML = '';
    switch(type) {
        case 'text':
        case 'number':
        case 'email':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label"><label for="${fullId}" class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${fullId}" name="${fullId}" class="control-textbox" type="${type}"
                                ${options.placeholder ? `placeholder="${options.placeholder}"` : ''}
                                ${options.value ? `value="${options.value}"` : ''}
                                ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'select':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label"><label for="${fullId}" class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <select id="${fullId}" name="${fullId}" class="control-dropdown"
                                ${options.onchange ? `onchange="${options.onchange}('${dialogId}', '${id}')"` : ''}
                                ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                <option value="">&nbsp;</option>
                                ${options.options ? options.options.map(opt => `<option value="${opt.value}" ${opt.selected ? 'selected' : ''}>${opt.text}</option>`).join('') : ''}
                            </select>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'datepicker':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label"><label for="${fullId}" class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${fullId}" name="${fullId}" class="control-textbox datepicker" type="text"
                                ${options.placeholder ? `placeholder="${options.placeholder}"` : ''}
                                ${options.value ? `value="${options.value}"` : ''}
                                autocomplete="off" data-format="Y/m/d"
                                ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                            <div class="ui-icon ui-icon-clock current-time"></div>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'textarea':
            fieldHTML = `
                <div id="${fullId}Field" class="field-wide both">
                    <p class="field-label"><label for="${fullId}" class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <div id="${fullId}_viewer" class="control-markup not-send" ondblclick="editMarkdown('${dialogId}', '${id}');">
                                <pre>${options.value ? options.value : '<br>'}</pre>
                            </div>
                            <div id="${fullId}.editor" class="ui-icon ui-icon-pencil button-edit-markdown" onclick="editMarkdown('${dialogId}', '${id}');">
                            </div>
                            <textarea id="${fullId}" name="${fullId}" class="control-markdown"
                                ${options.placeholder ? `placeholder="${options.placeholder}"` : ''}
                                style="height: 100px; display: none;"
                                ${disabledAttr} ${requiredAttr} ${additionalAttrs}>${options.value ? options.value : ''}</textarea>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'checkbox':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <div class="field-control">
                        <div class="container-normal">
                            <input id="${fullId}" name="${fullId}" type="checkbox"
                                ${options.checked ? 'checked' : ''}
                                ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                            <label for="${fullId}" class="${requiredClass}">${label}</label>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'radio':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label ${requiredClass}" >${label}</p>
                    <div class="field-control">
                        <div class="container-normal radioButton">
                            ${options.options ? options.options.map(opt => `
                                <input type="radio" id="${fullId}_${opt.value}" name="${fullId}" value="${opt.value}"
                                    ${opt.checked ? 'checked' : ''}
                                    ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                <label for="${fullId}_${opt.value}">${opt.text}</label>
                            `).join('') : ''}
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'range':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label"><label for="${fullId}"  class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <div class="range-container">
                                <span class="range-label">${options.min || 0}</span>
                                <input id="${fullId}" name="${fullId}" class="range-input" type="range"
                                    min="${options.min || 0}" max="${options.max || 100}" 
                                    value="${options.value || options.min || 0}"
                                    ${disabledAttr} ${requiredAttr} ${additionalAttrs}
                                    oninput="document.getElementById('${fullId}Value').textContent = this.value">
                                <span class="range-label">${options.max || 100}</span>
                            </div>
                            <div id="${fullId}Value" style="text-align: center;">${options.value || options.min || 0}</div>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
        case 'range-text':
            fieldHTML = `
                <div id="${fullId}Field" class="${widthClass} both">
                    <p class="field-label"><label for="${fullId}From" class="${requiredClass}">${label}</label></p>
                    <div class="field-control">
                        <div class="container-normal">
                            <div class="range-text-container">
                                <input id="${fullId}From" name="${fullId}From" class="control-textbox range-text-input" type="text"
                                    ${options.placeholderFrom ? `placeholder="${options.placeholderFrom}"` : ''}
                                    ${options.valueFrom ? `value="${options.valueFrom}"` : ''}
                                    ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                <span class="range-text-separator">～</span>
                                <input id="${fullId}To" name="${fullId}To" class="control-textbox range-text-input" type="text"
                                    ${options.placeholderTo ? `placeholder="${options.placeholderTo}"` : ''}
                                    ${options.valueTo ? `value="${options.valueTo}"` : ''}
                                    ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                            </div>
                        </div>
                    </div>
                    <div class="error-message" id="${fullId}-error"></div>
                </div>
            `;
            break;
            case 'range-date':
                fieldHTML = `
                    <div id="${fullId}Field" class="${widthClass} both">
                        <p class="field-label"><label for="${fullId}From" class="${requiredClass}">${label}</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <div class="range-text-container">
                                    <input id="${fullId}From" name="${fullId}From" class="control-textbox datepicker" type="text" data-format="Y/m/d"
                                        ${options.placeholderFrom ? `placeholder="${options.placeholderFrom}"` : ''}
                                        ${options.valueFrom ? `value="${options.valueFrom}"` : ''}
                                        ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                    <span class="range-text-separator">～</span>
                                    <input id="${fullId}To" name="${fullId}To" class="control-textbox datepicker" type="text" data-format="Y/m/d"
                                        ${options.placeholderTo ? `placeholder="${options.placeholderTo}"` : ''}
                                        ${options.valueTo ? `value="${options.valueTo}"` : ''}
                                        ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                </div>
                            </div>
                        </div>
                        <div class="error-message" id="${fullId}-error"></div>
                    </div>
                `;
                break;
            case 'text-set':
                fieldHTML = `
                    <div id="${fullId}Field" class="field-wide both">
                        <p class="field-label"><label for="${fullId}From" class="${requiredClass}">${label}</label></p>
                        <div class="field-control">
                            <div class="container-normal">
                                <div class="range-text-container">
                                    <input id="${fullId}From" name="${fullId}From" class="control-textbox inputText" type="text"
                                        ${options.placeholderFrom ? `placeholder="${options.placeholderFrom}"` : ''}
                                        ${options.valueFrom ? `value="${options.valueFrom}"` : ''}
                                        ${disabledAttr} ${requiredAttr} ${additionalAttrs}>
                                    <input id="${fullId}To" name="${fullId}To" value="${options.disableValue}" class="control-textbox disableText" type="text"
                                       disabled>
                                </div>
                            </div>
                        </div>
                        <div class="error-message" id="${fullId}-error"></div>
                    </div>
                `;
                break;
    }
    return fieldHTML;
};

// ダイアログを開く関数
function openDialog(dialogId) {
    $(`#${dialogId}`).dialog({
        modal: true,
        width: "520px",
        resizable: false
    });
}

// ダイアログを閉じる関数
function closeDialog(dialogId) {
    $(`#${dialogId}`).dialog('close');
}

// ダイアログ内のフォームをSubmitする関数（カスタマイズが必要）
function submitDialog(dialogId) {
    // バリデーションを実行
    if (!validateDialog(dialogId)) {
        return;
    }
    // ここにダイアログの内容を処理するロジックを実装
    console.log(`Dialog ${dialogId} submitted`);
    closeDialog(dialogId);
}

// ダイアログのバリデーションを行う関数
function validateDialog(dialogId) {
    let isValid = true;
    $(`#${dialogId} [required]`).each(function() {
        const field = $(this);
        const errorElement = $(`#${field.attr('id').replace(/(From|To)$/, '')}-error`);
        if (!field.val()) {
            isValid = false;
            field.addClass('error');
            errorElement.text('この項目は必須です');
        } else {
            field.removeClass('error');
            errorElement.text('');
        }
    });
    return isValid;
}

function editMarkdown(dialogId, id) {
    
    const fullId = `${dialogId}_${id}`;
    $(`#${fullId}`).show().focus();
    $(`#${fullId}_viewer`).hide();
}

// ダイアログを作成し、ページに追加する関数
function createAndAddDialog(dialogId, title, fields) {
    const content = fields.map(field => createField(dialogId, field.type, field.id, field.label, field.options)).join('');
    const dialogHTML = createDialogHTML(dialogId, title, content);
    $('#Application').append(dialogHTML);
}

// フィールドの有効/無効を切り替える関数
function toggleFieldDisabled(fieldId, disabled) {
    const field = $(`#${fieldId}`);
    field.prop('disabled', disabled);
    
    if (disabled) {
        field.addClass('disabled');
    } else {
        field.removeClass('disabled');
    }
}

$(document).on('blur','textarea',function(){
    $(this).hide();
    $(this).prev().prev().text($(this).val());
    $(this).prev().prev().show();
})

$(document).on('change',".inputText",function(){
    //id名から隣要素のid名を取得
    let id = $(this).attr('id');
    id = id.slice(0,-4) + "To";
    //デフォルト値を設定
    let defaultValue = $(`#${id}`).prop('defaultValue');
    $(`#${id}`).val(defaultValue);
    
    let toValue = $(`#${id}`).val();
    if(toValue == '' || $(this).val() == ''){
        return;
    }
    // 要素から選択肢を取得
    let obj = toValue.split(' ').map(e => {
        let tmp = e.split(':');
        return {num:tmp[0],val:tmp[1]};
    })
    let idx = obj.findIndex(e => e.num == $(this).val());
    if(idx == -1) {
        alert('正しい値を入力してください\n数字は半角で入力してください');
        $(this).val('');
        $(this).focus();
        return;
    }
    $(`#${id}`).val(obj[idx].val);
})