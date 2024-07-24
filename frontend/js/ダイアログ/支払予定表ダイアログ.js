

//支払予定表出力
createAndAddDialog('PaymentScheduleDialog', '支払予定表作成', [
    { type: 'range-text', id: 'ScheduleDate', label: '予定日付', options: {
        width: 'wide'
    }},
    { type: 'range-text', id: 'Supplier', label: '仕入先CD', options: {
        width: 'wide'
    }},
]);

commonModifyLink("支払予定表", function() {openDialog('PaymentScheduleDialog')})
