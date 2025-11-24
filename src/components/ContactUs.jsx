import footerImage from "../assets/KPDH-Footer.png";

export default function ContactUs (props) {
    return <div>
        <h1 className="pageTitle">Contact Us!</h1>
        <div className="infoCard">
            <p>Curious about future events? Have accessibility concerns? Interested in leadership?</p>
            <p>We're here to help with any questions or concerns!</p>
            <p>Feel free to reach out via email or the club Discord.</p>
            <p><a href="mailto:kpopdemonhunters-club-leadership@office365.wisc.edu">kpopdemonhunters-club-leadership@office365.wisc.edu</a></p>
            <p><a href="https://discord.gg/HHbv3AZNSY">https://discord.gg/HHbv3AZNSY</a></p>
        </div>
        <img src={footerImage} alt="Footer Image with Zoey, Rumi, and Mira gazing upwards" style={{ width: "60%", height: "auto" }} />
    </div>
}