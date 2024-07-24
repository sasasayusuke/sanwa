

// 請求一覧表
createAndAddDialog('requestListDialog', '請求一覧表', [
    { type: 'datepicker', id: 'requestDate', label: '請求年月', options: {
        width: 'normal',
        required:true
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("請求一覧表", function() {openDialog('requestListDialog')})

