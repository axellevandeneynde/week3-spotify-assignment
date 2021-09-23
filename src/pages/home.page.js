import { Redirect } from "react-router";
import { useRecoilValue } from "recoil";
import AddSong from "../components/addSong.component";
import CreateUser from "../components/createUser.component";
import Playlist from "../components/playlist.component";
import { userAtom } from "../store/store";

function HomePage() {
    const user = useRecoilValue(userAtom);

    return (
        <div className="section is-medium level">
            <div className="block">
            <h2 className="title is-2">Hi {user.name}</h2>
            <AddSong/>
            </div>
            {user.role === 'owner' &&
            <CreateUser/>
            }
            <Playlist/>
        { user.name === undefined &&
        <Redirect to="/login"/>
    }
    </div>
    )

}

export default HomePage