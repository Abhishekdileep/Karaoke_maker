from mutagen.wave import WAVE
def audio_duration(length):
    hours = length // 3600  # calculate in hours
    length %= 3600
    mins = length // 60  # calculate in minutes
    length %= 60
    seconds = length  # calculate in seconds
  
    return hours, mins, seconds  # returns the duration
  

  
# contains all the metadata about the wavpack file
def audio_len(file_name):
    audio = WAVE(file_name)
    audio_info = audio.info
    length = int(audio_info.length)
    hours, mins, seconds = audio_duration(length)
# print('Total Duration: {}:{}:{}'.format(hours, mins, seconds))