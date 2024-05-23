import BookServices from "../services/bookServices";
import AuthorServices from "../services/authorServices";
import { Request, Response } from "express";
import categoryServices from "../services/categoryServices";
import CustomRequest from "../types/customRequest";

class BookController {
    // private BookServices:BookServices;

    // constructor(){
    //     this.BookServices = new BookServices();
    // }

    public async createBook(req: Request, res: Response): Promise<void> {
        try {
            const { title, author, category, ISBN, description, price } = req.body;
            const bookAuthor = await AuthorServices.findAuthorById(author)
            console.log(bookAuthor);

            // if (!bookAuthor) {
            //     throw new Error(`Author of Id ${author} Not Found !`)
            // }
            const bookCategory = await categoryServices.showCategoryById(category)
            console.log(bookCategory);

            if (!bookCategory) {
                throw new Error(`category of Id ${category} Not Found !`)
            }

            // const newBook = await BookServices.createBook(title, bookAuthor.name, bookCategory.name, ISBN, description, price)
            const newBook = await BookServices.createBook(title, author, category, ISBN, description, price)
            res.json({ newBook, message: "Book Added Successfully" })

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const role = (req as CustomRequest).role;
            const userId: any = (req as CustomRequest).userId;
            console.log("UserID", userId);
            const { title, author, category, ISBN, description, price } = req.body;

            const id = req.params.id;
            const bookById = await BookServices.showBookById(id);
            console.log(bookById.author);
            console.log((userId !== bookById.author));

            if (role == 'admin') {
                // throw new Error(`You Don't Have parmisson to Updated this Book?`)
                const updatedBook = await BookServices.updateBook(id, title, author, category, ISBN, description, price);
                res.json({ updatedBook, message: "Book Updated Successfully" })
                return
            }

            if (userId !== bookById.author) {
                throw new Error(`You Don't Have parmisson to Updated this Book`)

            }

            const Books = await BookServices.bookByAutherId(userId);
            console.log("Books By UserId", Books);

            const authorIds = Books.map((book) => book.author.toString());
            console.log("Authors", authorIds);

            console.log("AUthor array contains", authorIds.includes(userId));

            const bookCategory = await categoryServices.showCategoryById(category)
            // console.log(bookCategory);

            if (!bookCategory) {
                throw new Error(`category of Id ${category} Not Found !`)
            }

            // const updatedBook = await BookServices.updateBook(id, title, bookAuthor.name, bookCategory.name, ISBN, description, price);
            const updatedBook = await BookServices.updateBook(id, title, author, category, ISBN, description, price);
            res.json({ updatedBook, message: "Book Updated Successfully" })

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const book = await BookServices.showBookById(id);
            if (!book) {
                throw new Error(`Book With Id ${id} Not Found`)
            }
            await BookServices.deleteBook(id);
            res.json({ message: "Book Deleted Successfully" })

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async showAllBook(req: Request, res: Response): Promise<void> {
        try {
            const allBooks = await BookServices.showAllBook();
            if (!allBooks) {
                throw new Error(`Books Not Found`)
            }
            res.json({ allBooks, message: "List Of All Books" })

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async showBookById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const book = await BookServices.showBookById(id);
            if (!book) {
                throw new Error(`Book With Id ${id} not found`);
            }
            res.json({ book, message: `Book with id ${id}` })
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }

    public async showBooksByAuthor(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const books = await BookServices.bookByAutherId(id);

            if (books.length === 0) {
                throw new Error(`Books Not found for ${id} author`)
            }
            res.json({ books, message: `Books With Author Id ${id}` })
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            })
        }
    }
}

export default new BookController();