import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { playlistAtom } from "../store/store"

function Playlist(){
    const [playlist, setPlaylist] = useRecoilState(playlistAtom)

    useEffect(() => {
    if(playlist.length === 0){
        fetch('http://127.0.0.1:5000/playlist')
        .then(res => res.json())
        .then(data =>  setPlaylist(data))
    }
})

    const playlistItems = playlist.map((item) => <tr>
        <td>{item.song}</td>
        <td>{item.album}</td>
        <td>{item.artist}</td>
    </tr> )
    return (
        <div className="block level-right">
        <div className="block">
            <div className="block">
        <h3 className="title is-3 block">Family playlist</h3>
            <table className="table box block">
                <tr>
                    <th>song</th>
                    <th>album</th>
                    <th>artist</th>
                </tr>
            {playlistItems}
            </table>
        </div>
        </div>
        </div>
    )
}

export default Playlist