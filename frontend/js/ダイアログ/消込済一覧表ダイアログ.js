// 売上日計表作成
createAndAddDialog('retractedListDialog', '消込済一覧表', [
    { type: 'range-date', id: 'requestDate', label: '請求日付', options: {
        width: 'wide',
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("消込済一覧表", function() {openDialog('retractedListDialog')})
