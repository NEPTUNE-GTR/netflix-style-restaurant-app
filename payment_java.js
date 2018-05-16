//Group 42 Michael Ryan, Eddie, Gareth, Soni


//menu order
var ITEM_ONE = {cost: 35.50, name:'Steak and Fries', number:1, pending:false};
var ITEM_TWO = {cost: 20.25, name:'Salmon', number:1, pending:false};
var ITEM_THREE = {cost: 25.50, name:'Red Wind - Bottle', number:1, pending:false};
var ITEM_FOUR = {cost: 10.75, name:'Beer - Import', number:1, pending:false};
var ITEM_FIVE = {cost: 12.80, name:'Wings', number:1, pending:false};

var outstandingBill = [ITEM_ONE, ITEM_TWO, ITEM_THREE, ITEM_FOUR, ITEM_FIVE];
var pendingPayment = [];

var PST_RATE = 0.08;
var GST_RATE = 0.05;

var OUTSTANDING_ELEMENT = 'outstandingList';
var PENDING_ELEMENT = 'pendingList';
var OUTSTANDING_TOTAL_ELEMENT = 'outstandingTotal';
var PENDING_TOTAL_ELEMENT = 'pendingTotal';
var OUTSTANDING_GST = 'outstandingGST';
var PENDING_GST = 'pendingGST';
var OUTSTANDING_PST = 'outstandingPST';
var PENDING_PST = 'pendingPST';
var PEND_LIST_ID = 'plist-';
var OUT_LIST_ID = 'olist-';
var OUT_PRICE_LIST = 'outstandingPrice';
var PEND_PRICE_LIST = 'pendingPrice';
var PAY_POP_UP_ID = 'paySelectionPopUp';


////Functions

//moves item at index to payment list, returns removed item
function moveToPayment(index)
{
    outstandingBill[index].pending = true;
    //console.log(pendingPayment.toString());
    console.log("move [" + index + "]to payment run");
}


//moves item at index to outstanding list, returns removed item
function moveToBill(index)
{
    outstandingBill[index].pending = false;

    console.log("move to bill run index: " + index);
}


///OUTSTANDING
function createOutstandingList()
{
    var addTo = document.getElementById(OUTSTANDING_ELEMENT);
    var newBtn;

    clearList(addTo);


    for(var i = 0; i < outstandingBill.length; i++)
    {
        newBtn = document.createElement('input');
        newBtn.type = 'button';
        newBtn.value = outstandingBill[i].name + " . . . . $ " + parseFloat(outstandingBill[i].cost).toFixed(2);
        newBtn.id = OUT_LIST_ID + i;
        newBtn.classList.add('Btn');
        newBtn.addEventListener('click', function (num) {
            return function () {moveToPayment(num);};
        }(i));
        newBtn.addEventListener('click', function(){loadLists()});
        addTo.appendChild(newBtn);

        if(outstandingBill[i].pending)
        {
            newBtn.style.opacity = ".5";
        }

    }

    //console.log("create outstanding run");
}








///PENDING
function createPendingList()
{
    var addTo = document.getElementById(PENDING_ELEMENT);
    var newBtn;

    clearList(addTo);


    for(var i = 0; i < outstandingBill.length; i++)
    {

        if(outstandingBill[i].pending)
        {
            newBtn = document.createElement('input');
            newBtn.type = 'button';
            newBtn.id = PEND_LIST_ID + i;
            newBtn.classList.add('Btn');
            newBtn.value = outstandingBill[i].name + " . . . . $ " + parseFloat(outstandingBill[i].cost).toFixed(2);
            newBtn.addEventListener('click', function (num) {
                return function () {moveToBill(num);};
            }(i));
            newBtn.addEventListener('click', function(){loadLists()});
            newBtn.addEventListener('click', function(){delSelf(newBtn)});
            addTo.appendChild(newBtn);
        }
    }

    //console.log("create pending run");
}



function delSelf(node)
{
    if(node != null)
    {
        node.parentNode.removeChild(node);
    }

    console.log("del self node run");
}


function fadeBtn(node, num)
{
    if(outstandingBill[num].pending) //fade if added
    {
        document.getElementById(node).style.opacity = "0.5";
    }else //unfade
    {
        document.getElementById(node).style.opacity = "1";
    }

    console.log("fade run " + node.id);
}





function handlePayment()
{
    for (var i = 0; i < outstandingBill.length; i++)
    {
        if(outstandingBill[i].pending)
        {
            outstandingBill.splice(i,1);
            i--;
        }
    }

    console.log("handle payment run");
    loadLists()
}


function payAll()
{
    if(outstandingBill.length > 0)
    {
        addAll();
        genPaySelection();
    }  
}


function addAll()
{
    for (var i = 0; i < outstandingBill.length; i++)
    {
        outstandingBill[i].pending = true;
    }
    console.log("add all run");
    loadLists()
}

function removeAll()
{
    for (var i = 0; i < outstandingBill.length; i++)
    {
        outstandingBill[i].pending = false;
    }
    console.log("remove all run");
    loadLists()
}




//gets the total cost of a list
function totalBill()
{
    var result = 0.00;

    for (var i = 0; i < outstandingBill.length; i++)
    {
        result += outstandingBill[i].cost;
    }

    //console.log("bill total = " + result);
    return result;
}

function totalPending()
{
    var result = 0.00;

    for (var i = 0; i < outstandingBill.length; i++)
    {
        if(outstandingBill[i].pending)
        {
            result += outstandingBill[i].cost;
        }
    }

    //console.log("pending total = " + result);
    return result;
}


function getGST(price)
{
    return (price * GST_RATE).toFixed(2);
}

function getPST(price)
{
    return (price * PST_RATE).toFixed(2);
}

function billFinal()
{
    var result = 0;
    var cost = totalBill();

    

    result = (parseFloat(cost) + parseFloat(getGST(cost)) + parseFloat(getPST(cost)));

    return parseFloat(result).toFixed(2);
}

function pendingFinal()
{
    var result = 0;
    var cost = totalPending();

    console.log("bill: " + cost);

    result = (parseFloat(cost) + parseFloat(getGST(cost)) + parseFloat(getPST(cost)));

    return parseFloat(result).toFixed(2);
}

function printTotals()
{

    //outPriceList();
    //pendPriceList();

    document.getElementById(OUTSTANDING_GST).innerHTML=("$ " + getGST(totalBill()));  
    document.getElementById(OUTSTANDING_PST).innerHTML=("$ " + getPST(totalBill()));
    document.getElementById(OUTSTANDING_TOTAL_ELEMENT).innerHTML=("$ " + billFinal());

    document.getElementById(PENDING_GST).innerHTML=("$ " + getGST(totalPending()));  
    document.getElementById(PENDING_PST).innerHTML=("$ " + getPST(totalPending()));
    document.getElementById(PENDING_TOTAL_ELEMENT).innerHTML=("$ " + pendingFinal());
}





function pendingToString()
{
    var result = "Pending: ";

    for(var i = 0; i < outstandingBill.length; i++)
    {
        if(outstandingBill[i].pending)
        {
            result += outstandingBill[i].name + ', ';
        }
    }

    //console.log(result);
    return result;
}

function outstandingToString()
{
    var result = "Outstanding: ";

    for(var i = 0; i < outstandingBill.length; i++)
    {
        result += outstandingBill[i].name + ', ';
    }

    //console.log(result);
    return result;
}



function listTest()
{  
    pendingToString();
    outstandingToString();
}


function loadLists()
{
    createOutstandingList();
    createPendingList();
    printTotals();
}

function clearList(parent)
{
    while(parent.hasChildNodes())
    {
        parent.removeChild(parent.firstChild);
    }

    clearText();

    console.log("clear list run");
}


function clearText()
{
    document.getElementById(OUTSTANDING_TOTAL_ELEMENT).innerHTML = "";
    document.getElementById(PENDING_TOTAL_ELEMENT).innerHTML = "";
    document.getElementById(OUTSTANDING_GST).innerHTML="";
    document.getElementById(PENDING_PST).innerHTML="";
    document.getElementById(OUTSTANDING_GST).innerHTML="";
    document.getElementById(PENDING_PST).innerHTML="";
}


function checkForPending()
{
    var result = false;

    for(var i = 0; i < outstandingBill.length; i++)
    {
        if(outstandingBill[i].pending)
        {
            result = true;
        }
    }

    return result;
}






function doPayBtn()
{
    if(checkForPending())
    {
        genPaySelection();
    }
}




function genPaySelection()
{
    var addTo = document.getElementById("main");

    //pop up
    var popUpWindow = document.createElement("div");
    popUpWindow.id = PAY_POP_UP_ID;
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
    var popUpWindow = document.getElementById(PAY_POP_UP_ID);

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
    popUpWindow.id = PAY_POP_UP_ID;
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

    handlePayment();

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
    popUpWindow.id = PAY_POP_UP_ID;
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

    handlePayment();

    addTo.appendChild(popUpWindow);
    popUpWindow.appendChild(message);
    popUpWindow.appendChild(cnclBtn);

    console.log("cash btn start");
}