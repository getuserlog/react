# UserLog for React

## Installation

### Using npm

```bash
npm install @userlog/react
```

## Usage

First, wrap your application with the `UserLogProvider` at the top level, passing in your project and api_key:

```tsx
import { UserLogProvider } from "@userlog/react";

function App() {
  return (
    <UserLogProvider api_key="<API_KEY>" project="<PROJECT_NAME>">
      {/* Your existing code */}
    </UserLogProvider>
  );
}
```

## Hooks

The `useUserLog` hook can be used across your React components and provides the following methods:

- `track(options: TrackOptions)`: Track custom events.
- `setUserId(userId: string | null)`: Set the user id for the current user. If the user is not logged in, pass null.
- `clearUserId()`: Clear the user id for the current user.
- `setDebug(flag: boolean = true)`: Set debug mode for logging.

```tsx
import { useUserLog } from "@userlog/react";

export function Component() {
  // Get the hooks
  const { setUserId, track } = useUserLog();

  // Set the user id when a user logs in
  setUserId("user@example.com");

  // Track an event
  track({
    channel: "payments",
    event: "New Subscription",
    user_id: "user@example.com", // optional when set using setUserId
    icon: "💰",
    notify: true,
    tags: {
      plan: "premium",
      cycle: "monthly",
      trial: false,
    },
  });

  // Your existing component
}
```

## Tracking Events

You can also track events directly from HTML elements using data attributes:

```jsx
<button
  data-event="New Subscription"
  data-channel="payments"
  data-user-id="user@example.com" // optional (optional when set using setUserId)
  data-icon="💰" // optional
  data-tag-plan="Pro" // optional
  data-tag-period="Monthly" // optional
  data-tag-price="19.99" // optional
>
  Subscribe to Pro
</button>
```

In this example, when the button is clicked, an event named "New Subscription" will be tracked with the specified tags.

## API Documentation

For more information about the UserLog API, see: [docs.getuserlog.com](https://docs.getuserlog.com)

## Support

If you encounter any problems or issues, please contact us at [michael@8byte.de](mailto:michael@8byte.de)
