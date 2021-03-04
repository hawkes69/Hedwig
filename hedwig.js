javascript:(function(){
    var mastervq = [];
    var masterpq = [];
    var masterqa = [];
    var currentq;

    console.log("2.0");

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
        var startPoint = 23;
        var pageDiv = document.getElementById('mirage');
        var div1 = pageDiv.getElementsByTagName('div')[startPoint];
        var vq = div1.getElementsByTagName("div");
        var div2 = pageDiv.getElementsByTagName("div")[startPoint + vq.length + 1];
        var pq = div2.getElementsByTagName("div");
        var div3 = pageDiv.getElementsByTagName("div")[startPoint + vq.length + 1 + pq.length + 1];
        var qaq = div3.getElementsByTagName("div");

        currentq = "Verification: ";
        mastervq = changeCheck(mastervq, vq);
        currentq = "Production: ";
        masterpq = changeCheck(masterpq, pq);
        currentq = "QA: ";
        masterqa = changeCheck(masterqa, qaq);
    }

    function parse(queue) {
        var i = 0;
        var q = [];
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
        var a = [], diff = [];
    
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
    
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
    
        for (var k in a) {
            diff.push(k);
        }
        return diff;
    }

    function filter(array){
        var i = 0;
        var j = 0;
        var flag = true;
        var filters = ["Hive", "Havoc," , "Mayhem", "Durden", "Grunt", "Persona", "Amigo" , "Norton" , "Relay" , "Dispatch"];
        for (i = 0; i < array.length; ++i) {
            for (j = 0; j < filters.length; ++j) {
                if (array[i].includes(filters[j])) {
                    console.log("Should notify");
                    var notification = new Notification(currentq + array[i]);
                    flag = false;
                }
            }
        }
        if(flag) {
            console.log("Filtered out: " + currentq + array);
        }
    }

    function  changeCheck(masterArr, arr){
        var parsed = parse(arr);
        if (masterArr.length != parsed.length) {
            if (masterArr.length == 0) {
                console.log(currentq + "Initial Log");
            }
            else if(masterArr.length < parsed.length) {
                console.log(masterArr.length + " vs " + parsed.length);
                var array = compare(masterArr, parsed);
                if(array.length != 0) {
                    filter(array);
                }
                console.log(masterArr.length + " vs " + parsed.length);

            }
            else {
                console.log(currentq + "other difference");
                console.log(masterArr.length + " vs " + parsed.length);
            }
        }
        return parsed;
    } 
})();
