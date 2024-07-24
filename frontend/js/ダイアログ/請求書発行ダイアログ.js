// 請求書出力
createAndAddDialog('billDialog', '請求書出力', [
    { type: 'text', id: 'estimateNo', label: '見積番号', options: {
        width: 'normal',
        required:true,
    }},
    { type: 'text', id: 'estimateName', label: '見積件名', options: {
        width: 'wide',
        disabled:true,
    }},
    { type: 'text', id: 'recipientOfAnOrder', label: '受注先', options: {
        width: 'wide',
        disabled:true,
    }},
    { type: 'text', id: 'deliveryDay', label: '納期', options: {
        width: 'normal',
        disabled:true,
    }},
    { type: 'text', id: 'siteName', label: '現場名', options: {
        width: 'normal',
        disabled:true,
    }},
    { type: 'text-set', id: 'displayManager', label: '表示担当', options: {
        width: 'normal',
    }},
    { type: 'datepicker', id: 'requestDate', label: '請求日付', options: {
        width: 'normal',
    }},
    { type: 'datepicker', id: 'publishingDate', label: '発行日付', options: {
        width: 'normal',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("請求書出力", function() {openDialog('billDialog')})
