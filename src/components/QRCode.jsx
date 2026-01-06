export default function QRCode(props) {
    return <div style={{whiteSpace: "pre-wrap"}}>
        <h3>{props.title}</h3>
        {
            // lines describing the QR code's purpose
            props.lines ? 
            <p>
                {
                    props.lines.map((line, index) => {
                        // use <br/> for all but the last line
                        if (index === props.lines.length - 1) {
                            return <span key={index}>{line}</span>
                        } else {
                            return <span key={index}>{line}<br/></span>;
                        }
                    })
                }
            </p>
            : <></>
        }
        {/* The QR Code itself and the link */}
        <img src={props.Qr} alt={props.QRalt} style={{ width: props.imgWidth, height: "auto" }}/>
        <br/>
        <a href={props.link}>{props.link}</a>
    </div>
}