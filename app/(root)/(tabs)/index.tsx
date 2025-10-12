import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-center font-rubikSemiBold">
        app/index.tsx to saif khan edit this screen.
      </Text>
      <Link href={"/sign-in"}>Sign in</Link>
      <Link href={"/explore"}>Explore</Link>
    </View>
  );
}
