import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import styles from "./styles";


export default function Header() {
    return (
        <Appbar.Header style={styles.header}>
            <Appbar.Content style={styles.container} title="Seoul Spice Menu"  titleStyle={{color:"white"}}/>
            <StatusBar />
        </Appbar.Header>
    );
}
