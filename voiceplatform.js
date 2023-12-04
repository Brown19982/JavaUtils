var pdfViewer
var viewerContainer = document.getElementById('viewerContainer')
var loadingTask = pdfjsLib.getDocument('./FHP_11007.pdf')


// var voice_url = document.getElementById('voice_url').innerText;
var voice_url_str = './VLT語音檔_0209.mp3';
var audio = new Audio(voice_url_str);
var timeDisplay = document.getElementById('voice-time');
audio.addEventListener('loadedmetadata', function () {
    // 获取总时长
    var totalTime = audio.duration;

    // 将总时长显示在 span 元素上
    var totalMinutes = Math.floor(totalTime / 60);
    var totalSeconds = Math.floor(totalTime % 60);
    var formattedTotalTime = totalMinutes + ':' + (totalSeconds < 10 ? '0' : '') + totalSeconds;
    timeDisplay.textContent = formattedTotalTime;
});

// 监听音频时间更新事件
audio.addEventListener('timeupdate', function () {
    // 更新显示分:秒格式的时间
    var minutes = Math.floor(audio.currentTime / 60);
    var seconds = Math.floor(audio.currentTime % 60);
    var formattedTime = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    // 将时间更新显示在 span 元素上
    timeDisplay.textContent = formattedTime;
});

const eventBus = new pdfjsViewer.EventBus()
var currentPage = 1
var pdf_doc
var pageInput = document.getElementById('pageNum')
pageInput.value = 1
var isKeyUpEvent = false;
var isPrevNextButtonClick = false;

loadingTask.promise.then(function (pdfDocument) {
    pdf_doc = pdfDocument
    pdfViewer = new pdfjsViewer.PDFViewer({
        container: viewerContainer,
        eventBus: eventBus,
    })
    pdfViewer.setDocument(pdfDocument)
})


var play_circle = document.getElementById('play_circle');
var stop_circle = document.getElementById('stop_circle');
//播放語音
play_circle.addEventListener('click', function () {
    play_circle.style.display = 'none'
    stop_circle.style.display = ''
    audio.play();
})
//暫停語音
stop_circle.addEventListener('click', function () {
    play_circle.style.display = ''
    stop_circle.style.display = 'none'
})

//上一頁
document.getElementById('prev-page').addEventListener('click', function () {
    isPrevNextButtonClick = true;
    if (currentPage != 1) {
        currentPage = currentPage - 1
        pageInput.value = currentPage
        pdfViewer.scrollPageIntoView({ pageNumber: currentPage })
    }
})
//下一頁
document.getElementById('next-page').addEventListener('click', function () {
    isPrevNextButtonClick = true;
    if (currentPage != pdf_doc.numPages) {
        currentPage = currentPage + 1
        pageInput.value = currentPage
        pdfViewer.scrollPageIntoView({ pageNumber: currentPage })
    }
})
//輸入頁碼
pageInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        isKeyUpEvent = true;
        // 獲取輸入的頁碼
        const pageNumber = parseInt(pageInput.value, 10)

        // 檢查輸入的頁碼是否有效
        if (pageNumber > 0 && pageNumber <= pdf_doc.numPages) {
            // 設定新的頁碼
            pageNum = pageNumber
            // 調用換頁函數
            pdfViewer.currentPageNumber = pageNumber
            currentPage = pageNum
            pageInput.value = currentPage
            event.stopPropagation();
        }
    }
})
//滾動頁面
var divs = document.getElementsByClassName("page");
viewerContainer.addEventListener('scroll', function () {
    if (!isKeyUpEvent && !isPrevNextButtonClick) {
        for (var i = 0; i < divs.length; i++) {
            var divRect = divs[i].getBoundingClientRect();
            if (divRect.top <= 0 && divRect.bottom > 0) {
                currentPage = i + 1
                pageInput.value = (i + 1).toString();
                break
            }
        }
    }
    isKeyUpEvent = false;
    isPrevNextButtonClick = false;
})
