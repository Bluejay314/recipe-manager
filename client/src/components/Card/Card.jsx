import "./Card.css";

export function Card({title, image}) {
    return (
        <div className="card">
            <img className="card__image" src={image}/>
            <span className="card__title">{title}</span>
        </div>
    )
}