
// 各画面ロード時に実行するメソッドを格納する
onGridLoadFuncs = []
onEditorLoadFuncs = []


// 格納したメソッドを実行するメソッド
$p.events.on_grid_load = function () {
    console.log("start!! onGridLoadFuncs!!!")
    onGridLoadFuncs.forEach(func => {
        console.log(func)
        func()
    })
}

$p.events.on_editor_load = function () {
    console.log("start!! onEditorLoadFuncs!!!")
    onEditorLoadFuncs.forEach(func => {
        console.log(func)
        func()
    })
}


// 共通gridロード処理
onGridLoadFuncs.push(function () {
    try {
        // サイトタイトル編集
        document.title = JSON.parse(document.getElementById("JoinedSites").value)[0].Title + " - 一覧"

    } catch (err) {
        console.log(err)
    }
})

// 共通editorロード処理
onEditorLoadFuncs.push(function () {
    try {
        // サイトタイトル編集
        document.title = JSON.parse(document.getElementById("JoinedSites").value)[0].Title + " - 編集"

    } catch (err) {
        console.log(err)
    }
})
