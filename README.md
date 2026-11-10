# Astro Starter Kit: Minimal

## Message form delivery

The Message dialog posts to FormSubmit for `roniepactol@gmail.com` using a native multipart form. It works with static hosting and keeps FormSubmit's default spam verification enabled. FormSubmit opens in a separate tab to finish sending and show its confirmation or error page, while the portfolio remains open. Opening the verification tab alone does not confirm email delivery.

Before launch, submit the form yourself and confirm the activation email in that inbox (check spam). Then submit another message with a small attachment to verify actual delivery. Inbox activation and live delivery have not been verified by automated browser checks.

Attachments use separate file fields; visitors can add or remove extra fields. The combined limit is 10 MB. Client validation helps visitors, and FormSubmit enforces its upload limits. No email credentials are stored in this repository. Messages and files pass through FormSubmit: https://formsubmit.co/documentation.

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
