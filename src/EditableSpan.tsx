import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

// функция позволяющая переименовывать name
export const EditableSpan = React.memo((props: PropsType) => {

    let [editaMode, setEditMode] = useState<boolean>(false);

    let [title, setTitle] = useState<string>(props.title)

    function activateEditaMode() {
        setEditMode(true)
        // setTitle(props.title)
    }

    function deActivateEditaMode() {
        setEditMode(false)
        props.saveNewTitle(title) //как только закончили ввод, хотим новое значение сетнуть в app
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
    }

    return editaMode
        ? <TextField
            variant={"outlined"}
            value={title}
            onBlur={deActivateEditaMode}
            autoFocus={true}
            onChange={changeTitle}/>
        /*? <input value={title} onBlur={deActivateEditaMode} autoFocus={true} onChange={changeTitle}/>*/
        : <span onDoubleClick={activateEditaMode}>{props.title}</span>
})