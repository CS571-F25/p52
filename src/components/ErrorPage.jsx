import {Link} from "react-router";
import Demons from "../assets/demons.png";

export default function ErrorPage(props) {

    // TODO: add link back to home page
    // TODO: add funny blurb about the Honmoon not working

    return <div>
        <h1 className="pageTitle">404 Error</h1>
        <div className="infoCard">
            Uh oh! Demons are trying to stop you from sealing the Honmoon.
            <br/><br/>
            Quick, return <Link to="/">home</Link>.
            <img src={Demons} alt="A group of demons trying to block your path." style={{maxWidth: "100%", marginTop: "20px"}}/>
        </div>

    </div>
}