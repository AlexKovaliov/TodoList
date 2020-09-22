import {
    RemoveTodolistAC,
    todolistReducer,
    AddTodolistAC,
    ChangeTodolistTitleAC,
    ChangeTodolistFilterAC
} from './todolist-reducer';
import {v1} from 'uuid';
import {TodoListType, FilterValuesType} from '../App';
import {tasksReducer} from "./tasks-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = RemoveTodolistAC(todolistId1)
    const endStateTodoLists = todolistReducer(startState, action)
    const endStateTasks = tasksReducer(startStateTasks, action)
    const tasksId = Object.keys(endStateTasks)

    expect(endStateTodoLists.length).toBe(1);
    expect(endStateTodoLists[0].id).toBe(todolistId2);
    expect(tasksId.length).toBe(1);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startStateTodoList: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const startStateTasks = {
        [todolistId1]: [],
        [todolistId2]: []
    }

    const action = AddTodolistAC(newTodolistTitle)

    const endStateTodoLists = todolistReducer(startStateTodoList, action)
    const endStateTasks = tasksReducer(startStateTasks, action)

    const todoListId = endStateTodoLists[2].id
    const tasksId = Object.keys(endStateTasks)

    expect(endStateTodoLists.length).toBe(3);
    expect(endStateTodoLists[2].title).toBe(newTodolistTitle);
    expect(endStateTodoLists[2].filter).toBe("all");
    expect(endStateTodoLists[2].id).toBeDefined();
    expect(todoListId).toBe(tasksId[2]);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistReducer(startState, ChangeTodolistTitleAC(newTodolistTitle, todolistId2));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("What to buy");
    expect(endState.length).toBe(2);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

