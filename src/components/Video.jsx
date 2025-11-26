export default function Video({ src }) {
    return (
        <>
            {/* iframe visible on md+ */}
            <div className="d-none d-md-block">
                <iframe
                    src={src}
                    title="YouTube video player"
                    style={{ width: '75%', aspectRatio: '16/9', border: 0 }}
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
            {/* link visible on sm */}
            <div className="d-block d-md-none">
                <a href={src}>{src}</a>
            </div>
        </>
    )
}