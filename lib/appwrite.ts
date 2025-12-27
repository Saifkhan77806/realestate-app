import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
} from "react-native-appwrite";

// Required for Expo OAuth flow
WebBrowser.maybeCompleteAuthSession();

export const config = {
  platform: "com.khan.estate", // your bundle identifier from app.json
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectid: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!) // ✅ fixed typo
  .setProject(config.projectid!)
  .setPlatform(config.platform!); // needed for mobile SDK

export const account = new Account(client);
export const avatar = new Avatars(client);
export const database = new Databases(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL("/"); // e.g. com.khan.estate://
    console.log("Redirect URI:", redirectUri);

    // ✅ make sure to await this
    const response = await account.createOAuth2Token({
      provider: OAuthProvider.Google,
      success: redirectUri,
      failure: redirectUri,
    });

    if (!response) throw new Error("Failed to start OAuth flow");

    console.log("OAuth URL:", response.toString());

    // ✅ Updated Expo WebBrowser usage
    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(),
      redirectUri
    );

    if (browserResult.type !== "success") {
      throw new Error("User cancelled or login failed");
    }

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get("secret");
    const userId = url.searchParams.get("userId");

    if (!secret || !userId) throw new Error("Invalid redirect parameters");

    const session = await account.createSession({ userId, secret });
    if (!session) throw new Error("Failed to create session");

    console.log("Login success:", session);
    return true;
  } catch (error) {
    console.error("Login Error:", error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSessions();
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const useAvatar = avatar.getInitials({ name: response.name });
      // console.log("avatar",useAvatar)
      return {
        ...response,
        avatar: useAvatar.toString()
          ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_InUxO_6BhylxYbs67DY7-xF0TmEYPW4dQQ&s"
          : useAvatar.toString(),
      };
    }
  } catch (error) {
    console.error("Get User Error:", error);
    return null;
  }
}
