

//支払データ取込処理
createAndAddDialog('PaymentImportDialog', '支払データ取込処理', [
	{ type: 'radio', id: 'ProcessingCategory', label: '処理区分', options: {
        options: [
            { value: '1', text: 'チェックのみ' },
            { value: '2', text: '取込' }
        ],
        width: 'wide'
    }},
    { type: 'radio', id: 'ListFlag', label: 'リスト出力', options: {
        options: [
            { value: '1', text: 'する' },
            { value: '2', text: 'しない' }
        ],
        width: 'wide'
    }},
    { type: 'text', id: 'Import', label: '取込先', options: {
        disabled: true,
        width: 'wide'
    }},
    { type: 'text', id: 'Export', label: '出力先', options: {
        disabled: true,
        width: 'wide'
    }},
]);

commonModifyLink("支払データ取込処理", function() {openDialog('PaymentImportDialog')})
