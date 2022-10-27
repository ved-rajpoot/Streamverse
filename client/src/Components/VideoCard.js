import { useNavigate } from "react-router-dom";

  export default function VideoCard(props) {
  
    const navigate = useNavigate();
    const {avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    return (
      <div className="w-96 mx-10 my-10 border-gray-200 border-b-4 rounded-xl flex flex-wrap cursor-pointer" onClick={()=>{console.log('clickked'); navigate(`/dashboard/${cloudinary_id}`, {state: {props:{avatar,description,title}}})}}>
        <div color="blue" className="relative h-56">
          <img
            src={thumbnail_avatar}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </div>
        <div className="ml-2 my-2">
          <h1 className="mt-2 text-4xl">
            {title}
          </h1>
          <h3 className="text-md mt-1">{userName}</h3>
        </div>
      </div>
    );
  }