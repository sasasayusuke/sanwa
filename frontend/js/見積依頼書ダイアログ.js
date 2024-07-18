

// 見積依頼書出力
createAndAddDialog('EstimateRequestDialog', '見積依頼書出力', [
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
    { type: 'datepicker', id: 'DesiredDeliveryDate', label: '希望納期', options: {
        width: 'normal'
    }},
    { type: 'datepicker', id: 'ReplyDate', label: '回答期限', options: {
        width: 'normal'
    }},
	{ type: 'range-text', id: 'Supplier', label: '仕入先', options: {
        width: 'wide'
    }},
]);
// ダイアログを開くボタンを追加
commonAddButton("EstimateRequestDialogButton", function() {openDialog('EstimateRequestDialog')}, "見積依頼書出力")
