import PDFDocument from 'pdfkit'
import BookModel from '../models/bookModel';
import authorModel from '../models/authorModel';
import CategoryModel from '../models/categoryModel';

class PDFGenerate {
    public async generatePDF(bookId: string): Promise<any> {

        const book = await BookModel.findById(bookId);
        if (!book) {
            throw new Error('Book not found');
        }
        const bookAuthorCollection = await authorModel.findById(book.author)
        const bookCategoryCollection = await CategoryModel.findById(book.category)

        const doc = new PDFDocument();

        doc.font('Courier').fontSize(20).text(`Book Details of ID ${book?._id}`, { align: 'center' });
        doc.fontSize(18).moveDown();

     
        doc.fillColor('blue').text(`Title: ${book?.title}`);
        doc.fillColor('green').text(`Author Name: ${bookAuthorCollection?.name}`);
        doc.fillColor('red').text(`Category: ${bookCategoryCollection?.name}`);
        doc.fillColor('black').text(`ISBN: ${book?.ISBN}`);
        doc.fillColor('orange').text(`Price: $${book?.price}`);

      
        doc.moveTo(50, 230).lineTo(550, 230).stroke();

        return doc;
    }
}

export default new PDFGenerate();