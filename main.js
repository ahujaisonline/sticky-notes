var NotesManager = (function() {

    // Keep this variable private inside this closure scope
    var colors = ['', '#55efc4', '#0984e3', '#a29bfe', '#fd79a8'];
    var notesContainer = document.getElementById('notesContainer');
    var count = 0;
    var itr = 0;
    var jtr = 200;
    var index = 0;
    var tar;
    var store = 1;

    var init = function() {

        console.log('initiliazed');
        attachEvents();
        loadPreviousNotes();

    };

    var loadPreviousNotes = function() {
        // Retrieve the object from storage
        var retrievedObject = localStorage.getItem('testObject');
        if(retrievedObject){
          console.log('retrievedObject: ', JSON.parse(retrievedObject));
        }  
    }

    var storeData = function(){
      if(store){
        var testObject = { 'one': 1, 'two': 2, 'three': 3 };
      localStorage.setItem('testObject', JSON.stringify(testObject));
      store--;
      }
      
    }

    var attachEvents = function() {

        var addBtn = document.getElementById('add');
        addBtn.addEventListener('click', newNote);
        document.addEventListener('click', focusDiv);

        document.addEventListener('keydown', storeData);
    };

    var focusDiv = function(e) {
        e.stopPropagation();
        console.log(e.target.tagName);
        tar = e.target;
        if (e.target.tagName = "DIV" && tar.className == 'note') {
            index++;
            e.target.style.zIndex = index;
            dragMe(e.target);
        }
    }

    var dragMe = function(tar) {
        tar.style.border = "2px solid black";
        tar.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);

    }

    function mouseUp() {
        window.removeEventListener('mousemove', divMove, true);
        tar.style.border = "none";
    }

    function mouseDown() {
        window.addEventListener('mousemove', divMove, true);
    }

    function divMove(e) {
        tar.style.top = e.clientY + 'px';
        tar.style.left = e.clientX + 'px';
    }

    var newNote = function(e) {
        count++;
        itr++;
        index++;
        console.log('clicked');
        var div = document.createElement('div');
        div.innerHTML = "<h2 contenteditable>Heading</h2> <p contenteditable>Description</p>";
        // set style
        div.style.backgroundColor = colors[Math.floor(Math.random() * 3) + 1];
        if (itr > 3) {
            itr = 1;
            jtr += 100;
        }
        div.style.left = itr * 250 + "px";
        div.style.top = jtr + "px";
        div.style.zIndex = index;
        // better to use CSS though - just set class
        div.setAttribute('class', 'note');
        div.setAttribute('id', count);
        // and make sure myclass has some styles in css
        notesContainer.appendChild(div);
    }
    // Explicitly reveal public pointers to the private functions 
    // that we want to reveal publicly

    return {
        init: init,
    }
})();

NotesManager.init();