

// しまむら直納伝票請求書発行
createAndAddDialog('SIMAMURADirectDepositSlipDialog', 'しまむら直納伝票請求書', [
    { type: 'datepicker', id: 'requestDate', label: '請求日付', options: {
        width: 'normal',
        required:true
    }},
    { type: 'text', id: 'deadLine', label: '締日', options: {
        width: 'normal',
        required:true
    }},
    { type: 'range-date', id: 'requestPeriod', label: '請求期間', options: {
        width: 'wide',
        disabled:true
    }},
    { type: 'text', id: 'custmerCode', label: '得意先', options: {
        width: 'normal',
    }},
    { type: 'text', id: 'custmerName1', label: '', options: {
        width: 'wide',
        disabled:true
    }},
    { type: 'text', id: 'custmerName2', label: '', options: {
        width: 'wide',
        disabled:true
    }},
    { type: 'text-set', id: 'voucherType', label: '伝票種類', options: {
        width: 'wide',
        disableValue:"2:直納 3:mail消耗品 4:mail直納"
    }},
    { type: 'text-set', id: 'contentDistinction', label: '内容区分', options: {
        width: 'wide',
        disableValue:"0:なし 1:ﾃﾞｨﾊﾞﾛ 2:台湾 3:システム開発"
    }},
    { type: 'text-set', id: 'postageOnly', label: '送料のみ', options: {
        width: 'wide',
        disableValue:"0:送料以外 1:送料のみ(Z012)"
    }},
    { type: 'text-set', id: 'sortOrder', label: '並び順', options: {
        width: 'wide',
        disableValue:"0:伝票番号 1:納品日付"
    }},
    { type: 'datepicker', id: 'publishingDate', label: '発行日付', options: {
        width: 'normal',
    }},
]);
// ダイアログを開くボタンを追加
commonModifyLink("しまむら直納伝票請求書", function() {openDialog('SIMAMURADirectDepositSlipDialog')})

