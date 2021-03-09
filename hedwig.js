javascript:(function(){
    let mastervq = [];
    let masterpq = [];
    let masterqa = [];
    let filters = ["Hive", "Havoc," , "Mayhem", "Durden", "Grunt", "Persona", "Amigo" , "Norton" , "Relay" , "Dispatch"];
    let currentq;

    console.log("3.0");

    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    
    else if (Notification.permission === "granted") {
        setInterval(notify, 1000);
    }
    
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                setInterval(notify, 1000);
            }
        });
    }

    function notify() {
        let startPoint = 23;
        let pageDiv = document.getElementById('mirage');
        let div1 = pageDiv.getElementsByTagName('div')[startPoint];
        let vq = div1.getElementsByTagName("div");
        let div2 = pageDiv.getElementsByTagName("div")[startPoint + vq.length + 1];
        let pq = div2.getElementsByTagName("div");
        let div3 = pageDiv.getElementsByTagName("div")[startPoint + vq.length + 1 + pq.length + 1];
        let qaq = div3.getElementsByTagName("div");

        hideFilters(vq);
        hideFilters(pq);
        hideFilters(qaq);

        currentq = "Verification: ";
        mastervq = changeCheck(mastervq, vq);
        currentq = "Production: ";
        masterpq = changeCheck(masterpq, pq);
        currentq = "QA: ";
        masterqa = changeCheck(masterqa, qaq);
    }

    function parse(queue) {
        let i = 0;
        let q = [];
        for(i = 0; i < queue.length; ++i) {
            var str;
            if(!queue[i].innerText.includes("[") || !queue[i].innerText.includes(":")) {
                if(queue[i].innerText.includes("[")) {
                    str = queue[i].innerText;
                }
                else if(queue[i].innerText.includes(":")) {
                    str = str.concat(queue[i].innerText);
                    q.push(str);
                }
            }
        }
        return q;
    }

    function compare(a1, a2) {
        let a = [], diff = [];
    
        for (let i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
    
        for (let i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
    
        for (let k in a) {
            diff.push(k);
        }
        return diff;
    }

    function filter(array){
        let i = 0;
        let j = 0;
        let flag = true;
        for (i = 0; i < array.length; ++i) {
            for (j = 0; j < filters.length; ++j) {
                if (array[i].includes(filters[j])) {
                    console.log("Should notify");
                    let notification = new Notification(currentq + array[i]);
                    flag = false;
                }
            }
        }
        if(flag) {
            console.log("Filtered out: " + currentq + array);
        }
    }

    function  changeCheck(masterArr, arr){
        let parsed = parse(arr);
        if (masterArr.length != parsed.length) {
            if (masterArr.length == 0) {
                console.log(currentq + "Initial Log");
            }
            else if(masterArr.length < parsed.length) {
                let array = compare(masterArr, parsed);
                if(array.length != 0) {
                    filter(array);
                }

            }
            else {
                console.log(currentq + "release moved out of queue.");
            }
        }
        return parsed;
    } 

    function hideFilters(page){
        let i;
        let j;
        for (i = 0; i < page.length; ++i) {
            let unflagged = true;
            for (j = 0; j < filters.length; ++j) {
                if (page[i].innerText.includes(filters[j])) {
                    let skipNum = page[i].getElementsByTagName('div');
                    unflagged = false;
                    i += skipNum.length;
                }
            }
            if (unflagged) {
                page[i].style.display = "none";
            }
        }
    }
})();
