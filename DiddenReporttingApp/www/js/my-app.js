/*jslint devel: true */
/*global navigator, document, Framework7, Dom7 */
"use strict";

var myApp = new Framework7();
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true
});



$$.getJSON('winkels.json', function (data) {
    console.log(data);
});


 

var startLong;
var startLat;
function onSuccess(position) {
    startLong = position.coords.longitude;
    startLat = position.coords.latitude;
    console.log(startLong);
    console.log(startLat);
}
    
function onError(error) {
    console.log("Kon coordinaten niet ophalen");
    alert("Kon coordinaten niet ophalen, controleer of locatie aanstaat.");
}

function GetCurrentLocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$$("#aanmelden").click(function () {
    var userPassword = $$("#password").val();
    var userEmail = $$("#username").val();
    var check = 0;
    var url = "http://dark-weather2008.000webhostapp.com/testing.php";
    $$.getJSON(url, function (result) {
        console.log(result);
        $$.each(result, function (i, field) {
            var Email = field.Email;
            var Password = field.Password;
            if (Email === userEmail & Password === userPassword) {
                check = 1;
                var userID = field.ID;
                localStorage.setItem('ID', userID);
     
    
            }
        });
        if (check == 1) {
            alert("Login succesvol!");
            myApp.closeModal();
   
        } else {
     alert("Fout in e-mail of wachtwoord" + "\n" + "Probeer het opnieuw.");
        }
    });
});

myApp.onPageInit('index', function (page) {

});



myApp.onPageInit('aanmaakForm', function (page) {
    
    "use strict";
    $$("#aanmaken2").click(function () {
        var FirstName = $$("#voornaam").val();
        var LastName = $$("#naam").val();
        var Password = $$("#wachtwoord").val();
        var Email = $$("#email").val();
        var Phone = $$("#gsm").val();
        var Gender = $$("#gender").val();
        var Birthdate = $$("#geboorte").val();
        var confirm = $$("#wachtwoord2").val();
        var Address = $$("#adres").val();
        var dataString = "FirstName=" + FirstName + "&LastName=" + LastName + "&Password=" + Password + "&Email=" + Email + "&Phone=" + Phone + "&Gender=" + Gender + "&Birthdate=" + Birthdate + "&Address=" + Address + "&insert=";
 if(FirstName != "" & LastName != "" & Password != "" & Email != "" & Phone != "" & Gender != "" & Birthdate != "" & Address != "" ) {
            $$.ajax({
                type: "POST",
                url: "http://dark-weather2008.000webhostapp.com/insertuser.php",
                data: dataString,
                crossDomain: true,
                cache: false,
                beforeSend: function () { $$("#aanmaken2").innerHTML = "Aanmaken..."; },
                success: function (data) {
                    if (data == "success") {
                        alert("Account succesvol aangemaakt!");
                        document.getElementById("aanmaken2").innerHTML = "Account is aangemaakt !";
     
                    } else if (data=="error") {
                        alert("error");
                    }
                }
            });
        } return false;
 });   
});

 myApp.onPageInit('NieuweRouting', function (page) {
         
    var autocompleteStandaloneAjax = myApp.autocomplete({
        openIn: 'popup',
        opener: $$('#autocomplete'),
        multiple: true,
        valueProperty: 'adres',
        textProperty: 'winkelpunt',
        limit: 50,
        preloader: true,
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
        
            autocomplete.showPreloader();
        
            $$.ajax({
                url: 'winkels.json',
                method: 'GET',
                dataType: 'json',
            
                data: {
                    query: query
                },
                success: function (data) {
                    var i;
                    for (i = 0; i < data.length; i++) {
                        if (data[i].winkelpunt.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(data[i]);
                    }
                
                    autocomplete.hidePreloader();
                    render(results);
                }
            });
        },
        onChange: function (autocomplete, value) {
            var itemText = [],
                inputValue = [],
                i;
            for (i = 0; i < value.length; i++) {
                itemText.push(value[i].winkelpunt);
                inputValue.push(value[i].adres);
            }
        
            var text = "<ul>";
            for (i = 0; i < itemText.length; i++) {
                text += "<li>" + itemText[i] + "</li>";
            }
            text += "</ul>";
            document.getElementById("winkelLijst").innerHTML = text;
            $$('#autocomplete').find('input').val(inputValue.join(', '));
            
            localStorage.setItem('itemText', JSON.stringify(itemText));
            localStorage.setItem('inputValue', JSON.stringify(inputValue));      
        }
    });
});

myApp.onPageInit('AangemaakteRouting', function (page) {

    var lsWinkel = localStorage.getItem('itemText');
    var winkels = JSON.parse(lsWinkel);
    var lsAdres = localStorage.getItem('inputValue');
    var adres = JSON.parse(lsAdres);
    console.log(winkels); 
    var text = "",
        i;
    for (i = 0; i < winkels.length; i++) {
        text += '<li> <a href="rapport.html" class="item-content"> <div class="item-inner"> <div class="item-title-row"> <div class="item-title">' + winkels[i] + ' <br> <div class="item-after"></div></div> </div> <div class="item-subtitle">' + adres[i] + '</div> </div> <span class="material-icons color-pink">keyboard_arrow_right</span> </a> </li>';
    }       
    document.getElementById("winkelsrouting").innerHTML = text;    
});

myApp.onPageInit('kaart', function (page) {
       
    var lsAdres = localStorage.getItem('inputValue');
    var adres = JSON.parse(lsAdres);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var uluru = {lat: 50.8503, lng: 4.3517};
    var map = new google.maps.Map(document.getElementById("kaart1"), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 9,
        center: uluru
    });
    directionsDisplay.setMap(map);

    document.getElementById('submit').addEventListener('click', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
    
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        var waypts = [],
            i;
        for (i = 0; i < adres.length; i++) {
            waypts.push({
                location: adres[i],
                stopover: true
            });
        }
        directionsService.route({
            origin: {lat: startLat, lng: startLong},
            destination: document.getElementById('end').value,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
      // For each route, display summary information.
                var i;
                for (i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    summaryPanel.innerHTML += '<b>Route : ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }
            } else {
                window.alert('Routebeschrijving gefaald : ' + status);
            }
        });
    }
});


myApp.onPageInit('rapport', function (page) {
    
    $$("#doorsturen").click(function(){
        var Check_in=$$("#aankomstuur").val();
        var Check_out=$$("#vertrekuur").val();
        var Remarks=$$("#textarea").val();
        var shop_responsible=$$("#verantwoordelijke").val();
        var KM_departure=$$("#kmvertrek").val();
        var KM_arrival=$$("#kmaankomst").val();
        var User_ID = localStorage.getItem('ID');
        var dataString="Check_in="+Check_in+"&Check_out="+Check_out+"&Remarks="+Remarks+"&shop_responsible="+shop_responsible+"&KM_departure="+KM_departure+"&KM_arrival="+KM_arrival+"&User_ID="+User_ID+"&insert=";
      
    $$.ajax({
        type: "POST",
        url:"http://dark-weather2008.000webhostapp.com/insertdates.php",
        data: dataString,
        crossDomain: true,
        cache: false,
        beforeSend: function(){ $$("#doorsturen").val('Connecting...');},
        success: function(data){
            if(data=="success")
            {
                alert("Informatie succesvol doorgestuurd!");
                $$("#doorsturen").val('Info doorgestuurd!');
            }
            else if(data=="error")
            {
                alert("Fout met het doorsturen");
            }
        }
    });
        
    });   
});








