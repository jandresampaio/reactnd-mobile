import { useAsyncStorage } from "@react-native-community/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATIONS_KEY = "mobile-flashcards:NOTIFICATIONS2";
const notificationsStorage = useAsyncStorage(NOTIFICATIONS_KEY);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

export function clearLocalNotification() {
  return notificationsStorage
    .removeItem()
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
  return {
    title: "Log your stats!",
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  notificationsStorage.getItem().then((data) => {
    console.log("notification storage: ", data);
    if (data == null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        console.log("status: ", status);
        if (status === "granted") {
          Notifications.cancelAllScheduledNotificationsAsync();

          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(20);
          tomorrow.setMinutes(0);

          Notifications.scheduleNotificationAsync({
            identifier: "myidentifer",
            content: {
              title: "Answer a Quiz!",
              body: "👋 don't forget to answer a quiz today!"
            },
            trigger: {
              date: tomorrow
            }
          })
            .then((result) => {
              console.log("scheduleNotificationAsync: ", result);
              notificationsStorage.setItem(JSON.stringify(true));
            })
            .catch((error) => console.log("ERROR: ", error));
        }
      });
    }
  });
}
