import { Card, CardHeader, CardBody, CardFooter, Typography,} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

  export default function VideoCard(props) {
  
    const navigate = useNavigate();
    const {id, avatar,thumbnail_avatar,title,description, cloudinary_id, userName} = props;
    return (
      <Card className="w-96 mx-10 my-10" onClick={()=>{console.log('clickked'); navigate(`/dashboard/${cloudinary_id}`, {state: {props:{id, avatar,description,title}}})}}>
        <CardHeader color="blue" className="relative h-56">
          <img
            src={thumbnail_avatar}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {title}
          </Typography>
          <Typography>
            The place is close to Barceloneta Beach and bus stop just 2 min by
            walk and near to "Naviglio" where you can enjoy the main night life in
            Barcelona.
          </Typography>
        </CardBody>

        <CardFooter divider className="flex items-center justify-between py-3">
          <Typography variant="small">{userName}</Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
            {userName}
          </Typography>
        </CardFooter>
      </Card>
    );
  }