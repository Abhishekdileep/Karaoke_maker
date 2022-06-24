import librosa
import librosa.display
import matplotlib.pyplot as plt 
import os 
def generate_png(file_name):
    vocals , sr= librosa.load(file_name)
    plt.figure(figsize=(15, 17))

    plt.subplot(3, 1, 1)
    # librosa.display.waveplot(vocals, alpha=0.5)
    librosa.display.waveshow(vocals, alpha=0.5)
    plt.ylim((-1, 1))
    plt.title(file_name)
    
    plt.savefig('no_vocals.png' ,dpi=150)

if __name__ == "__main__":
    path = '{}/out/mdx_extra_q/a-trimmed/no_vocals.wav'.format(os.getcwd()).replace("/" , "\\")
    generate_png(path)