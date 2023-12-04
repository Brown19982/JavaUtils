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
//換頁
var pageInput = document.getElementById('pageNum')
pageInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    // 獲取輸入的頁碼
    const pageNumber = parseInt(pageInput.value, 10)

    // 檢查輸入的頁碼是否有效
    if (pageNumber > 0 && pageNumber <= pdf_doc.numPages) {
      // 設定新的頁碼
      pageNum = pageNumber
      // 調用換頁函數
      pdfViewer.currentPageNumber = pageNumber
    }
  }
})
// // 獲取 PDF 容器元素
// const pdfContainer = document.getElementById('viewerContainer')
// // 監聽滾動事件
// pdfContainer.addEventListener('scroll', function () {
//   // 計算當前滾動到的頁碼
//   const currentPage = Math.floor(pdfContainer.scrollTop / pdfContainer.clientHeight) + 1
//   console.log(currentPage)
//   // 更新頁碼顯示或執行其他相關操作
//   // document.getElementById('pageInput').value = currentPage
// })

// 添加滚动事件监听器到包含滑动的容器，这可能是 window 或其他包含 div1、div2 和 div3 的容器
// var divs = document.getElementsByClassName("page")
// document.addEventListener('scroll', function () {
//   // 遍历所有 div
//   for (var i = 0; i < divs.length; i++) {
//     var divRect = divs[i].getBoundingClientRect()

//     // 检查是否滚动到当前 div
//     if (divRect.top <= 0 && divRect.bottom > 0) {
//       // 滚动到当前 div，将输入框值设置为对应的值
//       pageInput.value = (i + 1).toString()
//       break // 如果找到匹配的 div，退出循环
//     }
//   }
// })


viewerContainer.addEventListener('scroll', function () {
  console.log('Scroll event triggered!')
  // Your code here
})
