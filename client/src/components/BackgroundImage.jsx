import "@/styleSheets/BackgroundImage.css"
export default function BackgroundImage({ image, opacity=0, color="red"}) {
    return (
        <div className="backgroundImage">
            <div className="backgroundImage__image" style={{
                backgroundImage: image
            }}/>
            <div className="backgroundImage__overlay" style={{
                backgroundColor: color,
                opacity: opacity
            }}/>
        </div>
    )
}
