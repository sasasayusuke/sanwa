
// 保存押下時に実行するメソッドを格納する
$p.events.before_send_Create_arr = []
$p.events.before_send_Update_arr = []

$p.events.before_send_Create = function (e) {
    console.log("start!! before_send_Create_arr!!!")
    // falseをreturnするまで繰り返す
    return $p.events.before_send_Create_arr.every(func => {
        console.log(func)
        return func(e)
    })
}

$p.events.before_send_Update = function (e) {
    console.log("start!! before_send_Update_arr!!!")
    // falseをreturnするまで繰り返す
    return $p.events.before_send_Update_arr.every(func => {
        console.log(func)
        return func(e)
    })
}