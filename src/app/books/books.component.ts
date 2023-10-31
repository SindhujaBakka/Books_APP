import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { BookService } from '../book.service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  //books: Book[];
  books: any;
  author: string;
  birthday: string;
  birthPlace: string;
  searchString = "";
  sortwithTitle: string = 'AscTitle';
  sortWithDate: string = 'AscDate';
  constructor(private bookService: BookService) { }

  onClickImage(book) {
    book.previewMode = !book.previewMode;
  }

  ngOnInit() {
    this.getBooks();
  }

  onSubmit() {
    this.getBooks()
  }

  applySortWithTitle() {
    if (this.sortwithTitle === 'AscTitle') {
      this.books = this.books.sort((a, b) => a.title.localeCompare(b.title));
      this.sortwithTitle = 'DesTitle'
    } else {
      this.books = this.books.sort((a, b) => b.title.localeCompare(a.title));
      this.sortwithTitle = 'AscTitle'
    }
  }
  applySortWithDate() {
    if (this.sortWithDate === 'AscDate') {
      this.books = this.books.sort((a, b) => a.PublishDate.localeCompare(b.PublishDate));
      this.sortWithDate = 'DesDate'
    } else {
      this.books = this.books.sort((a, b) => b.PublishDate.localeCompare(a.PublishDate));
      this.sortWithDate = 'AscDate'
    }
  }

  private getBooks() {
    this.bookService.getBooks(this.searchString).then(data => {
      this.books = data.books;
      this.author = this.books.author;
      this.birthday = this.books.birthday;
      this.birthPlace = this.books.birthPlace;
    })
  }

  deleteBook(date: any) {
    let index = this.books.findIndex((element) => element.PublishDate == date);
    this.books.splice(index, 1);
  }

}
