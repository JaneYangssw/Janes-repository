import { useReducer, useState } from "react";
import { reducer, defaultValue } from "./store";
import "./App.css";
import Block from "./Block";

export default function App() {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  const [value, setValue] = useState("");
  return (
    <div className='container'>
      {/* 左侧列表 */}
      <div className='list-area'>
        <div>
          {state.originList.map((el, key) => (
            <Block
              key={key}
              data={el}
              selected={state.originSelected}
              index={key}
              dispatch={dispatch}
              direction='right'
            />
          ))}
        </div>
        {/* 向右按钮 */}
        <div className='divider'>
          <button
            onClick={() => {
              dispatch({ type: "move", direction: "right" });
            }}
          >
           向右
          </button>
          {/* 向左按钮 */}
          <button
            onClick={() => {
              dispatch({ type: "move", direction: "left" });
            }}
          >
            向左
          </button>
        </div>
        <div>
          {state.targetList.map((el, key) => (
            <Block
              key={key}
              data={el}
              selected={state.targetSelected}
              index={key}
              dispatch={dispatch}
              direction='left'
            />
          ))}
        </div>
      </div>
      {/* 文本域 */}
      <div className='input-area'>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        {/* 底部OK按钮 */}
        <div className="okbutton">
          <button
            onClick={() => {
              setValue(
                state.targetList.map((el) => Object.values(el)[0]).join("\n")
              );
            }}
          >
           OK
          </button>
        </div>
      </div>
    </div>
  );
}
