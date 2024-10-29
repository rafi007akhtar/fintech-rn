import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "../../../constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { defaultStyles } from "../../../constants/Styles";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import { format } from "date-fns/format";
import * as Haptics from "expo-haptics";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";

const categories = ["Overview", "News", "Orders", "Transactions"];

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color={Colors.primary} />;
}

export default function CryptoDetails() {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeInd, setActiveInd] = useState(0);
  const font = useFont(require("@/assets/fonts/SpaceMono-Regular.ttf"), 12);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  useEffect(() => {
    if (isActive) {
      Haptics.selectionAsync();
    }
  }, [isActive]);

  let { data } = useQuery({
    queryKey: ["info", id],
    queryFn: () => fetch(`/api/info?id=${id}`).then((res) => res.json()),
  });

  let { data: tickers } = useQuery({
    queryKey: ["tickers", id],
    queryFn: (): Promise<any[]> =>
      fetch(`/api/tickers`).then((res) => res.json()),
  });

  const animatedPriceText = useAnimatedProps(() => {
    return {
      text: `₹ ${state.y.price.value.value.toFixed(2)}`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: date.toLocaleDateString(),
      defaultValue: "",
    };
  });

  let elemToShow;

  if (data) {
    data = data[+id];
    console.log(data.logo);
    elemToShow = (
      <>
        <Stack.Screen options={{ title: data.name }} />

        <SectionList
          stickySectionHeadersEnabled={true}
          sections={[{ data: [1] }]}
          renderSectionHeader={() => (
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.headerItem}
            >
              {categories.map((cat, ind) => (
                <TouchableOpacity
                  key={ind}
                  onPress={() => setActiveInd(ind)}
                  style={
                    activeInd === ind
                      ? styles.categoriesBtnActive
                      : styles.categoriesBtn
                  }
                >
                  <Text
                    style={
                      activeInd === ind
                        ? styles.categoryTextActive
                        : styles.categoryText
                    }
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          keyExtractor={(item, ind) => ind.toString()}
          renderItem={(item) => (
            <>
              <View style={[defaultStyles.block, { height: 500 }]}>
                {tickers && (
                  <>
                    {!isActive && (
                      <View>
                        <Text style={styles.todaysPrice}>
                          ₹ {tickers[tickers.length - 1].price.toFixed(2)}
                        </Text>
                        <Text style={styles.todayText}>Today</Text>
                      </View>
                    )}
                    {isActive && (
                      <View>
                        <AnimatedInput
                          editable={false}
                          underlineColorAndroid="transparent"
                          animatedProps={animatedPriceText}
                          style={styles.todaysPrice}
                        ></AnimatedInput>
                        <AnimatedInput
                          editable={false}
                          underlineColorAndroid="transparent"
                          animatedProps={animatedDateText}
                          style={styles.todayText}
                        ></AnimatedInput>
                      </View>
                    )}
                    <CartesianChart
                      data={tickers}
                      xKey="timestamp"
                      yKeys={["price"]}
                      chartPressState={state}
                      axisOptions={{
                        font,
                        tickCount: 5,
                        labelOffset: { x: -2, y: 0 },
                        labelColor: Colors.gray,
                        formatYLabel: (label) => `₹ ${label}`,
                        formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
                      }}
                    >
                      {({ points }) => (
                        <>
                          <Line
                            points={points.price}
                            color={Colors.primary}
                            strokeWidth={3}
                          />
                          {isActive && (
                            <ToolTip
                              x={state.x.position}
                              y={state.y.price.position}
                            />
                          )}
                        </>
                      )}
                    </CartesianChart>
                  </>
                )}
              </View>
              <View style={[defaultStyles.block, styles.sectionListItem]}>
                <Text style={styles.subtitle}>Overview</Text>
                <Text style={styles.sectionListPara}>{data.description}</Text>
              </View>
            </>
          )}
          style={styles.sectionList}
          ListHeaderComponent={() => (
            <View style={styles.listHeader}>
              <Text style={styles.subtitle}>{data.symbol}</Text>
              <Image style={styles.logo} source={{ uri: data.logo }} />
            </View>
          )}
        ></SectionList>
      </>
    );
  } else {
    elemToShow = <Text>Loading...</Text>;
  }

  return (
    <View style={[styles.container, { marginTop: headerHeight }]}>
      {elemToShow}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  sectionList: {},
  headerItem: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionListItem: { marginTop: 20 },
  sectionListPara: { color: Colors.gray },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: "#000",
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.gray,
  },
  logo: {
    width: 60,
    height: 60,
  },
  todaysPrice: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.dark,
  },
  todayText: {
    fontSize: 18,
    color: Colors.gray,
  },
});
