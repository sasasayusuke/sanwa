//ヤオコー請求明細表
createAndAddDialog('MAMIMARTitemizedBillingListDialog', 'マミーマート請求明細表', [
    { type: 'datepicker', id: 'requestDate', label: '請求日付', options: {
        width: 'normal',
        required:true
    }},
    { type: 'text', id: 'deadLine', label: '締日', options: {
        width: 'normal',
        required:true
    }},
    { type: 'range-date', id: 'requestPeriod', label: '請求期間', options: {
        width: 'wide',
        disabled:true
    }},
    { type: 'text', id: 'orderPerson', label: '発注担当者', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("マミーマート請求明細表", function() {openDialog('MAMIMARTitemizedBillingListDialog')})
