import "@/styleSheets/BackgroundImage.css";

export default function BackgroundImage({ image, opacity=0, color="black"}) {
    return (
        <div className="backgroundImage">
            <div className="backgroundImage__image" style={{
                backgroundImage: `url(${image})`
            }}/>
            <div className="backgroundImage__overlay" style={{
                backgroundColor: color,
                opacity: opacity
            }}/>
        </div>
    )
}