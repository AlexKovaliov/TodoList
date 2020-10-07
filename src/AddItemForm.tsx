import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [newItemName, setItemName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    // функция которая обрабатывает onChange
    function onItemNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setItemName(event.currentTarget.value);
        setError(null)
    }

    function onAddItemKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (error !== null) {
            setError(null)
        }
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
            <TextField
                size={"small"}
                variant={"outlined"}
                value={newItemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                /*className={error ? "error" : ""}*/
                error={!!error}
                label={"Set a goal - achieve it!"}
                helperText={error}
            />
            {/*<input
                type="text"
                value={newItemName}
                onChange={onItemNameChanged}
                onKeyPress={onAddItemKeyPressed}
                className={error ? "error" : ""} //тернарный оператор
            />*/}
            {/*<button style={{cursor: "pointer"}} onClick={addItem}>Add</button>*/}
            <IconButton onClick={addItem} color={"primary"}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        </div>
    )
})