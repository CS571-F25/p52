import {useState} from "react";
import {Card} from "react-bootstrap";
import Video from "./Video.jsx";

export default function TutorialCategory(props) {

    const [show, setShow] = useState(false);

    return <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <button className="pink-button" onClick={()=>{setShow(s=>!s)}} style={{marginBottom: 10}}>{show ? `Hide ${props.title}` : `Show ${props.title}`}</button>
        <br/>
        {
          show ?
            <Card style={{border: "3px solid #e30080", alignItems: "center"}}>
                {
                props.videos.map((video) => {
                    // given one video per title
                    if (video.url) {
                        return <div key={video.title} style={{width: "100%", height: "100%"}}>
                            <h4>{video.title}</h4>
                            <Video src={video.url}/>
                            <br/><br/>
                        </div>
                    }
                    // given multiple videos per title
                    if (video.urls) {
                        return <div style={{width: "100%", height: "100%"}}>
                            <h4>{video.title}</h4>
                            {
                                video.urls.map((url) => {
                                    return <div key={url.subtitle} style={{width: "100%", height: "100%"}}>
                                        <div>{url.subtitle}</div>
                                        <Video key={url.subtitle} src={url.url}/>
                                        <br/><br/>
                                    </div>
                                })
                            }
                        </div>
                    }
                })
            }
            </Card>
          : <></>
        }
    </div>
}