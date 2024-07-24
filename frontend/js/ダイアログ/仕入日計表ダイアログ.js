

//仕入日計表出力
createAndAddDialog('PurchaseDailyTotalDialog', '仕入日計表作成', [
	{ type: 'radio', id: 'DateSelect', label: '日付選択', options: {
        options: [
            { value: '1', text: '仕入日付' },
            { value: '2', text: '支払日付' }
        ],
        width: 'wide'
    }},
    { type: 'range-text', id: 'SupplyDate', label: '仕入日付', options: {
        width: 'wide'
    }},
    { type: 'range-text', id: 'PaymentDate', label: '支払日付', options: {
        width: 'wide'
    }},
    { type: 'range-text', id: 'Supplier', label: '仕入先CD', options: {
        width: 'wide'
    }},
]);

commonModifyLink("仕入日計表", function() {openDialog('PurchaseDailyTotalDialog')})
