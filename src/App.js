import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";

/* const list = ["item0", "item1", "item2"];
console.log(list);
const remove = list.splice(0, 1);
console.log(remove);
console.log(list);
list.splice(1, 0, remove[0]);
console.log(list); */

/* const list = ["a", "b", "c"];
list.map((eigo, index) => {
  console.log(eigo, index)
}) */

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  //itemsの中身を１つずつ取り出して新しい配列にしている。
  console.log(startIndex); //0
  console.log(endIndex); //1
  console.log(list);
  const [removed] = list.splice(startIndex, 1);
  console.log(removed);
  list.splice(endIndex, 0, removed);
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

function App() {
  const [items] = useState(getItems(10));

  //ドラッグが終わったらの処理
  const onDragEnd = (result) => {
    //リストの外にドロップされたら
    if (!result.destination) {
      return;
    }

    //並びをきちんと整理する的な
    reorder(
      items,
      result.source.index, //ドラッグ開始配列インデックス
      result.destination.index //ドラッグ目的先終了インデックス
    );
    //並べたitemsをセットする。
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
