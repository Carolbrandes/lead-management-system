# Next.js Project

This project is built with **Next.js** and includes a simple authentication system for testing purposes.

---

## ⚙️ Getting Started

Install dependencies:
npm install

# or

yarn install

Run the development server:
npm run dev

# or

yarn dev

---

## Test Credentials

Use the following credentials to log in:

- **Username:** `admin`
- **Password:** `1234`

---

## Vercel Link

https://lead-management-system-alpha.vercel.app/

## Project Structure

The project is organized inside the `src` folder as follows:

```plaintext
src/
│
├── components/    # Reusable React components
├── context/       # React contexts for global state management
├── pages/         # Application pages (routes)
└── styles/        # Styling files (CSS/SCSS)

### Design and Architecture Choices

- **Next.js:**
  Chosen for its ability to render React applications server-side (SSR) and generate static pages, improving SEO and performance.

- **src Folder Structure:**
  Organizes the codebase by separating components, contexts, pages, and styles, making the project easier to maintain and scale.

- **Components:**
  Reusable UI pieces that promote DRY code and easier interface composition.

- **Context:**
  Used for global state management, such as user authentication, preventing prop drilling and allowing easy data sharing between components.

- **Pages:**
  Follows Next.js conventions where files inside the `pages` folder map directly to routes, simplifying navigation.

- **Styles:**
  Dedicated folder for styling files to keep design separate and maintainable.
```
