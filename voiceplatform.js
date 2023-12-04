var pdfViewer
var viewerContainer = document.getElementById('viewerContainer')
var loadingTask = pdfjsLib.getDocument('./QJW_11210.pdf')
const eventBus = new pdfjsViewer.EventBus()
var currentPage = 1
var pdf_doc
loadingTask.promise.then(function (pdfDocument) {
  pdf_doc = pdfDocument
  pdfViewer = new pdfjsViewer.PDFViewer({
    container: viewerContainer,
    eventBus: eventBus,
  })
  pdfViewer.setDocument(pdfDocument)
  console.log(pdfViewer)
})

document.getElementById('prev-page').addEventListener('click', function () {
  if (currentPage != 1) {
    currentPage = currentPage - 1
    pdfViewer.scrollPageIntoView({ pageNumber: currentPage })
  }
})

document.getElementById('next-page').addEventListener('click', function () {
  if (currentPage != pdf_doc.numPages) {
    currentPage = currentPage + 1
    pdfViewer.scrollPageIntoView({ pageNumber: currentPage })
  }
})
