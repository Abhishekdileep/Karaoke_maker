from flask import Flask, Response

app = Flask(__name__)


@app.route("/wav")
def streamwav():
    def generate():
        with open("out/mdx_extra_q/a-trimmed/vocals.wav", "rb") as fwav:
            data = fwav.read(1024)
            while data:
                yield data
                data = fwav.read(1024)
    return Response(generate(), mimetype="audio/x-wav")


@app.route("/ogg")
def streamogg():
    def generate():
        with open("out/mdx_extra_q/a-trimmed/.ogg", "rb") as fogg:
            data = fogg.read(1024)
            while data:
                yield data
                data = fogg.read(1024)
    return Response(generate(), mimetype="audio/ogg")

if __name__ == "__main__":
    app.run(debug=True)