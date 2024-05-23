import BookModel from "../models/bookModel";
import { BookDocument } from '../interfaces/bookInterface';


class BookServices{
    public async createBook(title: string, author: string, category: string, ISBN: string, description: string, price: number):Promise<BookDocument> {
        const newBook = new BookModel({title, author, category, ISBN, description, price});
        return await newBook.save();
    }

    public async updateBook(id:string, title: string, author: string, category: string, ISBN: string, description: string, price: number):Promise<BookDocument>{
        
        const updatedBook:any = await BookModel.findByIdAndUpdate(id, {title, author, category, ISBN, description, price}, {new:true});
        return updatedBook;
    }

    public async deleteBook(id:string):Promise<void>{
        await BookModel.findByIdAndDelete(id);
    }

    public async showAllBook():Promise<BookDocument[]>{
        const books = await BookModel.find();
        return books;
    }

    public async showBookById(id:string):Promise<BookDocument>{
        const book:any = await BookModel.findById(id);
        return book;
    }

    public async bookByAutherId(authorId:string):Promise<BookDocument[]>{
        const books:BookDocument[] = await BookModel.find({ author: authorId });
        return books
    }
}

export default new BookServices();
// export default BookServices;