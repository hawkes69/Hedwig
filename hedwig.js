javascript:(function(){
    var QAQLength = 0;
    var PQLength = 0;
    var VQLength = 0;
    var mastervq = [];
    var masterpq;
    var masterqa;

    alert("Blimey an owl!");

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

        if (VQLength != vq.length && vq.length != 0) {
            VQLength = vq.length;
            var parsedvq = parse(vq);
            if (mastervq.length == 0) {
                mastervq = parsedvq;
                console.log("Initial Log");
            }
            else if(mastervq.length < parsedvq.length) {
                console.log(mastervq + "\n\n\n\n" + parsedvq);
                var array = compare(mastervq, parsedvq);
                if(array.length != 0) {
                    filter(array);
                    mastervq = parsedvq;
                }
            }
            else {
                console.log("other difference");
                console.log(mastervq + "\n\n\n\n" + parsedvq);
                mastervq = parsedvq;
            }
        }
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
        for (i = 0; i < array; ++i) {
            for (j = 0; j < filters; ++j) {
                if (filters[j].includes(array[i])) {
                    var notification = new Notification("Verification: " + array[i]);
                    flag = false;
                }
            }
        }
        if(flag) {
            console.log("Filtered out: " + array);
        }
    }
})();
