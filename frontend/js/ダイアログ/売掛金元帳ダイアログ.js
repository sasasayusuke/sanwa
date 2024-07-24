// 売掛金元帳
createAndAddDialog('accountsReceivableDialog', '売掛金元帳', [
    { type: 'datepicker', id: 'requestDate', label: '請求日付', options: {
        width: 'normal',
        required:true,
    }},
    { type: 'text', id: 'deadline', label: '締日', options: {
        width: 'normal',
        required:true,
    }},
    { type: 'range-text', id: 'period', label: '請求期間', options: {
        width: 'wide',
        disabled:true,
    }},
    { type: 'range-text', id: 'clientRange', label: '得意先範囲', options: {
        width: 'wide',
        disabled:true,
    }},
    { type: 'text-set', id: 'issueCategory', label: '発行区分', options: {
        width: 'normal',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("売掛金元帳", function() {openDialog('accountsReceivableDialog')})

