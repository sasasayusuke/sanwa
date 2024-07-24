// 請求原価率表
createAndAddDialog('invoiceCostDialog', '請求原価率表', [
    { type: 'range-date', id: 'billDate', label: '請求日付', options: {
        width: 'wide',
        required:true,
    }},
    { type: 'text', id: 'billNum', label: '見積番号', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("請求原価率表", function() {openDialog('invoiceCostDialog')})
