import React, { useReducer, createContext, useContext, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true
  },
  {
    id: 2,
    text: "Redux 공부하기",
    done: true
  },
  {
    id: 3,
    text: "mobx 공부해보기",
    done: false
  },
  {
    id: 4,
    text: "VUE 맛보기",
    done: false
  }
];
/**
 *  CREATE
 *  REMOVE
 *  TOGGLE
 */
function todoReducer(state, action) {
  //state랑 action을 가져와서 그 다음 상태를 만드는 함수

  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

/**
 *  state와 dispatch를 위한 context 생성
 *  + Context를 생성하면 내부에는 Provider가 존재
 */
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }

  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }

  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error(`Cannot find TodoProvider`);
  }

  return context;
}
