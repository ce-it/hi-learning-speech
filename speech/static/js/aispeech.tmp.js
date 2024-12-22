let mediaRecorder;
let audioChunks = [];
let savedScoreCell = null;  // scoreCell을 저장할 변수

// 녹음 관련 변수
let isRecording = false;
let recordedChunks = [];
let sendText="";
//const recordButton = document.getElementById('recordButton');
//recordButton.disabled = true;
let recordType="";

//var textInput = document.getElementById("textInput");
var textOUT = document.getElementById("textOut");
window.speechTxt = null; // 애니메이트에서 참조할 텍스트 박스를 저장
//var nextButton = document.getElementById("nextButton");



// 사운드 재생 버튼 클릭 시
/*
document.getElementById('playButton').addEventListener('click', () => {
    nativeSound();
});
*/
// 사운드 듣기 기능
function nativeSound() {

    console.log("===playButton===");
    //textInput.value = scriptArr[_count] + "\n"; // 현재 문장 텍스트
    speechTxt.text= scriptArr[_count] + "\n"; // 현재 문장 텍스트
    isPlaySound(mrSound[_count].id, enableCheck);
}

// 사운드 재생 완료 후 녹음 버튼 활성화
function enableCheck() {
    recordButton.disabled = false;
    console.log('사운드 재생이 완료되었습니다. 이제 녹음 버튼을 사용할 수 있습니다.');
}

// 문장 녹음 시 초기화
function initSentence() {
    audioChunks = []; // 오디오 청크 초기화
}

// 다음 문장으로 이동
function nextSentence() {
    if (_count < _total) {
        _count++; // 인덱스 증가
        nativeSound();
    } else {
        alert("더 이상 출력할 문장이 없습니다.");
    }
}
//nextButton.addEventListener("click", nextSentence);
//녹음 버튼 클릭한 후
function downRecordinfo(){
    recordType="sentence";
    //sendText=textInput.value;
    sendText=speechTxt.text

    startRecording()
}

// 녹음 시작
function startRecording() {
    initSentence();
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
            mediaRecorder.onstop = processRecording;
        });
    document.getElementById('stopButton').disabled = false;
}

// 녹음 중지
function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('stopButton').disabled = true;
}

// 녹음 후 오디오 처리 및 서버로 전송
function processRecording() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

    // WAV로 변환 후 처리
    convertToWav(audioBlob).then(wavBlob => {
        playAudio(wavBlob);  // 재생
        sendAudioData(wavBlob, sendText);  // 서버로 데이터 전송
    });
}

// 오디오 재생 기능
function playAudio(wavBlob) {
    const audioURL = URL.createObjectURL(wavBlob);
    const audioElement = document.getElementById('audioPlayback');
    audioElement.src = audioURL;
    audioElement.play();
}

// 서버로 오디오 및 텍스트 데이터 전송
function sendAudioData(wavBlob, text) {
    const formData = new FormData();

    // WAV 파일과 텍스트 데이터 추가
    formData.append('audio_data', wavBlob);
    formData.append('reftext', text);

    // AJAX 요청
    $.ajax({
        url: '/SST/ackaud',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: handleSuccess,
        error: handleError
    });
}

// AJAX 성공 처리
function handleSuccess(response) {
    const objectText = JSON.stringify(response, null, 2);
    textOUT.value = objectText;
   // renderTable(response)
   if(recordType=="sentence"){
        displayWords(response.NBest[0].Words);
   }else{
        displayReWords(response.NBest[0].Words);
   }
}

// AJAX 실패 처리
function handleError(xhr, status, error) {
    console.error("Error:", error);
}

// WebM -> WAV 변환 함수
function convertToWav(audioBlob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContext.decodeAudioData(reader.result, buffer => {
                audioContext.close();
                const wavBlob = exportWAV(buffer);
                resolve(wavBlob);
            });
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(audioBlob);
    });
}

// WAV 파일 생성 함수
function exportWAV(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    let buffer = audioBuffer.getChannelData(0);
    let wavBuffer = new ArrayBuffer(44 + buffer.length * 2);
    let view = new DataView(wavBuffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + buffer.length * 2, true);
    writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * bitDepth / 8, true);
    view.setUint16(32, numberOfChannels * bitDepth / 8, true);
    view.setUint16(34, bitDepth, true);

    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * 2, true);

    // PCM 데이터 쓰기
    let offset = 44;
    for (let i = 0; i < buffer.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, buffer[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([view], { type: 'audio/wav' });
}

// WAV 파일에 문자열 쓰기
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// 이벤트 핸들러 등록
//recordButton.addEventListener('click', downRecordinfo);
//document.getElementById('stopButton').addEventListener('click', stopRecording);

const tableBody = document.getElementById("scoreTable").getElementsByTagName("tbody")[0];

    // 단어 목록을 테이블로 출력
    function displayWords(words) {
        const tableBody = document.querySelector('#scoreTable tbody');
        tableBody.innerHTML = '';

        words.forEach(wordData => {
            const row = document.createElement('tr');
            const wordCell = document.createElement('td');
            const errorTypeCell = document.createElement('td');
            const scoreCell = document.createElement('td');
            const actionCell = document.createElement('td');

            wordCell.textContent = wordData.Word;
            errorTypeCell.textContent = wordData.ErrorType;
            scoreCell.textContent = wordData.AccuracyScore;

            if (wordData.AccuracyScore < 70) {
                const retryButton = document.createElement('button');
                retryButton.textContent = '다시 녹음';
                retryButton.addEventListener('click', () => {
                    recordType="word";
                    sendText=wordData.Word;
                    savedScoreCell = scoreCell;  // scoreCell을 저장
                    startRecording()
                    //downRecordinfo()
                    //startRecordingAndSend(wordData.Word, scoreCell); // 단어와 점수 셀 전달
                });
                actionCell.appendChild(retryButton);
            } else {
                actionCell.textContent = '잘했습니다!';
            }

            row.appendChild(wordCell);
            row.appendChild(errorTypeCell);
            row.appendChild(scoreCell);
            row.appendChild(actionCell);
            tableBody.appendChild(row);
        });
    }
// 단어 재녹음 후 점수 업데이트
function displayReWords(words) {
    words.forEach(wordData => {
        if (wordData.Word === sendText) {
            // 저장된 scoreCell에 새로운 점수 반영
            if (savedScoreCell) {
                savedScoreCell.textContent = wordData.AccuracyScore;
            }
        }
    });
}