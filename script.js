class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = () => `${title} by ${author}, ${pages} pages, ${isRead ? `has been read` : `not read yet`}`;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }
}


const library = [];
const container = document.querySelector(".container");

const showButton = document.querySelector(".showForm");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isRead = document.querySelector("#isRead");

showButton.addEventListener("click", () => {
    dialog.showModal();
});


form.addEventListener("submit", (event) => {
    let valid = true;

    // TITLE
    if (!title.value.trim()) {
        title.setCustomValidity("The title name must not be empty");
        valid = false;
    } else {
        title.setCustomValidity("");
    }

    // AUTHOR
    if (!author.value.trim()) {
        author.setCustomValidity("The author name must not be empty");
        valid = false;
    } else {
        author.setCustomValidity("");
    }

    // PAGES (minimum 1)
    if (pages.value === "" || Number(pages.value) < 1) {
        pages.setCustomValidity("There must be at least 1 page");
        valid = false;
    } else {
        pages.setCustomValidity("");
    }

    if (!valid) {
        event.preventDefault();
        form.reportValidity(); // show all messages
        return;
    }

    event.preventDefault();


    addBookToLibrary(title.value, author.value, pages.value, isRead.checked);
    title.value = "";
    author.value = "";
    pages.value = "";
    isRead.checked = false;

    displayBooks();

    dialog.close();
});

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    library.push(book);
}

function displayBooks() {
    container.replaceChildren();
    for(let book of library) {
        let card = document.createElement("div");
        card.classList.add("card");

        const h2 = document.createElement("h2");
        h2.textContent = book.title;

        const h3 = document.createElement("h3");
        h3.textContent = "By: " + book.author;

        const p1 = document.createElement("p");
        p1.textContent = `Pages: ${book.pages}`;
        const p2 = document.createElement("p");
        p2.textContent = `Finished Reading: ${book.isRead ? `Yes` : `No`}`;

        const toggleBtn = document.createElement("button");
        toggleBtn.classList.add("toggle");
        toggleBtn.textContent = "Toggle Read";
        toggleBtn.addEventListener("click", () => {
            book.toggleRead();
            p2.textContent = `Finished Reading: ${book.isRead ? `Yes` : `No`}`;
        });


        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove");
        removeBtn.textContent = "Remove";

        removeBtn.addEventListener("click", () => {
            let i = 0;
            for(; i < library.length; i++) {
                if(library[i] === book) break;
            }

            library.splice(i, 1);

            displayBooks();
        });


        card.appendChild(h2);
        card.appendChild(h3);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(toggleBtn);
        card.appendChild(removeBtn);

        container.appendChild(card);
    }
}