export default function Video({ src }) {
    return (
        <iframe
            src={src}
            title="YouTube video player"
            style={{ width: '75%', aspectRatio: '16/9', border: 0 }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        />
    )
}