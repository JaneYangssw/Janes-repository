import { useRef } from "react";
import "./Block.css";
export default function Block(props) {
  const isSingleClick = useRef(true);
  return (
    <div
      style={{
        backgroundColor: props.selected.includes(props.index)
          ? "hsl(220,40%,70%)"
          : "white",
      }}
      className='block'
      // 双击事件 双击后单击效果失效
      onDoubleClick={() => {
        props.dispatch({
          type: "single",
          direction: props.direction,
          payload: props.index,
        });
        isSingleClick.current = false;
      }}
      // 单击事件
      onClick={() => {
        setTimeout(() => {
          if (!isSingleClick.current) {
            isSingleClick.current = true;
            return;
          }
          props.dispatch({
            type: "select",
            direction: props.direction,
            payload: props.index,
          });
        }, 0);
      }}
    >
      {Object.values(props.data)[0]}
    </div>
  );
}
