import { useState } from "react";
import { initialTravelPlan } from './places'
//两种方式声明类型
// interface itemProps  {
//   name:string,
//   isPacked:boolean,
// }
type itemProps = {
  name:string,
  isPacked:boolean,
}
type placeTreeProps = {
  id:number,
  parentId:number,
  placesById:typeof initialTravelPlan,
  onComplete:Function
}
const Item = ({ name, isPacked }:itemProps) => {
  return (
    <li>{isPacked ? name + '√': name}</li>
  )
}
const Counter = () => {
  const [count, setCount] = useState(0)
  const addCount = () => {
    setCount(count + 1)
  }
  return (
    <>
      <div>{count}</div>
      <button onClick={addCount}>Count++</button>
    </>
  )
}

function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId: number, childId: number) {
    const parent = plan[parentId];
    // 创建一个其父级地点的新版本
    // 但不包括子级 ID。
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter((id: any) => id !== childId)
    };
    // 更新根 state 对象...
    setPlan({
      ...plan,
      // ...以便它拥有更新的父级。
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }:placeTreeProps) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map((childId: number) => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}

const Main = () => {
  return (
    <div className="main-content">
      <Item name='picture' isPacked={true}></Item>
      <Item name='picture2' isPacked={true}></Item>
      <Item name='picture3' isPacked={false}></Item>
      <Counter></Counter>
      <TravelPlan />
    </div>
  )
}

export default Main