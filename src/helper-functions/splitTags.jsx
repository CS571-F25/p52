// converts string with <br>, <em>, and <a> tags to JSX elements
export default function splitTags(description) {
    if (typeof description !== 'string') return description;
    
    // First split by <br> tags
    const brRegex = /(<br\s*\/?>)/gi;
    const brParts = description.split(brRegex);
    
    return brParts.map((part, brIndex) => {
        if (!part) return null;
        if (part.match(/^<br\s*\/?>$/i)) {
            return <br key={`br-${brIndex}`} />;
        }
        
        // Then split by <em> tags within each part
        const emRegex = /(<em>.*?<\/em>)/g;
        const emParts = part.split(emRegex);
        
        return emParts.map((emPart, emIndex) => {
            if (!emPart) return null;
            if (emPart.startsWith("<em>") && emPart.endsWith("</em>")) {
                const emContent = emPart.slice(4, -5);
                return <em key={`${brIndex}-em-${emIndex}`}>{processLinks(emContent, `${brIndex}-em-${emIndex}`)}</em>;
            }
            
            // Process <a> tags in regular text
            return processLinks(emPart, `${brIndex}-span-${emIndex}`);
        });
    });
}

// Helper function to process <a> tags
function processLinks(text, keyPrefix) {
    const linkRegex = /(<a\s+href=['"]([^'"]+)['"][^>]*>)(.*?)(<\/a>)/gi;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(text)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
            parts.push(<span key={`${keyPrefix}-text-${lastIndex}`}>{text.substring(lastIndex, match.index)}</span>);
        }
        
        // Add the link
        const href = match[2];
        const linkText = match[3];
        parts.push(<a key={`${keyPrefix}-link-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">{linkText}</a>);
        
        lastIndex = linkRegex.lastIndex;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
        parts.push(<span key={`${keyPrefix}-text-${lastIndex}`}>{text.substring(lastIndex)}</span>);
    }
    
    return parts.length > 0 ? parts : <span key={keyPrefix}>{text}</span>;
}