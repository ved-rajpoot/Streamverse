import { Card, CardHeader, CardBody, CardFooter, Typography,} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";

export default function AdminVideoCard(props) {
    const [display,setDisplay] = useState(1);
    const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    
    const deleteVideo = () => {
      axios.post("http://localhost:9002/admin/deleteVideo",{id:id})
      .then((res) => {
          console.log(res.data)
      })
      .catch((err) => {
          console.log(err)
      })
      setDisplay(0);
    }

    if(display)
      return (
        <Card className="w-80 h-fit mx-2 my-8 border-gray-300 border-b-2 hover:bg-gray-100 duration-100 cursor-pointer">
          <CardHeader color="blue" className="h-48">
            <img
              src={thumbnail_avatar}
              alt="img-blur-shadow"
              className="h-full w-full"
            />
          </CardHeader>
          <CardBody className="p-2">
            <Typography variant="h5" className="text-2xl break-all">
              {title}
            </Typography>
            <Typography variant="small" className="text-sm text-gray-500">{userName}</Typography>
          </CardBody>
          <button onClick={deleteVideo} class="bg-red-500 hover:bg-red-700 text-white text-sm w-fit p-1 relative left-[80%] rounded">
              DELETE
          </button>
        </Card>
      );
    else return <></>
}