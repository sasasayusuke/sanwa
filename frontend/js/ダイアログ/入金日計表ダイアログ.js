// 売上日計表作成
createAndAddDialog('dailyDepositDialog', '入金日計表', [
    { type: 'range-date', id: 'depositDate', label: '入金日付', options: {
        width: 'wide',
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("入金日計表", function() {openDialog('dailyDepositDialog')})

