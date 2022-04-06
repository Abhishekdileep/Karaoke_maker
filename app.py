import os
from flask import Flask , redirect, url_for, render_template, request, session , Response


app = Flask(__name__)
uploads_dir = os.path.join(app.instance_path, 'uploads')

try: 
  os.makedirs(uploads_dir)
  os.makedirs("out")
except :
  print("file already exisits")

@app.route('/upload' , methods=['POST'] )
def upload():
  if request.method == "POST":
    x = "Hello, World!"
    if request.files :      
      file= request.files['file']
      path = os.path.join(uploads_dir, file.filename)
      file.save(path)
      # write('test.wav', audio[0], audio[1])
      os.system("python3 -m demucs.separate --two-stems=vocals -d cpu {} -o out".format(path)) 
      print("Completed")
      return {
      'filename' : file.filename.split('.')[0],
      'filePath' : path
      }
    else : 
      x = x + "Add file empty"
      return x
@app.route("/wav/<path:path>" , methods=['GET'])
def streamwav(path):
    args = request.args.get("type")
    def generate():
        with open("out/mdx_extra_q/{}/{}.wav".format(path, args), "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")


if __name__ == "__main__":
  app.run(host='127.0.0.1',port=5000,debug=True)

# def inference(audio):
#   write('test.wav', audio[0], audio[1])
#   os.system("python3 -m demucs.separate -n mdx_extra_q -d cpu test.wav -o out")
#   return "./out/mdx_extra_q/test/vocals.wav","./out/mdx_extra_q/test/bass.wav",\
#   "./out/mdx_extra_q/test/drums.wav","./out/mdx_extra_q/test/other.wav"