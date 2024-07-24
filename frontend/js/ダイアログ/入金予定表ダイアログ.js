// 入金予定表作成
createAndAddDialog('paymentScheduleListDialog', '入金予定表', [
    { type: 'range-date', id: 'scheduleDate', label: '予定日付', options: {
        width: 'wide',
    }},
    { type: 'range-text', id: 'custmerCode', label: '得意先CD', options: {
        width: 'wide',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("入金予定表", function() {openDialog('paymentScheduleListDialog')})
