// 녹음 시작
function startRecording() {
    initSentence();
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            mediaRecorder.ondataavailable = handleDataAvailable;
            mediaRecorder.onstop = () => convertAndProcessAudio();
        });
    document.getElementById('stopButton').disabled = false;
}

// 녹음 데이터 수집
function handleDataAvailable(event) {
    audioChunks.push(event.data);
}

// 녹음 중지
function stopRecording() {
    mediaRecorder.stop();
    document.getElementById('stopButton').disabled = true;
}

// WebM -> WAV 변환 후 처리
function convertAndProcessAudio() {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

    // WAV로 변환
    convertToWav(audioBlob).then(wavBlob => {
        playAudio(wavBlob);  // 오디오 재생
        sendAudioData(wavBlob);  // 데이터 전송
    });
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

// WAV 데이터 생성 함수
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
    view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
    view.setUint16(20, format, true); // Audio format (1 is PCM)
    view.setUint16(22, numberOfChannels, true); // Number of channels
    view.setUint32(24, sampleRate, true); // Sample rate
    view.setUint32(28, sampleRate * numberOfChannels * bitDepth / 8, true); // Byte rate
    view.setUint16(32, numberOfChannels * bitDepth / 8, true); // Block align
    view.setUint16(34, bitDepth, true); // Bits per sample

    // data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, buffer.length * 2, true);

    // PCM samples
    let offset = 44;
    for (let i = 0; i < buffer.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, buffer[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    return new Blob([view], { type: 'audio/wav' });
}

// 문자열을 WAV 데이터 버퍼에 기록하는 함수
function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

// 오디오 재생 함수
function playAudio(wavBlob) {
    const audioURL = URL.createObjectURL(wavBlob);
    const audioElement = document.getElementById('audioPlayback');
    audioElement.src = audioURL;
    audioElement.play();
}

// 오디오 및 텍스트 데이터를 전송하는 함수
function sendAudioData(wavBlob) {
    const formData = new FormData();

    // WAV 파일 추가
    formData.append('audio_data', wavBlob);

    // 입력된 텍스트 추가
    const textInput = document.getElementById('textInput').value;
    formData.append('reftext', textInput);

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

// AJAX 성공 처리 함수
function handleSuccess(response) {
    const objectText = JSON.stringify(response, null, 2);
    document.getElementById('textOUT').value = objectText;
}

// AJAX 실패 처리 함수
function handleError(xhr, status, error) {
    console.error("Error:", error);
}