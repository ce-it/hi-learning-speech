
from flask import Blueprint, render_template, request, jsonify
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient, ContentSettings


import io
import os
import uuid
from io import BytesIO
from werkzeug.utils import secure_filename
from azure.identity import DefaultAzureCredential


bp = Blueprint('portfolio', __name__, url_prefix='/portfolio')

from pydub import AudioSegment
from pydub.playback import play

SOURCE_FILE = 'SampleSource.txt'
DEST_FILE = 'BlockDestination.txt'

connection_string ="Zu0b39wpkf8DmdOQ+COVtKFDc5WPtvL1X/LBaorb2ELRjkX4iJmY5NEJK4teWYI/BdTMwmXgbjxh+ASt9kBI1w=="
blob_service_client = BlobServiceClient.from_connection_string("DefaultEndpointsProtocol=https;AccountName=msdocsstoragefunction083;AccountKey=Zu0b39wpkf8DmdOQ+COVtKFDc5WPtvL1X/LBaorb2ELRjkX4iJmY5NEJK4teWYI/BdTMwmXgbjxh+ASt9kBI1w==;EndpointSuffix=core.windows.net")
container_name="outputfile"



@bp.route('/sendstorage', methods=["POST"])
def sendstorage():

    f = request.files['audio_data']

    sound = AudioSegment.from_wav(f)
    audio_data =sound.export("bb.mp3", format="mp3")

    #play(sound)
    #pass
    print(audio_data)
    return audio_data



@bp.route('/upload', methods=["POST"])
def upload():
    # Create a local directory to hold blob data
    local_path = "./data"
    os.mkdir(local_path)

    # Create a file in the local data directory to upload and download
    local_file_name = str(uuid.uuid4()) + ".txt"
    upload_file_path = os.path.join(local_path, local_file_name)

    # Write text to the file
    file = open(file=upload_file_path, mode='w')
    file.write("Hello, World!")
    file.close()

    # Create a blob client using the local file name as the name for the blob
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=local_file_name)

    print("\nUploading to Azure Storage as blob:\n\t" + local_file_name)

    # Upload the created file
    with open(file=upload_file_path, mode="rb") as data:
        blob_client.upload_blob(data)

    print(blob_client.url)
    return blob_client.url

@bp.route('/audioupload', methods=["POST"])
def audioupload():
    # Create a local directory to hold blob data
    f = request.files['audio_data']
    reftext = request.form.get("reftext")

    data=f

    local_file_name = str(uuid.uuid4()) + ".wav"

    blob_client = blob_service_client.get_blob_client(container=container_name, blob=local_file_name)

    blob_client.upload_blob(data,blob_type="BlockBlob")

    print(blob_client.url)
    returnData = {'result': 'OK', 'filename': blob_client.url}

    return returnData

@bp.route('/mp3upload', methods=["POST"])
def mp3upload():
    # Create a local directory to hold blob data
    f = request.files['audio_data']
    reftext = request.form.get("reftext")

    sound = AudioSegment.from_wav(f)
    #sound = AudioSegment.from_mp3(f)   // 이 부분은 영원히 삭제 원함

    # MP3로 변환하되, 파일로 저장하지 않고 메모리 버퍼(BytesIO)에 저장
    mp3_buffer = BytesIO()
    sound.export(mp3_buffer, format="mp3")
    mp3_buffer.seek(0)  # 버퍼의 시작 위치로 이동

    #file_name = str(uuid.uuid4()) + ".mp3"  // 임시적으로 처리
    #audio_data =sound.export(file_name, format="mp3")   // 임시적으로 처리

    #data=audio_data       // 임시적으로 처리

    local_file_name = str(uuid.uuid4()) + ".mp3"
    blob_client = blob_service_client.get_blob_client(container=container_name, blob=local_file_name)
    my_content_settings = ContentSettings(content_type='audio/mpeg')
    #blob_client.upload_blob(data,blob_type="BlockBlob", content_settings=my_content_settings)
    blob_client.upload_blob(mp3_buffer, blob_type="BlockBlob", content_settings=my_content_settings)
    returnData = {'result': 'OK', 'filename': blob_client.url}

    #if os.path.isfile(file_name): os.remove(file_name)

    return returnData

@bp.route('/mp3Multiple', methods=["POST"])
def mp3MultipleUpload():
    try:
        # 다중 파일 처리
        file_count = int(request.form['count'])  # 클라이언트에서 보낸 파일 개수
        audio_segments = []

        # WAV 파일 로드
        for i in range(file_count):
            file_key = f"audio{i + 1}"
            audio_file = request.files[file_key]
            segment = AudioSegment.from_wav(audio_file)
            audio_segments.append(segment)

        # WAV 파일 병합
        merged_audio = sum(audio_segments)

        # 병합된 WAV를 BytesIO에 export
        wav_buffer = BytesIO()
        merged_audio.export(wav_buffer, format="wav")
        wav_buffer.seek(0)  # 버퍼 포인터를 처음으로 되돌림

        # MP3로 변환
        mp3_buffer = BytesIO()
        merged_audio.export(mp3_buffer, format="mp3")
        mp3_buffer.seek(0)

        # Azure Storage에 업로드
        merged_mp3_blob_name = f"merged_{uuid.uuid4()}.mp3"
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=merged_mp3_blob_name)
        my_content_settings = ContentSettings(content_type='audio/mpeg')
        blob_client.upload_blob(mp3_buffer, blob_type="BlockBlob", content_settings=my_content_settings)

        returnData = {
            'result': 'OK',
            'filename': blob_client.url
        }


        return jsonify(returnData)

    except Exception as e:
        print("Error details:", e)
        return jsonify({'result': 'ERROR', 'message': str(e)}), 500

@bp.route('/pngupload', methods=["POST"])
def pngupload():

    ff = request.files['Filedata']
    filename=ff.filename

    imgfile=ff.save(secure_filename(filename))
    #data=imgfile

    local_file_name = str(uuid.uuid4()) + ".png"
    print("**local_file_name: " , local_file_name)
    print("imgfile: " , imgfile)
    print("=================================================================================")

    blob_client = blob_service_client.get_blob_client(container=container_name, blob=local_file_name)
    my_content_settings = ContentSettings(content_type='image/png')
    with open(filename, "rb") as data:
        blob_client.upload_blob(data, blob_type="BlockBlob", content_settings=my_content_settings)

    returnData = {'result': 'OK', 'filename': blob_client.url}
    print(returnData)
    if os.path.isfile(filename): os.remove(filename)
    return returnData