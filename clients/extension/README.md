# Save to Pocket

> Save to Pocket from anywhere and access it when you need it wherever you are

## Available Scripts

In the project directory, you can run the following scripts:

### pnpm dev

**Development Mode**: This command runs your extension in development mode. It will launch a new browser instance with your extension loaded. The page will automatically reload whenever you make changes to your code, allowing for a smooth development experience.

```bash
pnpm dev
```

### pnpm start

**Production Preview**: This command runs your extension in production mode. It will launch a new browser instance with your extension loaded, simulating the environment and behavior of your extension as it will appear once published.

```bash
pnpm start
```

### pnpm build

**Build for Production**: This command builds your extension for production. It optimizes and bundles your extension, preparing it for deployment to the target browser's store.

```bash
pnpm build
```

```
  "content_scripts": [
    {
      "matches": ["*://getpocket.com/extension_login_success*"],
      "js": ["./content/login.ts"]
    },
    {
      "matches": ["*://getpocket.com/logout?e=4"],
      "js": ["./content/logout.ts"]
    }
  ],
```
