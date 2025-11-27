// converts string with <em></em> tag to string with italicized text
export default function splitEmTags(description) {
    const regex = /(<em>.*?<\/em>)/g; // Matches <em>...</em> tags
    const parts = description.split(regex); // Splits the string into parts

    return parts.map((part, index) => {
        if (part.startsWith("<em>") && part.endsWith("</em>")) {
            // Remove the <em> tags and wrap the content in <em>
            return <em key={index}>{part.slice(4, -5)}</em>;
        }
        return <span key={index}>{part}</span>; // Render other parts as plain text
    });
}