import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type PropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: PropsType) {

    let [newItemName, setItemName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    // функция которая обрабатывает onChange
    function onItemNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setItemName(event.currentTarget.value);
        setError(null)
    }

    function onAddItemKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            addItem()
        } // event - обьект события
    }

    // функция которая проверяет на пустую строку, выдаёт ошибку
    function addItem() {
        if (newItemName.trim()) {     // проверяем на пустую строку
            props.addItem(newItemName.trim());
            setItemName("");
        } else {
            setError("Title is required! (Write smth)")
        }
    }

    return (
        <div>
            <input
                type="text"
                value={newItemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? "error" : ""} //тернарный оператор
            />
            <button style={{cursor: "pointer"}} onClick={addItem}>Add</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}