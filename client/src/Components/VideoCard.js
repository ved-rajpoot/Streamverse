import { Card, CardHeader, CardBody, CardFooter, Typography,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function VideoCard(props) {
    const navigate = useNavigate();
    const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    return (
      <Card className="w-80 mx-2 my-8 border-gray-300 border-b-2 hover:bg-gray-100 duration-100 cursor-pointer" onClick={()=>{console.log('clickked'); navigate(`/dashboard/${cloudinary_id}`, {state: {props:{id, avatar,description,title}}})}}>
        <CardHeader color="blue" className="relative h-48">
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
      </Card>
    );
}