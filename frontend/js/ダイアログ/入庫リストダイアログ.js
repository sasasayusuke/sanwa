

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

