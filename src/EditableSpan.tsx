import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    saveNewTitle: (newTitle: string) => void
}

// функция позволяющая переименовывать name
export function EditableSpan(props: PropsType) {

    let [editeMode, setEditMode] = useState<boolean>(false);

    let [title, setTitle] = useState<string>(props.title)

    function activateEditeMode() {
        setEditMode(true)
        // setTitle(props.title)
    }

    function deActivateEditeMode() {
        setEditMode(false)
        props.saveNewTitle(title) //как только закончили ввод, хотим новое значение сетнуть в app
    }

    function changeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.currentTarget.value)
    }

    return editeMode
        ? <input value={title} onBlur={deActivateEditeMode} autoFocus={true} onChange={changeTitle}/>
        : <span onDoubleClick={activateEditeMode}>{props.title}</span>
}