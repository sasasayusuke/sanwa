

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
