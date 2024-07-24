

//支払日計表出力
createAndAddDialog('PaymentDailyTotalDialog', '支払日計表作成', [
    { type: 'range-text', id: 'SupplyDate', label: '支払日付', options: {
        width: 'wide'
    }},
    { type: 'range-text', id: 'Supplier', label: '仕入先CD', options: {
        width: 'wide'
    }},
]);

commonModifyLink("支払日計表", function() {openDialog('PaymentDailyTotalDialog')})
