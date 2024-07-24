

// 売上日計表作成
createAndAddDialog('dailySalesLedgerDialog', '売上日計表', [
    { type: 'radio', id: 'selectDate', label: '日付選択', options: {
        options: [
            { value: '1', text: '売上日付',checked:true },
            { value: '2', text: '請求日付' }
        ],
        width: 'wide'
    }},
    { type: 'range-date', id: 'salesDate', label: '売上日付', options: {
        width: 'wide',
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("売上日計表", function() {openDialog('dailySalesLedgerDialog')})

