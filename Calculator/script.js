let string = "";
let buttons = document.querySelectorAll('.button');
let backspace=document.getElementById("backspace");
var count=1;
let history = '';
let isEqual = false;
backspace.addEventListener('click',function(){
	string=string.substring(0,string.length-1);
	input.value=string;

});


Array.from(buttons).forEach((button) => {
	button.addEventListener('click', (e) => {

		if (e.target.innerHTML == '=') {
			string=eval(string);
			input.value=string;
		} else if (e.target.innerHTML == 'C') {
			addToHistory(e.target.innerHTML)
			string = '';
			string=string.replace("⌫","");
			input.value = string;
		} else {
			string = string + e.target.innerHTML;
			if (isEqual) {addToHistory(string); isEqual = false;} else {addToHistory(e.target.innerHTML)}
			console.log(string)
			string=string.replace("⌫","");
			input.value = string;
		}
if(history == ''){
    document.getElementById('tagHistory').style.display = "none";
}else{
    document.getElementById('tagHistory').style.display = "block";
}
	});
});

var regex = new RegExp("^[0-9-/()%*+-M]");


input.addEventListener('input', function (e) {

	if (this.checkValidity()) {
		string = this.value;
	} else {
		this.value = string;
	}
});

body.addEventListener('keyup',
	function (e) {
		const inputValue = input.value;
		if(e.key == 'Backspace' && inputValue.length > 0){
			history=history.slice(0, -1);
			addToHistory('');
		}
		if (e.key == "Enter") {
			 isEqual = true;
			string = eval(input.value);
			input.value = string;
			addToHistory("="+string + '\n')
		} else if (e.key == "Delete") {
			history = '';
			addToHistory('');
			string = '';
			input.value = string;
		} else if (regex.test(e.key)) {
			input.focus();
			var val = input.value;
			input.value = '';
			input.value = val;

			if (isEqual && e.key != 'Backspace') {
				addToHistory(string); 
				isEqual = false;
			} else {
				const reg = /[^0-9\-\+\-\*\%\=]/gi;
				if(!reg.test(e.key)){
					addToHistory(e.key);
				}
			}

		}
	
	}
);


function addToHistory(value) {
	if ( value == 'C' ){
		history = '';
		input.value=history;	
	}else{
	    history += value;
		input.value=history;
	}
    document.getElementById('history').innerText =input.value;
}

