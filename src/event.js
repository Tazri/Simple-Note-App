// create app object
const app = {};

// create object element and track
app.object = {
    addButton : document.getElementById('add-btn'),
    main : document.querySelector('main')
}

// create event function
app.eventFunction = {}

// create app store function
app.storeFunction = {};

// create storeItem function
app.storeFunction.storeNotes = ()=>{
    // create notes array 
    let notes = [];

    // create note and append inside notes;
    let noteDivs = app.object.main.querySelectorAll('.note');

    noteDivs.forEach(noteDiv=>{
        // track element inside the note
        let text = noteDiv.querySelector('textarea').value;
        let color = noteDiv.querySelector('.text-color').value;
        let bgColor = noteDiv.querySelector('.bg-color').value;

        // create note object
        let note = {text,color,bgColor};

        // store data
        notes.push(note);
    })

    // store data
    localStorage.setItem('notes',JSON.stringify(notes));
}

// create setNotes function
app.storeFunction.setNotes = ()=>{
    // get item from local stroage
    let jsonNotes = localStorage.getItem('notes');
    let notes = JSON.parse(jsonNotes);

    // set data in ui
    notes.forEach(note=>{
        // create noteDiv and append chiled inside the main
        let noteDiv = app.createObject.createNote(note);

        app.object.main.appendChild(noteDiv);
    })
}

// addButtonEvent function
app.eventFunction.addButtonEvent = ()=>{
    // create note
    let note = app.createObject.createNote({});

    // append child on main
    app.object.main.appendChild(note);

    // store notes
    app.storeFunction.storeNotes();
}

// editNote function
app.eventFunction.editNote = (event)=>{
    // track element
    let parentDiv = event.target.parentNode.parentNode.parentNode.parentNode
    let textNoteDiv = parentDiv.querySelector('.note-text');
    let textarea = parentDiv.querySelector('textarea');

    if(textNoteDiv.classList.contains('hidden')){
        // hide the textarea and update the textNoteDiv
        let textareaValue = textarea.value;
        textNoteDiv.innerHTML = marked(textareaValue);
        
        // hide textaea and show textNoteDiv
        textNoteDiv.classList.remove('hidden');
        textarea.classList.add('hidden'); 
    }else{
        // show the textarea and hide the textNoteDiv
        textNoteDiv.classList.add('hidden');
        textarea.classList.remove('hidden');
        textarea.focus();
    }

    // store the note in local storage
    app.storeFunction.storeNotes();
}
