export default function QRCode(props) {
    return <div style={{whiteSpace: "pre-wrap"}}>
        <h3>{props.title}</h3>
        {
            props.lines ? 
            <p>
                {
                    props.lines.map((line, index) => {
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
        <img src={props.Qr} alt={props.QRalt} style={{ width: props.imgWidth, height: "auto" }}/>
        <br/>
        <a href={props.link}>{props.link}</a>
    </div>
}