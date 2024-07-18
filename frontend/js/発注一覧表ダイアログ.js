
// 発注一覧表作成
createAndAddDialog('PurchaseListDialog', '発注一覧表作成', [
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
	{ type: 'range-text', id: 'Supplier', label: '仕入先', options: {
        width: 'wide'
    }},
]);
// ダイアログを開くボタンを追加
commonAddButton("PurchaseListDialogButton", function() {openDialog('PurchaseListDialog')}, "発注一覧表作成")

