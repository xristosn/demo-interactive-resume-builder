[![Netlify Status](https://api.netlify.com/api/v1/badges/a6e79503-9980-4e9e-ab2d-277ea336594a/deploy-status)](https://app.netlify.com/projects/xn-interactive-resume-builder/deploys)

# Demo - Interactive Resume Builder

A fully client-side **React + Chakra UI** app that lets you create customizable resumes from **6 professionally designed templates** — all within the browser.

Built with **Vite v7**, **React v19**, and **Chakra UI v3**, this project demonstrates advanced frontend techniques, modular architecture, and a smooth user experience — perfect for showcasing modern React capabilities.

**Try it out [here](https://xn-interactive-resume-builder.netlify.app/)**

⚠️ **Note:** This is a **desktop-oriented web tool**. It’s optimized for larger screens and is **not intended for mobile use**.

---

## ✨ Features

### 🧱 Templates

- 6 ready-to-use resume templates with A4 dimensions.
- Live preview rendered via dynamically scaling **iframes**.
- Each template supports:
  - **Light and dark themes**
  - **Primary color selection** (sample colors or custom)
  - Automatic **dynamic palette generation** for custom colors.
- Iframes communicate with the parent via postMessage APIs to sync theme, color and data options independently.

### 🎨 Theming & Customization

- Theme switcher for light/dark modes.
- Color picker popup with sample and custom colors.
- Dynamic palette creation for custom colors using `tinycolor2`.
- Real-time updates across all templates and previews.

### 🧩 Resume Builder

- Fully featured builder accessible via `/builder`.
- Built with **react-hook-form** for rich form management and validation.
- Step-based sidebar workflow:
  - Personal
  - Summary
  - Experience
  - Skills
  - Education
  - Theme
  - Export
- Live resume preview updates in real time as you edit your data.

### 🔄 Template Previews

- Root route (`/`) lists all templates rendered via responsive iframes.
- Each iframe renders the `/template-preview?templateid={templateId}` route.
- Templates start with mock data to demonstrate layout and style.
- Refresh button regenerates mock data across all templates.
- `Preview` mode for detailed template inspection.

### 📁 Import / Export

- **Import Resume**:
  - Upload a previously exported JSON file to restore resume data.
  - Automatically navigates to the builder view with data prefilled.
- **Export Resume**:
  - Export as JSON for later editing.
  - Export as **PDF** using `html2pdf.js` and `html2canvas-pro`.

### 🧭 Routing

- Uses **react-router v7** to organize app sections:
  - `/` – Template gallery
  - `/template-preview?templateid={id}` – Individual template preview
  - `/builder?templateid={id}` – Resume builder & editor

## 🧰 Tech Stack

| Area                       | Technology                                                                                                                 | Notes                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Build Tool                 | [Vite v7](https://vitejs.dev/)                                                                                             | Fast dev + optimized builds                                             |
| UI Library                 | [Chakra UI v3](https://chakra-ui.com)                                                                                      | Modern accessible component system                                      |
| UI Framework               | [React v19](https://react.dev)                                                                                             | Latest React features                                                   |
| Forms                      | [React Hook Form](https://react-hook-form.com)                                                                             | Efficient form handling and validation                                  |
| Routing                    | [React Router](https://reactrouter.com)                                                                                    | Split app into logical sections                                         |
| PDF Export                 | [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) + [html2canvas-pro](https://www.npmjs.com/package/html2canvas-pro) | Client-side PDF generation                                              |
| State Management           | Local component state                                                                                                      | Lightweight and scoped                                                  |
| Mock Data                  | [faker.js](https://github.com/faker-js/faker)                                                                              | For randomized resume previews                                          |
| Dynamic Palette Generation | [tinycolor2](https://github.com/TinyCommunity/tinycolor2)                                                                  | For generating palettes from a custom color based on radix-ui principles |

## 🚀 Running the Project

1. Install Dependencies

```bash
npm install
# or
yarn install
```

2. Start Development Server

```bash
yarn dev
# or
npm run dev
```

3. Build for Production

```bash
yarn build
# or
npm run build
```

## 🧠 Concepts Demonstrated

- Component-driven architecture with reusable and composable building blocks.
- Real-time iframe communication patterns between parent and child React apps.
- Local theming and palette generation in Chakra UI.
- Dynamic form handling with react-hook-form including array and color inputs.
- State persistence and rehydration (via JSON import/export).
- Client-side PDF generation with proper layout scaling.
- Scalable route-based architecture with react-router.

## 📄 License

[MIT](https://github.com/xristosn/demo-interactive-resume-builder/blob/main/LICENSE)

⭐ If you like this project, don’t forget to give it a star on GitHub

