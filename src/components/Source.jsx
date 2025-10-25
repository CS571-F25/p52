export default function Source(props) {

    // if there is an author, list them and add a period after the name
    // not every source has an author!
    let author = props.author ?? ""
    if (author.length) {
        author = author + ".";
    }

    // title should be formatted like: "Title."
    const title = `"${props.title}."`;

    // website is formatted like: Website,
    // will be italicized
    const website = props.website + ",";

    // publisher (may not be provided!) is formatted like: Publisher,
    // no italicization or quotes
    let publisher = props.publisher ?? "";
    if (props.publisher) {
        publisher = publisher + ","
    }

    // date (may not be provided!)
    const date = props.date ?? "";

    // link
    const link = props.link;

    // accessed at (only provided if no publishing date is given)
    let accessed = props.accessed ?? "";
    if (accessed) {
        accessed = `Accessed ${accessed}.`;
    }

    
    return <div>
        <p>{author} {title} <em>{website}</em> {publisher} <a href={link}>{link}</a>. {accessed}</p>
    </div>
}