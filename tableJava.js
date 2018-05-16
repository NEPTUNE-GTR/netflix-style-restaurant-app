



var TABLE_PAY_POP_UP_ID = 'payPopUp';



function genPaySelection()
{
    var addTo = document.getElementById("main");

    //pop up
    var popUpWindow = document.createElement("div");
    popUpWindow.id = TABLE_PAY_POP_UP_ID;
    popUpWindow.classList.add("popUpWindow");

    //text
    var popText = document.createElement("h3");
    popText.classList.add("popUpHeader");
    var textHere = document.createTextNode("Please Select Payment Method");
    popText.appendChild(textHere);


    //card btn
    var cardBtn = document.createElement('input');
    cardBtn.type = 'button';
    cardBtn.classList.add("popUpBtn");
    cardBtn.value = "Credit or Debit card";
    cardBtn.addEventListener('click', function(){cardPopUpBtn()});

    //cash btn
    var cashBtn = document.createElement('input');
    cashBtn.type = 'button';
    cashBtn.classList.add("popUpBtn");
    cashBtn.value = "Cash";
    cashBtn.addEventListener('click', function(){cashPopUpBtn()});

    //cancel btn
    var cnclBtn = document.createElement('input');
    cnclBtn.type = 'button';
    cnclBtn.classList.add("popUpBtn");
    cnclBtn.value = "Cancel";
    cnclBtn.addEventListener('click', function(){clearPopUp()});

    addTo.appendChild(popUpWindow);
    popUpWindow.appendChild(popText);
    popUpWindow.appendChild(cardBtn);
    popUpWindow.appendChild(cashBtn);
    popUpWindow.appendChild(cnclBtn);

    console.log("gen pay popup done");
}



function clearPopUp()
{
    var popUpWindow = document.getElementById(TABLE_PAY_POP_UP_ID);

    while(popUpWindow.hasChildNodes())
    {
        popUpWindow.removeChild(popUpWindow.firstChild);
    }

    popUpWindow.parentNode.removeChild(popUpWindow);
}


function cardPopUpBtn()
{
    clearPopUp();

    var addTo = document.getElementById("main");

    //pop up
    var popUpWindow = document.createElement("div");
    popUpWindow.id = TABLE_PAY_POP_UP_ID;
    popUpWindow.classList.add("popUpWindow");

    //text
    var message = document.createElement("h3");
    var textHere = document.createTextNode("Please Pay Using the terminal.");
    message.appendChild(textHere);
    message.classList.add("popUpHeader");


    //cancel btn
    var cnclBtn = document.createElement('input');
    cnclBtn.type = 'button';
    cnclBtn.classList.add("popUpBtn");
    cnclBtn.value = "Okay";
    cnclBtn.addEventListener('click', function(){clearPopUp()});


    addTo.appendChild(popUpWindow);
    popUpWindow.appendChild(message);
    popUpWindow.appendChild(cnclBtn);
}


function cashPopUpBtn()
{
    console.log("cash btn start");

    clearPopUp();

    var addTo = document.getElementById("main");

    //pop up
    var popUpWindow = document.createElement("div");
    popUpWindow.id = TABLE_PAY_POP_UP_ID;
    popUpWindow.classList.add("popUpWindow");


    //text
    var message = document.createElement("h3");
    var textHere = document.createTextNode("Please wait and someone will come by with change.");
    message.appendChild(textHere);
    message.classList.add("popUpHeader");

    //cancel btn
    var cnclBtn = document.createElement('input');
    cnclBtn.type = 'button';
    cnclBtn.classList.add("popUpBtn");
    cnclBtn.value = "Okay";
    cnclBtn.addEventListener('click', function(){clearPopUp()});


    addTo.appendChild(popUpWindow);
    popUpWindow.appendChild(message);
    popUpWindow.appendChild(cnclBtn);

    console.log("cash btn start");
}