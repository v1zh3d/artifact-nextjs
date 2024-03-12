This is a [Next.js](https://nextjs.org/) project with [Tailwind CSS](https://tailwindcss.com) as CSS pre-processor, [Shadcn UI](https://ui.shadcn.com) components and [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for form handling and validation.

## Deployed URL

[https://artifact-nextjs.vercel.app/](https://artifact-nextjs.vercel.app/)

## Run it Locally

First, clone the repository in your system

```bash
git clone https://github.com/v1zh3d/artifact-nextjs.git
```

Second, install project dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Explanation

This project is just a small example of persistent state management and API data fetching.

It has a single page that is the `root (/)` route page. The page consists of:

- Navbar to add **Authorization token** and **Theme toggle button**
- User profile form having input such as **Full Name**, **Username**, **Email**, **Gender**, **Age**, **Location**, **Avatar URI** and **Interests**

In this user form priority is given to local state where on any form change its value is stored in browser `localStorage`. If any state persists in `localStorage`, no user API call would happen which would reduce server call.

Location API is implemented to pre-fill user's current location and modify to save into `localStorage`.

### Helper Function

Two major helper functions are used:

- `cn()`: This function takes classNames as input and merge it using `twMerge` functionality in Tailwind CSS.
- `checkObjectValues()`: This function is used to check if an object has keys and its keys have any value in it by checking if its empty, undefined or length greater than 0 (for arrays). It is being used to check if `localStorage` user data object has any value or not.

### APIs

Only two APIs are there:

- `getUserLocation()`: Which fetch user's location using [Abstract IP Geolocation](https://www.abstractapi.com/api/ip-geolocation-api) third-party service.
- `getUserProfile()`: Which fetch user's profile details using [Artifact](https://gotartifact.com) user details API which take **Authorization** token in request headers.
