const quiz = [
	{name:"МОДЕЛЬ:",buttons:[{name:"трапеция", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"колокол", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ДЛИНА:",buttons:[{name:"короткая", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"средняя", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"длинная", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ПОЯС:",buttons:[{name:"без обoрки", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"с оборкой", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ДОПОЛНИТЕЛЬНАЯ ФИКСАЦИЯ ПОЯСА:",buttons:[{name:"нет", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"шлёвки", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"шнурок", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"фиксатор",img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ТИП ШНУРКА:",buttons:[{name:"из основной ткани", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"плетёный", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ТИП ФИКСАТОРА:",buttons:[{name:"в цвет ткани", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"белый", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"прозрачный", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
    {name:"БОКОВЫЕ КАРМАНЫ:",buttons:[{name:"неm",img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"eсть", img:"https://i.imgur.com/RuQNtmv.jpg"}]}, // нет - т латиница  eсть  - е латиница
    {name:"НАКЛАДНЫЕ КАРМАНЫ СПЕРЕДИ:",buttons:[{name:"нeт", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"есть", img:"https://i.imgur.com/RuQNtmv.jpg"}]}, // нет - е латиница
    {name:"ЗАДНИЙ КАРМАН:",buttons:[{name:"нem", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"один", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"два", img:"https://i.imgur.com/RuQNtmv.jpg"}]}, // нет - ет латиница
    {name:"ОБОРКА ПО НИЗУ:",buttons:[{name:"без оборки", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"одинарная", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"двойная", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
	{name:"ОБРАБОТКА КРАЯ:",buttons:[{name:"обмётка", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"шов", img:"https://i.imgur.com/RuQNtmv.jpg"}]},
    {name:"РАЗМЕР:",buttons:[{name:"86"},{name:"92"},{name:"98"},{name:"104"},{name:"110"},{name:"116"},{name:"122"},{name:"128"}]},
    {name:"МАТЕРИАЛ:",buttons:[{name:"материал1", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"материал2", img:"https://i.imgur.com/RuQNtmv.jpg"},{name:"материал3", img:"https://i.imgur.com/RuQNtmv.jpg"}]}
]

let page = 0;
let page_history = [];
let choise_selected = false;
let choises = [];

function Startup()
{
	SetQuiz(page);
}

function SetQuiz(num = null)
{
	if(num == null) num = page;
	choise_selected = false;
	let head = document.getElementById("head");
	let buttons = document.getElementById("buttons");
	let pages = document.getElementById("pages");
	

	head.innerHTML = quiz[num].name;
	pages.innerHTML = (num + 1) + " / " + quiz.length;

	
	let new_buttons = "";
	for(let i in quiz[num].buttons)
	{
		let value = quiz[num].buttons[i];
		let image = value.img;
		if(image != undefined)
		{
			new_buttons += '<button id="button' + i + '" class="button" style="background-image: url(' + value.img + ');" onclick="ButtonPressed(this.id)">' + value.name + '</button><br>';
		}
		else
		{
			new_buttons += '<button id="button' + i + '" class="button" onclick="ButtonPressed(this.id)">' + value.name+ '</button><br>';
		}

		if(page == quiz.length-2) document.getElementById("size").style.display = "block", document.getElementById("table").style.display = "flex", document.getElementById("allValues").style.display = "none", document.getElementById("buttons").style.display = "flex";
		else document.getElementById("size").style.display = "none", document.getElementById("table").style.display = "none", document.getElementById("allValues").style.display = "none", document.getElementById("buttons").style.display = "flex";
	}
	buttons.innerHTML = new_buttons;
	
	SetPictures();
	if(page == quiz.length-2) SetSizes();
}

function SetSizes()
{
	let slider = document.getElementById("Slider"); 
	let index = document.getElementById("value"); 
	index.innerHTML = slider.value;

	let buttons = document.getElementsByClassName("button");
	if (page == quiz.length-2){
		for(let entry of buttons)
		{
			entry.classList.add("slider");
		}
	};
}

function SetResults()
{	
	let price = document.getElementById("shopValue").innerHTML;
	let results = [];
		for(let i in choises)
		{
			let choise = choises[i];
			results += "<div>" + choise.name + " " + choise.value + "</div>";
		}

	document.getElementById("box").innerHTML = '<div class = "emptyCart" id = "empty">К сожалению, корзина пустая :(</div>'
	'<div class = "items" id = "item">'
		'<div class = "itemObjects" id = "objects">'
			'<div class = "itemImage" id = "image"></div>'
			'<div class = "itemData" id = "dataItem">'
			'<div class = "itemName" id = "itemName"></div>'
			'<div class = "itemExtra" id = "extra"></div>'
		'</div>'
		'</div>'
		'<div class = "extras" id = "extraButtons">'
			'<div class = "counters" id = "allCounters">'
				'<div class = "minusCounter" id = "minus" onclick = "CountMinus()"><img src="https://svgshare.com/i/wcj.svg" class = "minusSVG"></div>'
				'<div class = "itemCounter" id = "counter">1</div>'
				'<div class = "plusCounter" id = "plus" onclick = "CountPlus()"><img src="https://svgshare.com/i/wcv.svg" class = "plusSVG"></div>'
			'</div>'
			'<div class = "itemPrice" id = "price"></div>'
		'</div>'
	'</div>';

	let open = document.getElementById("open");
    open.style.display = "flex";

	document.getElementById("extra").innerHTML = results;
	document.getElementById("price").innerHTML = price;
	document.getElementById("itemName").innerHTML = "Юбка";	
}

function ButtonPressed(id)
{
	let value = document.getElementById(id).innerHTML;
	let choise = {};
	choise.name = quiz[page].name;
	choise.value = value;
	
	if(!choise_selected){
		switch(value){
			case "нет":
				page = 6;
				break;
			case "шлёвки":
				page = 6;
				break;	
			case "фиксатор":
				page = 5;
				break;
			case "из основной ткани":
				page = 6;
				break;	
			case "плетёный":
				page = 6;
				break;
			case "одинарная":
				page = 11;
				break;
			case "eсть":
				page = 8;
				break;
			case "двойная":
				page = 11;
				break;
			default:
				page++;
				break;
		}
		page_history.push(page);
		choise_selected = true;
		choises.push(choise);
	}	
	else
	{
		choises[choises.length - 1] = choise;
	}
	let buttons = document.getElementsByClassName("button");

	for(let entry of buttons)
	{
		console.log(entry);
		entry.classList.remove("selected");
	}
	document.getElementById(id).classList.add("selected");
}

function GoBack()
{
	if(page_history.length >= 2)
	{
		page_history.pop();
		page = page_history[page_history.length - 1];
		choises.pop();
	}
	else
	{
		page = 0;
		choises = [];
		page_history = [];
	}
	
	if(page != 13) document.getElementById("go").classList.remove("disabled");
	// if(document.getElementById("results").style.display = "flex") document.getElementById("quiz").style.display = "block", document.getElementById("results").style.display = "none";
	SetQuiz(page);
}

function goShop()
{
	if(page !== quiz.length) document.getElementById("toShop").style.display = "none", document.getElementById("historyButton").style.display = "none", document.getElementById("go").style.display = "none", document.getElementById("noShop").style.display = "flex", setTimeout(Reverse, 1500);
    else SetResults();

	function Reverse()
	{
		document.getElementById("toShop").style.display = "block", document.getElementById("historyButton").style.display = "flex", document.getElementById("go").style.display = "flex", document.getElementById("noShop").style.display = "none";
	}
}

function GoNext()
{
	if (page == 13) document.getElementById("go").classList.add('disabled');
	SetQuiz();
	SetPictures();
}


function SetPictures()
{
	let icon = document.getElementById("shopIcon");
	icon.innerHTML = "<img src='https://svgshare.com/i/vm3.svg'>" // иконка корзина

	let heart = document.getElementById("heart");
	heart.innerHTML = "<img src='https://svgshare.com/i/vjN.svg'>" // сердечко

	let parentEl = document.getElementById("images");
    parentEl.innerHTML = "<img src='https://i.imgur.com/5rAMnmq.png'>" // юбка
}

function size_slider()
{
	let slider = document.getElementById("Slider"); 
	let index = document.getElementById("value"); 
	index.innerHTML = slider.value;

	let buttons = document.getElementsByClassName("button");
	for(but of buttons)
	{
		but.style.fontWeight = "";
	}
	let button_selected = "";

	switch(value.innerHTML)
	{
		case "86":
			button_selected = "button0";
			break;
		case "92":
			button_selected = "button1";
			break;
		case "98":
			button_selected = "button2";
			break;
		case "104":
			button_selected = "button3";
			break;
		case "110":
			button_selected = "button4";
			break;
		case "116":
			button_selected = "button5";
			break;
		case "122":
			button_selected = "button6";
			break;
		case "128":
			button_selected = "button7";
			break;
	}

	document.getElementById(button_selected).style.fontWeight = "bold";
	document.getElementById(button_selected).click();
}