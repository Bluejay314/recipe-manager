const defaultCategories = [
    "entree",
    "breakfast",
    "dinner",
    "dessert",
    "snack"
];

const defaultTags = [
    "beef",
    "chicken",
    "pork",
    "sweet",
    "savoury",
    "salty",
    "sour",
    "drink",
    "food"
];

export function SideBar() {
    return (
        <aside className="sideBar">
            <SideBarSection title="Categories" items={defaultCategories} />
            <SideBarSection title="Tags" items={defaultTags} />
        </aside>
    )
}

function SideBarSection({ title , items}) {

    const itemElements = items.map(item => (
        <span className="sideBarSection_item">
            {item.replace(item.charAt(0), item.charAt(0).toUpperCase())}
        </span>
    ));

    return (
        <div className="sideBarSection">
            <span className="sideBarSection_title">{title}</span>
            {itemElements}
        </div>
    )
}