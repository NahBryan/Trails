const PDFDocument = require("pdfkit");
const fs = require("fs");

exports.generateTranscriptPdf = async (data) => {
    // Generate path using the request_code or id from your data
    const fileName = `receipt_${data.request_code}.pdf`;
    const path = `uploads/${fileName}`;
    const doc = new PDFDocument({
        size: 'A4',
        margin: 40
    });

    const stream = fs.createWriteStream(path);
    doc.pipe(stream);
    const PRIMARY_GREEN = "#14532d";
    const INK = "#0F1A0F";
    const MUTED = "#64748B";
    const DIVIDER = "#E2E8F0";

    doc.fillColor(PRIMARY_GREEN)
       .fontSize(10)
       .text("TRAILS ACADEMIC PROTOCOL", { characterSpacing: 1 });
    
    doc.moveDown(0.5);
    doc.fillColor(INK)
       .fontSize(24)
       .font('Helvetica-Bold')
       .text("Payment Receipt");

    doc.fillColor(MUTED)
       .fontSize(10)
       .font('Helvetica')
       .text(`Reference: ${data.request_code}`);

    doc.fillColor(INK)
       .fontSize(12)
       .font('Helvetica')
       .text(`Institution: ${data.institutionName}`);

    doc.fillColor(MUTED)
       .fontSize(12)
       .font('Helvetica')
       .text(`Institution Code: ${data.institutionCode}`);

    doc.moveDown();
    doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor(DIVIDER).stroke();
    doc.moveDown();

    const startY = doc.y;
    
    doc.fillColor(MUTED).fontSize(9).text("STUDENT DETAILS", 40, startY);
    doc.moveDown(0.5);
    doc.fillColor(INK).fontSize(12).font('Helvetica-Bold')
       .text(`${data.studentName}`)
       .font('Helvetica').fontSize(10).fillColor(MUTED)
       .text(`Matricule: ${data.matricule}`)
       .text(`Programme: ${data.program}`);

    doc.fillColor(MUTED).fontSize(9).text("ISSUED FOR", 300, startY);
    doc.moveDown(0.5);
    doc.fillColor(INK).fontSize(12).font('Helvetica-Bold')
       .text(data.institutionName, 300)
       .font('Helvetica').fontSize(10).fillColor(MUTED)
       .text(`Purpose: ${data.purpose}`)
       .moveDown(0.5)
       .fillColor(PRIMARY_GREEN).font('Helvetica-Bold').fontSize(14)
       .text(`Amount: XAF${data.amount}`);

    doc.moveDown(2);
    const qrY = doc.y;
    if (data.qrImage) {
        doc.image(data.qrImage, 40, qrY, { width: 80 });
    }

    doc.fillColor(INK).fontSize(10).font('Helvetica-Bold')
       .text("Secure Digital Receipt", 135, qrY + 20)
       .font('Helvetica').fillColor(MUTED)
       .text("This document is verified via Trails. Scan QR to validate authenticity.", 135, qrY + 35, { width: 250 });

    doc.fontSize(8)
       .fillColor(MUTED)
       .text("Thank you for using Trails.", 40, qrY + 100);

    const middleOfPage = 420;
    doc.moveTo(0, middleOfPage)
       .lineTo(600, middleOfPage)
       .dash(5, { space: 10 })
       .strokeColor(MUTED)
       .stroke();

    doc.fontSize(8)
       .text("✂ - - - - - - - - - - - CUT HERE - - - - - - - - - - -", 0, middleOfPage + 10, { align: 'center' });

    doc.end();

    return new Promise((resolve, reject) => {
        stream.on('finish', () => resolve(path));
        stream.on('error', reject);
    });
};