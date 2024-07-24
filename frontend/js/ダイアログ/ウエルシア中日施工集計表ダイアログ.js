// ウエルシア中日施工集計表
createAndAddDialog('WELCIAConstructionTallySheetDialog', 'ウエルシア中日施工集計表', [
    { type: 'range-date', id: 'billingDate', label: '請求日付', options: {
        width: 'wide',
        required:true,
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("ウエルシア中日施工集計表", function() {openDialog('WELCIAConstructionTallySheetDialog')})
