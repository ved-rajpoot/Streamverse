import { Player,ControlBar,LoadingSpinner,BigPlayButton,ReplayControl,ForwardControl,CurrentTimeDisplay,TimeDivider,PlaybackRateMenuButton,VolumeMenuButton } from 'video-react';
import { useLocation } from "react-router-dom"


const AdminVideoPlayer = () => {


    const location = useLocation();
    return (
        <div>
            <div className="flex object-cover h-[40rem] w-full">
                <Player fluid={false} height="100%" width="100%">
                    <BigPlayButton position="center" />
                    <LoadingSpinner />
                    <ControlBar>
                        <ReplayControl seconds={10} order={1.1} />
                        <ForwardControl seconds={10} order={1.2} />
                        <CurrentTimeDisplay order={4.1} />
                        <TimeDivider order={4.2} />
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                        <VolumeMenuButton />
                    </ControlBar>
                    <source src={location.state.props.url} type="video/webm" />
                </Player>
                
            </div>
            <div className='m-3 text-2xl font-bold'>
                {location.state.props.title}
            </div>

            <div className='m-3 text-sm'>
                {location.state.props.description}
            </div>
        </div>
    )
}

export default AdminVideoPlayer
