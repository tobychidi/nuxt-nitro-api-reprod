# Nuxt x Nitro x API Type Issue

## Spot the Error
- Compare `pages.houses.vue` with `pages/cars.vue`. The types in the houses page are muddled.

## Setup
- Install the dependencies.
- Add `DATABASE_URL` to .env file, push schema and run `db/seed.ts` if needed.

## Additional Info
- The undefined error did not show up in the original code but did in this reproduction, so it wasn't handled. However, the issue where `total` appeared as `number` in the handler and as `any` is the same.
- ![WhatsApp Image](https://github.com/user-attachments/assets/ad5e7baf-dd1f-43f0-accf-1bacfa5342bf)
- The issue with `Promise.all` doesn't occur in this reproduction but does in my app. One thing not reproduced was my use of `AliasedTables` from Drizzle.

## Question to Ask
How can the result types (e.g., `total` or a key in the result) be inferred correctly in the API routes and returned, but inferred as `any` in the InternalApi, resulting in muddled types?
