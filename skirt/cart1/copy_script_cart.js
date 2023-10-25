function OpenPopup() 
{
    let popup = document.getElementById("popup");
    popup.classList.toggle("active");

    number.innerHTML = price.innerHTML.slice(0,4) * counter.innerHTML.slice(0,4) + " ₽";
}

function ClosePopup()
{
    const popup = document.getElementById("popup");
    popup.classList.remove("active");
}

function CountPlus()
{
    counter.innerHTML ++;

    number.innerHTML = price.innerHTML.slice(0,4) * counter.innerHTML.slice(0,4) + " ₽";
}

function CountMinus()
{
    counter.innerHTML --;
    
    const item = document.getElementById("item");
    if (counter.innerHTML == 0) item.innerHTML = "";
    const popup = document.getElementById("popup");
    const empty = document.getElementById("empty");
    if (item.innerHTML == "") popup.classList.remove("active"),
    empty.style.display = "flex" ;

    if (item.innerHTML != "")
    number.innerHTML = price.innerHTML.slice(0,4) * counter.innerHTML.slice(0,4) + " ₽";
    else number.innerHTML = "0" + " ₽";
}

let ToCart = document.getElementById("toShop");
if (page == quiz.length && ToCart.onclick) ;