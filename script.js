(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            //peale või enne lõunat
            let ampm = h >= 12 ? 'PM' : 'AM';
            //tunnid 2x väiksemaks
            h = h % 12;
            // kui tund on 0, näita 12
            h = h ? h : 12;

            let m = date.getMinutes();
            let s = date.getSeconds();

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + ampm;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let eesnimi = document.getElementById('fname');
        let perenimi = document.getElementById('lname');

        let tahed = /^[A-Za-zõäöüÕÄÖÜ-]+$/;
        if (eesnimi === '' || perenimi === '' || !(eesnimi.value.match(tahed) && perenimi.value.match(tahed)))
        {
            alert("Vigane nimi");
            return;
        }

        if (!document.getElementById('koju').checked && !document.getElementById('automaat').checked) {
            alert('Valige tarneviis');
            return;
        }
        
        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
        } else {

            let linnahind = 0;

            switch (linn.value) {
                case 'tln':
                    linnahind = 0;
                    break;
                case 'trt':
                    linnahind = 2.5;
                    break;
                case 'nrv':
                    linnahind = 2.5;
                    break;
                case 'prn':
                    linnahind = 3;
                    break;
            }

            let lisavalikuteSumma = 0;

            if (document.getElementById("v1").checked) lisavalikuteSumma += 5;
            if (document.getElementById("v2").checked) lisavalikuteSumma += 1;

            let hind = (linnahind + lisavalikuteSumma).toString()
            if (hind.length === 1) hind = hind + '.00'
            if (hind.length === 3) hind = hind + '0'

            e.innerHTML = hind + " €";
            
        }        
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AundUMonew4CSoQ29iLrZTq7VOBwqodyKAaIPsL7oiZSa_x0kbUSfyhS6-DpxdoU";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
        (58.38104 + 58.246524) / 2,
        (26.71992 + 26.686368) / 2
    );

    let ut = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );

    let location2 = new Microsoft.Maps.Location(
        58.246524,
        26.686368
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(ut, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    let pushpin2 = new Microsoft.Maps.Pushpin(location2, {
        title: 'Kambja kõrval',
    });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    let infobox = new Microsoft.Maps.Infobox(centerPoint, {
        visible: false
    });
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

