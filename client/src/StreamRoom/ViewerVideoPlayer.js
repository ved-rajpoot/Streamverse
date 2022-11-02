import { Player, ControlBar, LoadingSpinner, BigPlayButton,VolumeMenuButton, Shortcut,TimeDivider  } from 'video-react';
import { useLocation } from "react-router-dom"


const ViewerVideoPlayer = () => {
    const shortCut = [{ keyCode: 32, ctrl: false, handle: () => { } }, { keyCode: 75, ctrl: false, handle: () => { } }, { keyCode: 39, ctrl: false, handle: () => { } }, { keyCode: 37, ctrl: false, handle: () => { } }, { keyCode: 74, ctrl: false, handle: () => { } }, { keyCode: 76, ctrl: false, handle: () => { } }, { keyCode: 35, ctrl: false, handle: () => { } }, { keyCode: 36, ctrl: false, handle: () => { } },]

    const location = useLocation();
    return (
        <div>
            <div className="flex object-cover h-[40rem] w-full">
                <Player src={location.state.props.url} fluid={false} height="100%" width="100%" autoPlay={true} >
                    <Shortcut clickable={false} shortcuts={shortCut} />
                    <LoadingSpinner />
                    <BigPlayButton position='center' />
                    <ControlBar disableDefaultControls >
                        <VolumeMenuButton />
                        <TimeDivider order={4.2} />
                        <CurrentTimeDisplay order={4.1} />
                    </ControlBar>
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

export default ViewerVideoPlayer
