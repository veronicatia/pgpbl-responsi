import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you install @expo/vector-icons

export default function Layout() {
  return (
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 27,
        left: 16, // Keeps the left margin as is
        marginRight: 20, // Use marginRight instead of right to avoid stretching it too close to the right edge
        marginLeft: 20,
        height: 65,
        width: 'auto', // Allow the width to be auto based on content
        maxWidth: 400, // Optionally, set a maximum width
        elevation: 0,
        backgroundColor: "white",
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row", // Distribute the items horizontally
        paddingHorizontal: 20, // Adds padding to avoid the icons being too close to the edges
      },
    }}
    
    
    >
      <Tabs.Screen
        name="index" // Specify the screen name here
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", marginTop: -25 }}>
              <Ionicons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 10,
                  marginTop: -2,
                  textAlign: "center", // Ensure text stays centered
                  width: 40, // Set a fixed width to ensure text fits in one line
                }}
                numberOfLines={1} // Ensure the text does not wrap
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore" // Specify the screen name here
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", marginTop: -25 }}>
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 10,
                  marginTop: -2,
                  textAlign: "center", // Ensure text stays centered
                  width: 40, // Set a fixed width to ensure text fits in one line
                }}
                numberOfLines={1} // Ensure the text does not wrap
              >
                Map
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add" // Specify the screen name here
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 56,
                width: 56,
                borderRadius: 999,
                backgroundColor: "#F02A4B",
                marginBottom: 70,
              }}
            >
              <Ionicons name="add" color="white" size={24} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="like" // Specify the screen name here
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", marginTop: -25 }}>
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 10,
                  marginTop: -2,
                  textAlign: "center",
                  width: 40, // Ensure enough width for text
                }}
                numberOfLines={1}
              >
                Data
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="list" // Specify the screen name here
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", marginTop: -25 }}>
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? "#F02A4B" : "gray"}
                size={24}
              />
              <Text
                style={{
                  color: focused ? "#F02A4B" : "gray",
                  fontSize: 10,
                  marginTop: -2,
                  textAlign: "center",
                  width: 40, // Ensure enough width for text
                }}
                numberOfLines={1}
              >
                Author
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
