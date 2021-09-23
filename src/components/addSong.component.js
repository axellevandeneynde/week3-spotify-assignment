import { useSetRecoilState } from "recoil";
import { playlistAtom } from "../store/store";
import { Formik, Field, Form} from "formik";

function AddSong(){
    const setPlaylist = useSetRecoilState(playlistAtom)

    function addSongToPlaylist(values){
        fetch('http://127.0.0.1:5000/add_song_to_playlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((res)=> res.json())
            .then(data => setPlaylist(data))
    }

    return(
        <div className="block box">
        <h3 className="title is-4 block">Add song to playlist</h3>
        <Formik
          initialValues={{
            song: '',
            artist: '',
            album: ''
          }}

          onSubmit={async (values, {resetForm}) => {
             addSongToPlaylist(values)
             resetForm({})
          }}

        >
          <Form className="container">
            <div className="field">
            <label>Song</label>
            <div className="control">
            <Field id="song" name="song"/>
            </div>
            </div>
            <div className="field">
            <label>Artist</label>
            <div className="control">
            <Field id="artist" name="artist"/>
            </div>
            </div>
            <div className="field">
            <label>Album</label>
            <div className="control">
            <Field id="album" name="album"/>
            </div>
            </div>
            <button className='button is-primary' type="submit">+  add</button>
          </Form>
        </Formik>
        </div>
    )
}

export default AddSong