export default function ErrorPage(props) {

    // TODO: add link back to home page
    // TODO: add funny blurb about the Honmoon not working

    return <div>
        <h1 className="pageTitle">404 Error</h1>
        <div className="infoCard">
            Uh oh! Demons are trying to stop you from sealing the Honmoon.
            <br/><br/>
            Quick, return <a href="/">home</a>.
        </div>
    </div>
}