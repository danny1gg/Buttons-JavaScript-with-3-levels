var id_choose_level = document.getElementById("id_choose_level").selectedIndex;
var btn_container = document.getElementById("buttons_container");
var display_round = document.getElementById("display_round");
var display_points = document.getElementById("display_points");
var result = document.getElementById("result");
var show_level = document.getElementById("show_level");
var hint = document.getElementById("hint");
var sel_value = id_choose_level.value;
var points, round, button_nr = 0, correct_button_nr;

// ========== Game panel ==========

function default_table_beginner() {
	for (let i = 1; i <= 3; ++i) {
		add_button();
	}
}

function shuffle() {
	correct_button_nr = Math.floor((Math.random() * button_nr + 1));
}

function select_level() {
	id_choose_level = document.getElementById("id_choose_level").selectedIndex;
	if (id_choose_level == 0) { // 0 = Beginner
		location.reload();
		hide_add_button();
	} else if (id_choose_level == 1) { // 1 = Intermediate
		show_level.innerHTML = "Intermediate";
		show_add_button();
		remove_button();
	} else { // 2 = Advanced
		show_level.innerHTML = "Advanced";
		hide_add_button();
		remove_button();
	}
	startRound();
}

function default_aspect() {
	btn_container.style.display = "flex";
	hint.innerHTML = correct_button_nr;
	hint.classList.add("hidden");
}

function startRound() {
	round = 1;
	points = 0;
	shuffle();
	display_round.innerHTML = "Round: " + round;
	display_points.innerHTML = "Points: " + points;
	default_aspect();		
}

function nextRound() {
	++round;
	shuffle();
	display_round.innerHTML = "Round: " + round;
	document.getElementById("info").style.display = "inline";
	result.classList.add("hidden");
	default_aspect();
}

// ========== Button manipulation ==========

function add_button() {
	if (button_nr < 9) {
		btn_container.innerHTML += '<i id = "' + ++button_nr + '" class = "fa fa-question-circle fa-5x" ' +
		'onclick = "choose_button()" onmouseover = "mouseOver()" onmouseout = "mouseOut()"></i>';
	}
	shuffle();
	hint.innerHTML = correct_button_nr;
}

function remove_button() {
	while (button_nr > 2) { 
		document.getElementById(button_nr--).remove();
	}
	shuffle();
	hint.innerHTML = correct_button_nr;	
}

function show_add_button() {
	document.getElementById("input_nr_buttons").style.visibility = "visible";
}

function hide_add_button() {
	document.getElementById("input_nr_buttons").style.visibility = "hidden";
}

function mouseOver() {
	var id = event.srcElement.id;
	document.getElementById(id).style.color = "lightblue";
}

function mouseOut() {
	var id = event.srcElement.id;
	document.getElementById(id).style.color = "#1F6CCC";
}

function choose_button() {
	var id = event.srcElement.id;
	document.getElementById("buttons_container").style.display = "none";
	document.getElementById("info").style.display = "none";
	show_result();
	if (id == correct_button_nr) {
		result.innerHTML = "<h3 style = 'color: green;'>Correct!</h3>";
		if (id_choose_level == 2) { // if Advanced level selected
			add_button();
			var id = event.srcElement.id;
			document.getElementById(id).style.color = "#1F6CCC";
		}
		if (hint.classList == "hidden") {
			points += 10;
		} else {
			++points;
		}
		display_points.innerHTML = "Points: " + points;
	} else {
		result.innerHTML = "<h3 style = 'color: red;'>Wrong! <br> Please try again...</h3>";
	}
	setTimeout(nextRound, 2000);
}

function show_suggestion() {
	hint.classList.remove("hidden");
}

function show_result() {
	result.classList.remove("hidden");
}

default_table_beginner();
setTimeout(startRound, 100);