

// 請求明細一覧表
createAndAddDialog('requestParticularsListDialog', '請求明細一覧表', [
    { type: 'range-date', id: 'requestDate', label: '請求日付', options: {
        width: 'wide',
        required:true
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("請求明細一覧表", function() {openDialog('requestParticularsListDialog')})

