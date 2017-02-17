

var answers = {
	wrAnswer1 : {answer1:'were studying',answer2:'met',answer3:'was getting',answer4:'won',answer5:'had already finished',answer6:'ordered',answer7:'were winning',answer8:'hadn’t slept',answer9:'had just scored',answer10:'was thinking',answer11:'rang',answer12:'said'},
	wrAnswer2 : {answer1:'used to watch',answer2:'used to be',answer3:'usually goes',answer4:'Did you use to work',answer5:'used to play',answer6:'didn’t use to like',answer7:'usually eats',answer8:'isn’t usually'},
	wrAnswer3 : {answer1:'stadium',answer2:'referee',answer3:'slope',answer4:'fans',answer5:'coach',answer6:'circuit'},
	wrAnswer4 : {answer1:'drew',answer2:'beat',answer3:'got',answer4:'do',answer5:'score',answer6:'train'},
	chAnswer1 : {1:2,2:1,3:1,4:2,5:2,6:1,7:1,8:1}
};

//function for check questions where answers is a words
function checkWrQuestions(block) {
	var elems = block.querySelectorAll('form')[0].elements;//pseudoarray of inputs of form in the 'block'
	var rAnswers = 0 ;// variable which will save nuber of correct answers
	for (var i = 0; i < elems.length; i++) {
		if(elems[i].value == answers[block.id][elems[i].name]){
			elems[i].classList.add('correct');
			rAnswers += 1;

		}else{
			elems[i].classList.add('incorrect');
		}
	};
	block.lastElementChild.children[0].innerHTML = rAnswers;
};

//function for check questions where you need to choose one answer
function checkChQuestions(block) {
	var allforms = block.querySelectorAll('form'); //all forms in the 'block'
	var answ = answers[block.id];
	var rAnswers = 0;
	for (var key in answ) {
		var elem = allforms[key-1].elements[answ[key]-1];
		if (elem.checked){
			rAnswers += 1;
			elem.parentElement.parentElement.classList.add('correct');
			//alert(1);
		}else{
			elem.parentElement.parentElement.classList.add('incorrect');
			//alert(2);
		};
block.lastElementChild.children[0].innerHTML = rAnswers;
	};

};

//function for check all forms in the test with separation of question by type
function check() {
	var qblocks = document.getElementsByClassName('questionBlock');//take all blocks	
	for (var i = 0; i < qblocks.length; i++) {
		//We check a each block for its class, depend on type of class we call an appropriate function
		if (qblocks[i].classList.contains("wrAnswer")) {  
			var result = checkWrQuestions(qblocks[i]);
		}else if (qblocks[i].classList.contains("chAnswer")){
			checkChQuestions(qblocks[i]);
		};
	};
	checkButton.disabled = true;
	checkButton.parentElement.style.backgroundColor='grey';
	checkButton.parentElement.style.color='silver';
	timer.innerHTML = 'Done!';
	timer.style.backgroundColor = 'golden';
};

var checkButton = document.getElementById('checkButton');
checkButton.addEventListener("click", check)//onclick = check;// Action"Check" after press/click button
// function for starting timer
function startTimer(lim) {
	var dates = new Date();
	var limit = Date.parse(dates)+(lim*60*1000);
	var differmin,differsec,t; 

	var timerId = setInterval(function(){
 		t = limit - Date.parse(new Date());
 			if(t<=1 ){
 				clearInterval(timerId);
 				check();
 				checkButton.disabled = true;
 			};
 		differsec = Math.floor( (t/1000) % 60 );
  		differmin = Math.floor( (t/1000/60) % 60 );
   		timerMin.innerHTML = ('0'+ differmin).slice(-2);
   		timerSec.innerHTML = ('0'+ differsec).slice(-2);
 },500)
};
function sumResults(){
	var results = document.getElementsByClassName('result');
	var sum = 0;
	for (var i = 0; i < results; i++){
		sum += +results[i].innerHTML;
	};
	alert(sum);
};

//ontop
var ontop = document.getElementById('ontop');
ontop.addEventListener("click", function(){ window.scrollTo(0,0)});
//start test
var startBtn = document.getElementById('startTest');
startBtn.addEventListener("click", function(){
	startBtn.style.display = 'none';
	timer.style.display = 'block';
	var mainBlock = document.getElementsByTagName('main')[0];
	mainBlock.style.display = 'block';
	startTimer(+timerMin.innerHTML);
});