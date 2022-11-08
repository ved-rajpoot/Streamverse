import { useNavigate } from "react-router-dom";

export default function VideoCard(props) {
    const navigate = useNavigate();
    const {id, videoPath,thumbnailPath,title,description, userName,tags} = props;
    return (
      <>
        <div class="rounded overflow-hidden shadow-lg mx-4 my-4 cursor-pointer" style={{width:'21rem', height:'21rem'}} onClick={()=>{ navigate(`/dashboard/${id}`, {state: {props:{id, videoPath,thumbnailPath,description,title}}})}}>
          <img class="h-48 w-full" src={`http://localhost:9002/file/image/${thumbnailPath}`} alt="Sunset in the mountains"/>
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-1">{title}</div>
            <p class="text-gray-700 text-base">
              {userName}
            </p>
          </div>
          <div class="px-6 pt-4 pb-2 overflow-x-auto">
            {
              tags.length!==1 && tags.map((tag,idx)=>{
              return (
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{tag}</span>
              )
              })
            }
          </div>
      </div>
    </>
    );
}