const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

async function fetchNotifications() {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    const sortedNotifications =
      data.notifications
        .sort((a, b) => {
          const weightDifference =
            weights[b.Type] - weights[a.Type];

          if (weightDifference !== 0) {
            return weightDifference;
          }

          return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
          );
        })
        .slice(0, 10);

    console.log(
      "\n===== TOP 10 PRIORITY NOTIFICATIONS =====\n"
    );

    sortedNotifications.forEach(
      (notification, index) => {
        console.log(`${index + 1}.`);

        console.log(
          `Type: ${notification.Type}`
        );

        console.log(
          `Message: ${notification.Message}`
        );

        console.log(
          `Timestamp: ${notification.Timestamp}`
        );

        console.log(
          "--------------------------------"
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
}

fetchNotifications();