from lyricsgenius import Genius

token = "Your secret token for genius.com "
def find_lyrics(song_name , artist=""):
    genius = Genius(token)
    artist = genius.search_song(song_name+" {}".format(artist))
    return artist.lyrics