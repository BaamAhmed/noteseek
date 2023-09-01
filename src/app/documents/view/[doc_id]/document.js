"use client"
import {useState} from 'react'
import {Document, Page, pdfjs } from 'react-pdf'
import { StyleSheet } from '@react-pdf/renderer';

import "react-pdf/dist/esm/Page/TextLayer.css";

const url = 'https://aurparhobucket.s3.ap-south-1.amazonaws.com/Bassam_Ahmed_resume_python.pdf'

const styles = StyleSheet.create({
    docContainer: {
        height: 300,
        width: 100
    }
})

export default function Pdf({docURL, pageNum}) {
      
    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
  return (
    <div>
    
      <Document
        file={docURL}
        onLoadSuccess={onDocumentLoadSuccess}

        >
        <Page renderAnnotationLayer={false} renderTextLayer={false} scale={1.4} width={300} pageNumber={pageNum + 1} />
      </Document>
    </div>
  );
}