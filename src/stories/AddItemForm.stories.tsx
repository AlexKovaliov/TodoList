import React from 'react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoLists/AddItemForm',
    component: AddItemForm,
}

export const AddItemFormExample = (props: any) => {
    console.log("AddItemFormExample")
    return (<AddItemForm
        addItem={action('Clicked')}
    />)
}