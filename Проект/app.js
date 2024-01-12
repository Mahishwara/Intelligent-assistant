if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Поймали"))
        .catch(() => console.log("Ошибка,WARNING"))
}