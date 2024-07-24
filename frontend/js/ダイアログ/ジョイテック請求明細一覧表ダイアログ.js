

// ジョイテック請求明細一覧表
createAndAddDialog('JOYTECrequestParticularsListDialog', 'ジョイテック請求明細一覧表', [
    { type: 'range-date', id: 'requestDate', label: '請求日付', options: {
        width: 'wide',
        required:true
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("ジョイテック請求明細一覧表", function() {openDialog('JOYTECrequestParticularsListDialog')})

