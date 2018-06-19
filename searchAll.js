$(function(){
  const accept    = new Audio();
  const buzzer    = new Audio();
  const choco     = new Audio();
  const flexAudio = new Audio();
  const select    = new Audio();

  accept.src        = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WaE5GaXdScHNkRlk";
  buzzer.src        = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WQ2lOYVBPTmVLbWM";
  choco.src         = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WMEhrcGNSalAwMjQ";
  select.src        = "https://drive.google.com/uc?export=download&id=1Kfvs_qNQl44UOHH_we_OK6-QetRTfcHB"
  flexAudio.src     = "https://drive.google.com/uc?export=download&id=0B93xTaskz1_WZkpyekVGRGxuZm8";

  let today = new Date();
  let todayFormat = (today.getMonth()+1).toString() + "." + (today.getDay().toString()) + "." + (today.getFullYear().toString());
  let wtArray = [];
  let noCompArray = [];
  let noRouteArray = [];
  let fcArray = [];
  let othersArray = [];
  let allTbasArray = [];

  let linkString = "<a href id='csvLink' download=" + todayFormat + ".csv" + " type='text/csv' class='button'>FLEX CSV</a>"
  let backString = "<a href id='backLink' download=" + todayFormat + ".csv" + " type='text/csv' class='button'> SORT CSV</a>"

   //append buttons to page
   $("#bodyContainer").before(
     "<div style='float:right; padding: -20px 30px 0 0; border-style: solid; border-color: #DDDDDD;'>" +
     optionButton("searchAllButton", " SEARCH ALL ", '#FFFFFF', "#698EDA", "3px") +
     createButton("betweenStation", "Between Station") +
     createButton("atStationButton", "At Station") +
     createButton("delayedAtStationButton", "Delayed at Station / Hold for Redelivery") +
     createButton("atWrongStationButton", "Wrong Station") +
     createButton("deliveryAttemptedButton", "Delivery Attempted") +
     createButton("readyForFCButton", "Ready For FC") +
     createButton("outForDeliveryButton", "Out For Delivery") +
     createButton("readyForDepartureButton", "Ready For Departure") +
     createButton("sameDayButton", "Same Day") +
     createButton("nonSameDayButton", "Non-Same Day") +
     createButton("noRouteButton", "No Route") +
     createButton("findRouteButton", "Find Route") +
     createButton("excludeRouteButton", "Exclude Route") +
     createButton("findStatus", "Find Status") +
     "</div>"
    );

    $('#ShipmentSearchTable').prepend(
      optionButton('excelButton', 'DL EXCEL', '#FFFFFF', '#6e2c67', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('problemSolveButton', 'PROBLEM SOLVE', '#FFFFFF', '#BDBDBD', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('mapAllButton', 'MAP ALL', '#FFFFFF', '#BDBDBD', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('mapButton', 'MAP', '#FFFFFF', '#3CB371', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('clearButton', ' CLEAR ', '#FFFFFF', '#cc1818', '5px')
    );
    $('#ShipmentSearchTable').prepend(
      optionButton('newWindowButton', 'GET TBA(S)', '#FFFFFF', '#698EDA', '5px')
    );

    //find functions
    $("#atWrongStationButton").click(function(){
      findAll("At Wrong Station");
    });
    $("#atStationButton").click(function(){
      findAll("At Station");
    });
    $("#delayedAtStationButton").click(function(){
      findAll("Delayed at Station");
      findAll("Hold for Redelivery");
    })
    $("#deliveryAttemptedButton").click(function(){
      findAll("Delivery Attempted");
    });
    $("#outForDeliveryButton").click(function(){
      findAll("Out for Delivery");
    });
    $("#readyForFCButton").click(function(){
      findAll("Ready For FC Return");
    });
    $("#readyForDepartureButton").click(function(){
      findAll("Ready for Departure");
    });
    $("#newWindowButton").click(function(){
      openNewWindow();
    });
    $("#sameDayButton").click(function(){
      findSameDay();
    });
    $("#nonSameDayButton").click(function(){
      findNonSameDay();
    });
    $('#clearButton').click(function(){
      $('input:checkbox').removeAttr('checked');
      recordArray = [];
      arrayNotEmpty();
    });
    $('#noRouteButton').click(function(){
      getAllNoRoute();
    });
    $("#findRouteButton").click(function(){
      findRoute();
    })
    $('#excludeRouteButton').click(function(){
      getExcludeRoute();
    });
    $('#betweenStation').click(function(){
      getBetweenStation();
    });
    $('#findStatus').click(function(){
      getStatus();
    });
    $('#mapButton').click(function(){
      getMap()
    });
    $('#mapAllButton').click(function(){
      getMapAll();
    })
    $('#problemSolveButton').click(function(){
      if($(this).css('background-color')=='rgb(189, 189, 189)'){
        $(this).css('background-color', '#336699');
        problemSolve();
      } else {
         $(this).css('background-color', '#BDBDBD');
       }
    });
    $('#excelButton').click(function(e){
      const headers = ["Wrong Station", "FC Return", 'Incorrect/No Route', "No Comp", "Others", "All Tbas"];
      const arrays = [wtArray, fcArray, noRouteArray, noCompArray, othersArray, allTbasArray];
      const name = "SameDaySort"
      let newExcel = createExcel(headers);
      insertDataToExcel("SameDay Sort", newExcel, arrays);
    });

  //create excel template
  function createExcel(headers){
    const excel = $JExcel.new();
    const formatHeader = excel.addStyle({border: "none,none,none,thin #551A8B",font: "Calibri 12 #FFFFFF B", fill: "#000000"});
    for(let i=0; i < headers.length; i++){
      excel.set(0, i, 0, headers[i], formatHeader);
      excel.set(0, i, undefined, "auto");
      }
      return excel;
  }

  //insert data into excel file, must create template first
  function insertDataToExcel(name, excel, arrays){
    let e = excel;
    for(let i = 1; i < arrays.length + 1; i++){
      for(let j = 1; j < arrays[i - 1].length; j++){
        console.log(j)
        e.set(0, i-1, j, arrays[i - 1][j-1]);
      }
    }

    e.generate(name + " " + todayFormat + ".xlsx");
  }

  function problemSolve(){
    const skipRoute = prompt("Skip Route?", "V");

    $('#shipmentSearchId').keydown(function(e){
      if(e.keyCode == 13){
        $('#shipmentSearchId').select();
        $('#searchSubmit').click(function(){
          //leave empty
        });
        const searchInput = $(this);

        setTimeout(function(){
          $("#shipmentSearchId").select();

          const odd = $('.odd');
          const TBA = searchInput.val().trim();

          //check if tba exist and push to appropriate array
          if(odd.length > 0){

            const status = odd[0].children[18].innerText || "none";
            const reason = odd[0].children[17].innerText || "none";
            const station = odd[0].children[15].innerText || "none";
            const route = odd[0].children[16].innerText || "none";
            const sortZone = odd[0].children[26].innerText.slice(0, 1);
            const stripRoute = route.replace(/[0-9]/g, '');

            //push tba to fcArray, wtArray, noCompArray, noRouteArray, or othersArray
            //setTimeout for audio to allow time to load
            if(TBA.length === 15){
              if(status === 'Rejected' || status === 'Departed For FC' || status === 'Ready For FC' || status === 'Ready For FC Return'){
                console.log("FC")
                fcArray.push(TBA);
                allTbasArray.push(TBA);
                choco.play();
              } else if(status === 'At Wrong Station' || status === 'Ready for Transfer' || station != 'DSF3'){
                console.log("Milk Run")
                wtArray.push(TBA);
                allTbasArray.push(TBA);
                buzzer.play();
              }else if(stripRoute != skipRoute || route === '\xa0'){
                console.log("No Route/Wrong Route")
                noRouteArray.push(TBA);
                allTbasArray.push(TBA);
                accept.play();
              } else if(stripRoute === skipRoute){
                console.log("Correct Route");
                select.play();
              } else{
                console.log("others")
                othersArray.push(TBA);
                allTbasArray.push(TBA);
                buzzer.play();
              }
            };

          } else {
            console.log("No Comp");
            noCompArray.push(TBA);
            allTbasArray.push(TBA);
            buzzer.play();
          };
        }, 2000);
      };
    })
  };

  //create button function
  function createButton(id, value, clas){
    var id = id;
    var value = value;
    var string;
    var clas;
    var margin = "'margin-right: 5px;'"
    string = "<input id='" + id + "' type='button' value='" + value +
    "' style=" + margin +" ></button>";
    return string;
  };

    //method to checked all objeects with corresponding status
    function findAll(status){
      var status;
      var even = $('.even');
      var odd = $('.odd');

      for(var i = 0; i < even.length; i++){
        if( (even[i].children[18].innerText) == status ){
          $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
      for(var i = 0; i < odd.length; i++){
        if( (odd[i].children[18].innerText) == status ){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }
    };

    //method to checked all sameDay
    function findSameDay(){
      var even = $('.even');
      var odd = $('.odd');

      for(var i = 0; i < even.length; i++){
        if(even[i].children[5].innerText === "Same"){
            $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
      for(var i = 0; i < odd.length; i++){
        if( (odd[i].children[5].innerText) == "Same" ){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }
    }

    function findNonSameDay(){
      var even = $('.even');
      var odd = $('.odd');

      for(var i = 0; i < even.length; i++){
        if(even[i].children[5].innerText != "Same"){
            $(even[i].children[0].children[0]).attr('checked', true);
        }
      }
      for(var i = 0; i < odd.length; i++){
        if( (odd[i].children[5].innerText) != "Same" ){
          $(odd[i].children[0].children[0]).attr('checked', true);
        }
      }
    }

    //collects checked TBA and returns it to a prompt and launch new window
    function openNewWindow(){
      array = [];
      var even = $('.even');
      var odd = $('.odd');
      var input;
      url = 'https://www.amazonlogistics.com/comp/packageSearch';
      string = '';


      for(var i =0; i < even.length; i++){
        if($(even[i].children[0].children[0]).is(':checked')){
          array.push(even[i].children[2].children[0].innerText);
        }
      }

      for(var i =0; i < odd.length; i++){
        if($(odd[i].children[0].children[0]).is(':checked')){
          array.push(odd[i].children[2].children[0].innerText);
        }
      }
      string = array.toString().replace(/,/g, "\n ");
      input = prompt("Ctrl + C to copy TBA(s)", string)
      if(input === null){
        return;
      }else {
        window.open(url, "Hello", "width=1200");
        return false;
      }
    }

   $(':checkbox').change(function() {
      $("#clearButton").click(function(){
        $('input:checkbox').removeAttr('checked');
      });
    });

  //create button with additonal options
  function optionButton(id, value, color, bgColor, padding){
    var id = id;
    var value = value;
    var color = color;
    var bgColor = bgColor;
    var padding = padding;
    var string;

    string = "<input id='" + id + "' type='button' value='" + value +
      "' style='" +"color: " + color + "; " + "background-color:" + bgColor +
      "; " + "padding: " + padding + "; border-style: none;'></button>";

      return string;
  };

  function bubbleSort(arr){
   var len = arr.length;
   var num1 = 0;
   var num2 = 0;
   for (var i = len-1; i>=0; i--){
     for(var j = 1; j<=i; j++){
       num1 = parseInt((arr[j-1]).route.replace(/\D/g, ""));
       num2 = parseInt((arr[j]).route.replace(/\D/g, ""));
       if( num1 > num2 ){
           var temp = arr[j-1];
           arr[j-1] = arr[j];
           arr[j] = temp;
        }
     }
   }
   return arr;
}

  function focus(){
      counterForFocus ++;
      truthValue = toggleOnOff(counterForFocus, switchForFocus);
      if(truthValue){
        var route = prompt("Please enter the route:", "Enter route here" );
        returnRoute(route);
        $('#focusButton').attr('value', 'FOCUS ONE ON');
        $('#focusButton').css('background-color', '#4C177D');
        $("#shipmentSearchId").keydown(keydownHandler);
        $("#shipmentSearchIds").keydown(keydownHandler);
      } else {
        $('#focusButton').attr('value', 'FOCUS ONE OFF');
        $('#focusButton').css('background-color', '#BDBDBD');
        $("#shipmentSearchId").unbind('keydown', keydownHandler);
        $("#shipmentSearchIds").keydown(keydownHandler);
      }
  }

  var focusRoute = ""
  function returnRoute(route){
    focusRoute = route;
  }

  function toggleOnOff(counter, switcher){
    if(counter%2 == 0){
      switcher = true;
    }
    else if(counter%2 !== 0){
      switcher = false;
    }
    return switcher;
  }

  function keydownHandler(e){

    if(e.keyCode == 13){
      $("#shipmentSearchId").select();
      $("#searchSubmit").click(function(){
      });
      setTimeout(function(){
        $("#shipmentSearchId").select();
        //recordTBA();
      }, 1000);
    }

  };

 function keydownhandler2(e){
   if(e.keyCode == 13){
     $("#searchSubmit").click();
     setTimeout(function(){
       $("#shipmentSearchIds").focus();
     }, 1000);
   }
 };

  function scanAll(){
    counterForScanAll++;

    truthValue = toggleOnOff(counterForScanAll, switchForFocus);
    if(truthValue){
      $('#focusAllButton').attr('value', 'FOCUS ALL ON');
      $('#focusAllButton').css('background-color', '#4C177D');
      $("#shipmentSearchIds").keydown(keydownhandler2);
    } else {
      $('#focusAllButton').attr('value', 'FOCUS ALL OFF');
      $('#focusAllButton').css('background-color', '#BDBDBD');
      $("#shipmentSearchIds").keydown(keydownhandler2);
    }
  }

  function arrayNotEmpty(){
    if(recordArray.length > 0){
      $('#getRecordButton').css('background-color', '#CF3523');
    } else {
      $('#getRecordButton').css('background-color', '#BDBDBD');
    }
  }

  function recordTBA(){
    checkStatus(focusRoute);
    let input = $("#shipmentSearchId").keypress();

    if(input[0].value.length == 15){
      recordArray.push(input[0].value);
    }
      arrayNotEmpty();
  }

  function getRecord(){
    url = 'https://www.amazonlogistics.com/comp/packageSearch';
    string = recordArray.toString().replace(/,/g, "\n ");
    input = prompt("Ctrl + C to copy TBA(s) | Press CLEAR to reset TBAs", string)
    if(input === null){
      return;
    }else {
      window.open(url, "width=1200");
      return false;
    }
  };

  function checkStatus(routeToSearch){
    let routeSearch = routeToSearch;
    let odd = $('.odd');
    let status = odd[0].children[18].innerText;
    let route = odd[0].children[16].innerText.replace(/[0-9]/g, '').toLowerCase();
    if( status === "Between FC and Stations" || status === "At Station" || status === "Delayed at Station" || status === "Between Stations"){
      if (route === routeSearch.toLowerCase()) {
        setTimeout(function(){
          accept.play();
        }, 1000);
      }
    } else {
      setTimeout(function(){
        buzzer.play();
      }, 1000);
    }
  }

  function getAllNoRoute(){
    let odd = $('.odd');
    let even = $('.even');

    for(let i = 0; i < odd.length; i++){
      if(odd[i].children[16].innerText === '\xa0'){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }

    for(let i = 0; i < even.length; i++){
      if(even[i].children[16].innerText === '\xa0'){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
  }

  function findRoute(){
    let odd = $('.odd');
    let even = $('.even');
    let route = "";
    let searchRoute = prompt("Enter Route to exclude:", "Enter Route here");
    let reg = new RegExp("[" + searchRoute + "]\\d+");

    for(let i = 0; i < odd.length; i++){
      route = odd[i].children[16].innerText;
      if(reg.test(route)){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }

    for(let i = 0; i < even.length; i++){
      route = even[i].children[16].innerText;
      if(reg.test(route)){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
  }

  function getExcludeRoute(){
    let odd = $('.odd');
    let even = $('.even');
    let route = "";
    let searchRoute = prompt("Enter Route to exclude:", "Enter Route here");
    let reg = new RegExp("[" + searchRoute + "]\\d+");

    for(let i = 0; i < odd.length; i++){
      route = odd[i].children[16].innerText;
      if(!reg.test(route) && odd[i].children[16].innerText != '\xa0'){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }

    for(let i = 0; i < even.length; i++){
      route = even[i].children[16].innerText;
      if(!reg.test(route) && even[i].children[16].innerText != '\xa0'){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
  }


  function getBetweenStation(){
    let even = $('.even');
    let odd = $('.odd');
    let status = "";
    //let status = odd[0].children[18].innerText;

    for(var i= 0; i < even.length; i++){
      status = even[i].children[18].innerText;
      if( status === "Between FC and Stations" || status === "Between Stations"){
          $(even[i].children[0].children[0]).attr('checked', true);
      }
    }

    for(var i = 0; i < odd.length; i++){
      status = odd[i].children[18].innerText;
      if( status === "Between FC and Stations" || status === "Between Stations"){
          $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }

  };

  function getStatus(){
    let odd = $('.odd');
    let even = $('.even');
    let route = "";
    let searchStatus = prompt("Enter Status to Search:", "Enter Status here");
    let reg = new RegExp(searchStatus);

    for(let i = 0; i < odd.length; i++){
      status = odd[i].children[18].innerText.toLowerCase();
      if(reg.test(status)){
        $(odd[i].children[0].children[0]).attr('checked', true);
      }
    }

    for(let i = 0; i < even.length; i++){
      status = even[i].children[18].innerText.toLowerCase();
      if(reg.test(status)){
        $(even[i].children[0].children[0]).attr('checked', true);
      }
    }
  };

  function getMap(){
    let odd = $('.odd');
    let even = $('.even');

    for(let i = 0; i < odd.length; i++){
      let address = odd[i].children[12].innerText;
      let city = odd[i].children[10].innerText;
      let state = odd[i].children[9].innerText;
      let zipCode = odd[i].children[13].innerText;
      let link = "https://www.google.com/maps/place/" + address.replace(/ /g,'+') + "," + city.replace(/ /g, '+') + "," + state+ "+" + zipCode;
      $(odd[i].children[12]).replaceWith("<td width='100'><a href=" + link + " target='_blank'>" + address + "</a></td>");
    }

    for(let i = 0; i < even.length; i++){
      let address = even[i].children[12].innerText;
      let city = even[i].children[10].innerText;
      let state = even[i].children[9].innerText;
      let zipCode = even[i].children[13].innerText;
      let link = "https://www.google.com/maps/place/" + address.replace(/ /g,'+') + "," + city.replace(/ /g, '+') + "," + state+ "+" + zipCode;
      $(even[i].children[12]).replaceWith("<td width='100'><a href=" + link + " target='_blank'>" + address + "</a></td>");
    }
  }

  function getMapAll(){
    let odd = $('.odd');
    let even = $('.even');
    let addLinksArray = [];
    for(let i = 0; i < odd.length; i++){
      let address = odd[i].children[12].innerText;
      let city = odd[i].children[10].innerText;
      let state = odd[i].children[9].innerText;
      let zipCode = odd[i].children[13].innerText;
      let link = address.replace(/ /g, '+') + "," + city.replace(/ /g, '+') + "," + state + "+" + zipCode;
      addLinksArray.push(link);
    }

    for(let i = 0; i < even.length; i++){
      let address = even[i].children[12].innerText;
      let city = even[i].children[10].innerText;
      let state = even[i].children[9].innerText;
      let zipCode = even[i].children[13].innerText;
      let link = address.replace(/ /g, '+') + "," + city.replace(/ /g, '+') + "," + state + "+" + zipCode;
      addLinksArray.push(link);
    }
    let link = "https://www.google.com/maps/dir/"
    for(let i = 0; i < addLinksArray.length; i++){
      link = link + addLinksArray[i] + "/"
    }
    window.open(link);
  }

    $('a.button').css("appearance", "button");
    $('a.button').css("text-decoration", "none");
    $('a.button').css("background-color", "#577290")
    $('a.button').css("color", "#fff");
    $('a.button').css("padding", "3px");


});
