function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = () => `${title} by ${author}, ${pages} pages, ` + (isRead ? `has been read` : `not read yet`);
    id = crypto.randomUUID();
}

const library = [];

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    library.push(book);
}