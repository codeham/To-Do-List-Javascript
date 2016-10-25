(function(){
	var todoCount = 0;
	var input = document.getElementById('input');
	var btn = document.getElementById('add-button');
	var lists = {
		todo: document.getElementById('to-do'),
		done: document.getElementById('done')
	};

	/* element injection inside list */
	var makeTaskHtml = function(str, onCheck){
		var element = document.createElement('li');
		var checkPin = document.createElement('span');
		var label = document.createElement('span');

		/* assign glyphicon to element */
		checkPin.className = "glyphicon glyphicon-pushpin";

		/* append string to text content */
		label.textContent = str;

		/* appending both checkbox and label to element ref */
		element.appendChild(checkPin);
		checkPin.addEventListener('click', onCheck);
		element.appendChild(label);

		return element;
	};

	var addTask = function(task){
		lists.todo.appendChild(task);
		todoCount++;
	};

	var flushDone = function(){
		if (confirm("Delete All Items On List ?")){
			var doneCount = lists.done.childNodes.length;

			for ( var i = 0; i < doneCount; i++ ){
				lists.done.removeChild(lists.done.lastChild);
			}
		}
	};

	var onCheck = function(event){
		var task = event.target.parentElement;
		var list = task.parentElement.id;

		var pushpinClass = task.getElementsByClassName("glyphicon glyphicon-pushpin")[0];
		var okClass = task.getElementsByClassName("glyphicon glyphicon-ok")[0];

		if ( list == 'to-do'){
			/* replace pushpin with ok */
			pushpinClass.className = "glyphicon glyphicon-ok";	
			lists.done.appendChild(task);
			todoCount--;
		}else{
			/* replace ok with pushpin */
			okClass.className = "glyphicon glyphicon-pushpin";
			lists.todo.appendChild(task);
			todoCount++;
		}

	};

	var showLists = function(){
		/*node list of elements by name */
		var elements = document.getElementsByName("list-title");

		for ( var i = 0; i < elements.length; i++ ){
			/* unhide these elements (list titles)*/
			elements[i].style.display = 'block';
		}
	}

	var onInput = function(){
		showLists();
		var str = input.value.trim();

		if (str.length > 0){
			addTask(makeTaskHtml(str, onCheck));

			input.value = '';
			input.focus;
		}

	};

	/*DATE DISPLAY */
	var date = new Date();
	document.getElementById("date-display").innerHTML = date.toDateString();

	/* ADD BUTTON LISTENER */
	addbutton.addEventListener('click', onInput);

	/* CLEAR BUTTON LISTENER */
	clearbutton.addEventListener('click', function(){
		if (lists.done.hasChildNodes()){
			flushDone();
		}
	});
	/*TEXT INPUT LISTENER */
	input.addEventListener('keyup', function(event){
		var code = event.keyCode;
		
		if ( code === 13 ){
			onInput();
		}
	});

}());
