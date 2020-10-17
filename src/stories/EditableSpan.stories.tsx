import React from 'react';
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";


export default {
    title: 'TodoLists/EditableSpan',
    component: EditableSpan,
}

export const EditableSpanExample = (props: any) => {
    return (<EditableSpan
        value={'Start'}
        saveNewTitle={action(" Clicked EditableSpan")}
    />)
}