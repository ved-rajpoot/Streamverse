import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function VideoCard(props) {
  const navigate = useNavigate();
  const [userState, setUserState] = useContext(UserContext);
    const {id, videoPath,thumbnailPath,title,description, userName,tags, views, userId} = props;
    return (
      <>
  <div class="w-64 m-4 cursor-pointer" onClick={() => { navigate(`/app/${userState.userId}/dashboard/video/${id}`, { state: { props: { id, videoPath, thumbnailPath, description, title, tags, views,userName,userId} } }) }}>
          <div class="h-36 w-full rounded-lg shadow-md dark:shadow-black">
            <img class="w-64 h-36" src={`http://localhost:9002/file/image/${thumbnailPath}`} alt="" />
          </div>
          <div class="mt-3 flex items-start space-x-2">
            <div class="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden bg-white">
              <img src="https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg" alt="" />
            </div>
            <div class="flex flex-col text-md tracking-tighter leading-tight">
              <div class="text-black dark:text-white font-semibold overflow-ellipsis">{title}</div>
              <div class="mt-1 flex items-baseline space-x-1">
                <div class="text-gray-400 text-xs">{userName}</div>
                <div class="w-3 h-3 pt-0.5">
                  <svg viewBox="0 0 24 24" class="text-gray-400" fill="currentColor">
                    <g><path fill-rule="evenodd" clip-rule="evenodd" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10 S17.52,2,12,2z M9.92,17.93l-4.95-4.95l2.05-2.05l2.9,2.9l7.35-7.35l2.05,2.05L9.92,17.93z"></path></g>
                  </svg>
                </div>
              </div>
              <div class="text-gray-400 text-xs">{views} Views</div>
            </div>
          </div>
        </div>
    </>
    );
}