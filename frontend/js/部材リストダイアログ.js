

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


// 入庫リスト作成
createAndAddDialog('ReceiptListDialog', '入庫リスト作成', [
    { type: 'datepicker', id: 'ReceiptDate', label: '入庫日', options: {
        width: 'normal'
    }},
	{ type: 'range-text', id: 'Customer', label: '得意先CD', options: {
        width: 'wide'
    }},
	{ type: 'range-text', id: 'Supplier', label: '仕入先CD', options: {
        width: 'wide'
    }},
]);
// ダイアログを開くボタンを追加
commonAddButton("ReceiptListDialogButton", function() {openDialog('ReceiptListDialog')}, "入庫リスト作成")


// 部材リスト出力
createAndAddDialog('PartsListDialog', '部材リスト出力', [
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
    { type: 'select', id: 'AggregationCategory', label: '集計区分', options: {
        options: [
            { value: '1', text: '集計区分1' },
            { value: '2', text: '集計区分2' }
        ],
        width: 'normal'
    }},
]);
// ダイアログを開くボタンを追加
commonAddButton("PartsListDialogButton", function() {openDialog('PartsListDialog')}, "部材リスト出力")


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


//施工依頼書出力
createAndAddDialog('ConstructionFirmwareDialog', '施工依頼書出力', [
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
    { type: 'datepicker', id: 'ConstructionDay', label: '施工日', options: {
        width: 'normal',
        required:true
    }},
]);

commonAddButton("ConstructionFirmwareDialogButton", function() {openDialog('ConstructionFirmwareDialog')}, "施工依頼書出力")
