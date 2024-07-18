

// 発注書出力
createAndAddDialog('PurchaseOrderDialog', '発注書出力', [
    { type: 'text', id: 'EstimateNo', label: '見積番号', options: {
        required: true,
        width: 'normal'
    }},
    { type: 'text', id: 'EstimateTitle', label: '見積件名', options: {
        disabled: true,
        width: 'wide'
    }},
    { type: 'text', id: 'Client', label: '受注先', options: {
        disabled: true,
        width: 'wide'
    }},
    { type: 'text', id: 'DeliveryDate', label: '納期', options: {
        disabled: true,
        width: 'wide'
    }},
    { type: 'text', id: 'SpotName', label: '現場名', options: {
        disabled: true,
        width: 'wide'
    }},
	{ type: 'select', id: 'AmountDisplayCategory', label: '金額表示', options: {
        options: [
            { value: '1', text: '金額表示1' },
            { value: '2', text: '金額表示2' }
        ],
        width: 'normal'
    }},
    { type: 'select', id: 'FormatCategory', label: '書式区分', options: {
        options: [
            { value: '1', text: '書式区分1' },
            { value: '2', text: '書式区分2' }
        ],
        width: 'normal'
    }},

	{ type: 'range-text', id: 'Supplier', label: '仕入先', options: {
        width: 'wide'
    }},
]);
// ダイアログを開くボタンを追加
commonAddButton("PurchaseOrderDialogButton", function() {openDialog('PurchaseOrderDialog')}, "発注書出力")
