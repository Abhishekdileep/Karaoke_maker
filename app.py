import os
from flask import Flask, flash , redirect, send_file, render_template, request, session , Response
from flask_cors import cross_origin
import librosa
import math
from Speech_test import find_lyrics

from sqlalchemy import true
app = Flask(__name__)
uploads_dir = os.path.join(app.instance_path, 'uploads')

try: 
  os.makedirs(uploads_dir)
  os.makedirs("out")
except :
  print("file already exisits")

@app.route('/upload' , methods=['POST'] )
@cross_origin()
def upload():
  if request.method == "POST":
    x="Hello , World "
    if request.files and request.form :      
      file= request.files['file']
      song_name =  request.form['song_name'] 
      artist = request.form['artist']
      filename = file.filename.replace(" " , "_")
      path = os.path.join(uploads_dir, filename)
      file.save(path)
      # write('test.wav', audio[0], audio[1])
      os.system("python -m demucs.separate --two-stems=vocals -d cpu {} -o out".format(path)) 
      lyrics = find_lyrics(song_name=song_name , artist=artist)
      print("Completed")
      return {
      'filename' : filename.replace('.mp3', '').replace('.wav' , '').replace('.mpeg' , ''),
      'filePath' : path , 
      'lyrics' : lyrics
      }
    else : 
      x = x + " Add file empty"
      return x

      
@app.route("/meta/<path:path>")
@cross_origin()
def metadata(path):
  args = request.args.get("type")
  song = "out/mdx_extra_q/{}/{}.wav".format(path, args)
  duration =  librosa.get_duration(filename=song)
  return {
    "duration" : math.ceil(duration)
  }

@app.route("/stream/<path:path>")
@cross_origin()
def stream(path):
    args = request.args.get("type")
    try :
      def generate():
        with open("out/mdx_extra_q/{}/{}.wav".format(path, args), "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
      return Response(generate(), mimetype="audio/wav")
    except :
      return Response("Internal Server error ", mimetype="text/raw")

# def generateAudio():
#   """Audio streaming generator function."""
  
#   data_to_stream = genHeader(44100, 32, 1, 200000) + currChunk
#   yield data_to_stream

#     # with open("signals/audio.wav", "rb") as fwav:
#     #     data = fwav.read(1024)
#     #     while data:
#     #         yield data
#     #         data = fwav.read(1024)


def genHeader(sampleRate, bitsPerSample, channels, samples , duration):
    datasize = samples * channels * bitsPerSample // 8
    o = bytes("RIFF",'ascii')                                               # (4byte) Marks file as RIFF
    o += (datasize + 36).to_bytes(4,'little')                               # (4byte) File size in bytes excluding this and RIFF marker
    o += bytes("WAVE",'ascii')                                              # (4byte) File type
    o += bytes("fmt ",'ascii')                                              # (4byte) Format Chunk Marker
    o += (16).to_bytes(4,'little')                                          # (4byte) Length of above format data
    o += (1).to_bytes(2,'little')                                           # (2byte) Format type (1 - PCM)
    o += (channels).to_bytes(2,'little')                                    # (2byte)
    o += (sampleRate).to_bytes(4,'little')                                  # (4byte)
    o += (sampleRate * channels * bitsPerSample // 8).to_bytes(4,'little')  # (4byte)
    o += (channels * bitsPerSample // 8).to_bytes(2,'little')               # (2byte)
    o += (bitsPerSample).to_bytes(2,'little')                               # (2byte)
    o += bytes("data",'ascii')                                              # (4byte) Data Chunk Marker
    o += (datasize).to_bytes(4,'little')                                    # (4byte) Data size in bytes
    o += bytes("duration" , 'ascii')
    o += (math.ceil(duration)).to_bytes(4 , 'little')
    return o

      
#read the file byte by byte 
# 20-30 millisec frame sec 1024/44100 - 44100 for 1 sec , frame length , 20 millisec - num_samples =  frame_length * sampl_rate / 1000 
# use ciel func 

@app.route("/download/<path:path>" , methods=['GET'])
@cross_origin()
def download(path):
  args = request.args.get("type")
  path = "out/mdx_extra_q/{}/{}.wav".format(path, args)
  return send_file(path, as_attachment=True)

if __name__ == "__main__":
  app.run(host='127.0.0.1',port=5000,debug=True , secret_key="A1B2C3D4")

# def inference(audio):
#   write('test.wav', audio[0], audio[1])
#   os.system("python3 -m demucs.separate -n mdx_extra_q -d cpu test.wav -o out")
#   return "./out/mdx_extra_q/test/vocals.wav","./out/mdx_extra_q/test/bass.wav",\
#   "./out/mdx_extra_q/test/drums.wav","./out/mdx_extra_q/test/other.wav"