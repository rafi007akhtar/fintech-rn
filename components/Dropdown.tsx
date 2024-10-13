import { View, Text, StyleSheet } from "react-native";
import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundBtn from "./RoundBtn";

export default function Dropdown() {
  return (
    <View>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <RoundBtn icon="ellipsis-horizontal">More</RoundBtn>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item key="statement">
            <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              androidIconName="ic_menu_agenda"
              style={styles.icon}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Item key="converter">
            <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              androidIconName="ic_menu_set_as"
              style={styles.icon}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Item key="background">
            <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              androidIconName="ic_menu_gallery"
              style={styles.icon}
            />
          </DropdownMenu.Item>

          <DropdownMenu.Item key="account">
            <DropdownMenu.ItemTitle>Add new account</DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              androidIconName="ic_menu_add"
              style={styles.icon}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </View>
  );
}

const size = 50;

const styles = StyleSheet.create({
  icon: {
    width: size,
    height: size,
  },
});
