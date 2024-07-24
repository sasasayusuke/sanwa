

// ウエルシア請求明細
createAndAddDialog('WELCIArequestParticularsListDialog', 'ウエルシア請求明細', [
    { type: 'range-date', id: 'requestDate', label: '請求日付', options: {
        width: 'wide',
        required:true
    }},
    { type: 'text-set', id: 'formatCategory', label: '書式区分', options: {
        width: 'wide',
        disableValue:"0:通常 1:経理用"
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("ウエルシア請求明細", function() {openDialog('WELCIArequestParticularsListDialog')})

