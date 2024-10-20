import {
  View,
  Text,
  StyleSheet,
  SectionList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Colors from "../../../constants/Colors";
import { useQuery } from "@tanstack/react-query";
import { defaultStyles } from "../../../constants/Styles";

const categories = ["Overview", "News", "Orders", "Transactions"];

export default function CryptoDetails() {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeInd, setActiveInd] = useState(0);

  let { data } = useQuery({
    queryKey: ["info", id],
    queryFn: () => fetch(`/api/info?id=${id}`).then((res) => res.json()),
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
            <View style={[defaultStyles.block, styles.sectionListItem]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={styles.sectionListPara}>{data.description}</Text>
            </View>
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
});
