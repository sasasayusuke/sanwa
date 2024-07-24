// 売上日計表作成
createAndAddDialog('uncollectedListDialog', '未回収一覧表', [
    { type: 'range-date', id: 'requestDate', label: '請求日付', options: {
        width: 'wide',
        required:true
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
    { type: 'checkbox', id: 'moneyCheck', label: '金額入金含む', options: {
        width: 'normal',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("未回収一覧表", function() {openDialog('uncollectedListDialog')})
