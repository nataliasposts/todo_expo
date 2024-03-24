import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20
  },
});


const SignInPage = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <View>
        <StatusBar style="light" />
        <SafeAreaView style={styles.main}>
          <View>
            <Button
              buttonColor="#00457E"
              mode="contained"
              onPress={() => navigation.navigate("MainScreen")}
            >
              <Text>SIGN IN</Text>
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

export default SignInPage;
