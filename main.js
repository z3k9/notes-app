const addBtn = document.querySelector('.add');

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach(note=>{
        addNewNote(note);
    })
}

addBtn.addEventListener('click', ()=>{
    addNewNote();
});

function addNewNote(term = ''){
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <main class= "${term ? '' : 'hidden'}">
            </main>          
            <textarea class=" ${term ? "hidden" : ""}">
            </textarea>
        </div>    
    `;
    document.body.append(note);

    const editBtn = note.querySelector('.edit');
    const textArea = note.querySelector('textarea');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('main');

    editBtn.addEventListener('click', ()=>{
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    textArea.addEventListener('input', (e)=>{
        const {value} = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });
    textArea.value = term;
    main.innerHTML = marked(term);
    deleteBtn.addEventListener('click', ()=>{
        note.remove();
        updateLS();
    });
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea');
    const notes = [];

    notesText.forEach(note =>{
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
