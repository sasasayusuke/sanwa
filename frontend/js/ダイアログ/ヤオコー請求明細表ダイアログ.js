//ヤオコー請求明細表
createAndAddDialog('YAOKOitemizedBillingListDialog', 'ヤオコー請求明細表', [
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
    { type: 'text-set', id: 'supplySegment', label: 'サプライ区分', options: {
        width: 'wide',
        disableValue:"1:サプライ 2:システム"
    }},
    { type: 'text-set', id: 'propertySegment', label: '物件区分', options: {
        width: 'wide',
        disableValue:"1:物件 2:メンテ・製品 3:担当者案件"
    }},
    { type: 'datepicker', id: 'issueDate', label: '発行日付', options: {
        width: 'normal',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("ヤオコー請求明細表", function() {openDialog('YAOKOitemizedBillingListDialog')})
