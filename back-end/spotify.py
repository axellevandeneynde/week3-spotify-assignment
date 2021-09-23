from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# ______ Users _______

users = []
this_user = {}

# Make a function that opens users.json 
def open_users():
    with open('users.json') as json_file:
        data = json.load(json_file)
        return data

# Make a function that saves users.json
def saveUsers():
    with open("users.json", "w") as outfile:
        json.dump(users, outfile)
        
# Make a function where a user can log in 
def log_in_user(username, password):
    global users 
    users = open_users()
    for user in users:
        if user['name'] == username and user['password'] == password:
                global this_user 
                this_user = user
                return True
    return False

# Make a function where a user with the role "owner" can add a new user with the role "family member". The owner has to be logged in to do this.
def create_new_user(username, password):
    if this_user['role'] == 'owner':
        users.append({
        "name": username,
        "password": password,
        "role": "member"
        })
        saveUsers()
        return 'new user created'
    return 'Something went wrong'

# Make a function that counts the number of users and prints it
def number_of_users():
    users = open_users()
    number = len(users)
    print(number)

# user routes
@app.route('/create_new_user', methods=['POST'])
def create_user():
    req_data = request.get_json()
    response = create_new_user(req_data['name'], req_data['password'])
    return json.dumps({"status": response})

@app.route('/log_in', methods=['POST'])
def log_in():
    req_data = request.get_json()
    log_in_successfull = log_in_user(req_data['user_name'], req_data['password'])
    if log_in_successfull:
        return json.dumps(this_user)
    else:
        return json.dumps({})

#______ Playlist _______

playlist = []

def addSong(artist, album, song):
    newSong = {"artist": artist, "album": album, "song": song}
    playlist.append(newSong)

def numberOfSongs():
    number = len(playlist)
    return number

def showPlaylist():
    for s in playlist:
        print(s["song"], "by", s["artist"],"found on",s["album"])

def playSong(songtitle):
    for s in playlist:
        if(songtitle == s["song"]):
            print("Currently playing", s["song"],"by",s["artist"])

def openPlaylist():
    with open("songs.json") as json_file:
        data = json.load(json_file)
        return data

def savePlaylist():
    with open("songs.json", "w") as outfile:
        json.dump(playlist, outfile)

# playlist routes

@app.route('/playlist', methods=['GET'])
def get_playlist():
    global playlist 
    playlist = openPlaylist()
    return json.dumps(playlist)

# Make a function where a user can add a song to the playlist. The user has to be logged in.
@app.route('/add_song_to_playlist', methods=['POST'])
def add_song():
    req_data = request.get_json()
    playlist = openPlaylist()
    if this_user:
        addSong(req_data['artist'], req_data['album'], req_data['song'])
    savePlaylist()
    openPlaylist()
    return json.dumps(playlist)



app.run()