import { useNavigate } from "react-router-dom";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

  export default function AudioCard(props) {
  
    const navigate = useNavigate();
    const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    return (
      <>
        <div className="m-1 shadow-xl flex flex-row justify-center w-[90%]">
          <div className="bg-white flex flex-row rounded-b rounded-b-none rounded-r p-2 leading-normal w-full">
          <PlayCircleOutlineIcon className="mr-2"/>
            <div className="mb-2">
              <div className="text-gray-900 font-bold text-sm mb-2 text-left">{title}</div>
            </div>
          </div>
        </div>
      </>
    );
  }