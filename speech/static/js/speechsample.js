

let mediaRecorder;
let audioChunks = [];

// 녹음 관련 변수
let isRecording = false;
let recordedChunks = [];
const recordButton = document.getElementById('recordButton');
recordButton.disabled = true;
//텍스트 뿌리기
var textInput = document.getElementById("textInput"); // textarea 요소
var textOUT= document.getElementById("textOut"); // textarea 요소
var nextButton = document.getElementById("nextButton"); // 버튼 요소


// 듣기 버튼 클릭 시 사운드 재생
var _direction12 = ["mySound"];


document.getElementById('playButton').addEventListener('click', () => {
    //isPlaySound(snd);
    nativeSound();

});
//사운드 듣기
function nativeSound(){
   console.log("===playButton==");
   textInput.value = scriptArr[_count] + "\n"; // 현재 인덱스의 텍스트 추가
   isPlaySound(mrSound[_count].id, enableCheck);
}


// 재생후 활성
function enableCheck(){
        recordButton.disabled = false;
        console.log('사운드 재생이 완료되었습니다. 이제 녹음 버튼을 사용할 수 있습니다.');
}
//문장 녹음시 초기화
function initSentence(){

     audioChunks = []; // 오디오 청크 초기화
}
nextButton.addEventListener("click", function() {
    if (_count < _total) {

        _count++; // 인덱스 증가

        nativeSound();
    } else {
        alert("더 이상 출력할 문장이 없습니다."); // 모든 문장을 출력한 경우 경고
    }
});
// 버튼 클릭 이벤트 핸들러
document.getElementById('recordButton').addEventListener('click', startRecording);
document.getElementById('stopButton').addEventListener('click', stopRecording);

// 녹음하기 버튼 클릭 시 녹음 시작 및 종료

recordButton.addEventListener('click', async () => {
            initSentence();
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();

                    mediaRecorder.ondataavailable = event => {
                        audioChunks.push(event.data);
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

                        // WAV 포맷으로 변환
                        convertToWav(audioBlob).then(wavBlob => {
                            const formData = new FormData();

                            // WAV 파일 추가
                            formData.append('audio_data', wavBlob);

                            // 입력된 텍스트를 추가
                            const textInput = document.getElementById('textInput').value;
                            formData.append('reftext', textInput);

                            // 생성된 WAV 파일을 플레이어에 연결하여 재생할 수 있게 설정
                            const audioURL = URL.createObjectURL(wavBlob);
                            const audioElement = document.getElementById('audioPlayback');
                            audioElement.src = audioURL;
                            audioElement.play();

                            // AJAX 요청을 통해 Flask 백엔드로 오디오와 텍스트 데이터를 전송
                            $.ajax({
                                url: '/SST/ackaud',
                                type: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function(response) {

                                    //drawChart(response);
                                    const objectText= JSON.stringify(response, null, 2);
                                    textOUT.value =objectText
                                },
                                error: function(xhr, status, error) {
                                    console.error("Error:", error);
                                }
                            });
                        });
                    };
                });
            document.getElementById('stopButton').disabled = false;
});
        document.getElementById('stopButton').addEventListener('click', () => {
            mediaRecorder.stop();
            document.getElementById('stopButton').disabled = true;
        });
        // WebM -> WAV 변환 함수
        function convertToWav(audioBlob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    audioContext.decodeAudioData(reader.result, buffer => {
                        // WAV 파일로 변환
                        audioContext.close();
                        const wavBlob = exportWAV(buffer);
                        resolve(wavBlob);
                    });
                };
                reader.onerror = reject;
                reader.readAsArrayBuffer(audioBlob);
            });
        }

        // WAV 파일로 변환 (단순한 예제 구현)
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

            // Write PCM samples
            let offset = 44;
            for (let i = 0; i < buffer.length; i++, offset += 2) {
                let s = Math.max(-1, Math.min(1, buffer[i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }

            return new Blob([view], { type: 'audio/wav' });
        }

        function writeString(view, offset, string) {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }
