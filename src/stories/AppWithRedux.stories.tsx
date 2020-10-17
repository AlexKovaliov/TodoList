import React from 'react';
import {AppWithRedux} from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TodoLists/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxExample = (props: any) => {
    return (
            <AppWithRedux/>
    )
}