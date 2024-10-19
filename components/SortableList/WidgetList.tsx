import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MARGIN } from "./Config";
import SortableList from "./SortableList";
import { View } from "react-native";
import Tile from "./Tile";

const tiles = [
  { id: "spent" },
  { id: "cashback" },
  { id: "recent" },
  { id: "cards" },
];

const WidgetList = () => {
  return (
    <View style={{ paddingHorizontal: MARGIN }}>
      <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {tiles.map((tile, index) => (
          <Tile
            key={`${tile.id}-${index}`}
            id={tile.id}
            onLongPress={() => true}
          />
        ))}
      </SortableList>
    </View>
  );
};

export default WidgetList;
