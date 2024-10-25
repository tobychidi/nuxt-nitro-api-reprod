import { eq, ilike, count, and, or, sql } from "drizzle-orm";
import { cars, owners } from "~~/db/schema";

// Define input types for search filters
interface Input {
   search?: string; // Optional search input
}

// Define pagination input type extending Input
interface PaginationInput extends Input {
   limit: number;
   page: number; // Use page instead of offset
}

// Declare filters globally for Cars
const filters = and(
   or(
      eq(sql.placeholder("search"), ""),
      ilike(cars.make, sql.placeholder("search")),
      ilike(cars.model, sql.placeholder("search"))
   )
);

// Total count query for Cars
const queryTotalCars = db
   .select({ total: count() })
   .from(cars)
   .where(filters) // Apply filters directly
   .prepare("get_total_cars");

// Deferred join query with pagination for Cars
const pagesWithFiltersCars = db
   .select({ id: cars.id })
   .from(cars)
   .orderBy(cars.id) // Order by a column to maintain consistency
   .limit(sql.placeholder("limit")) // Use placeholder for limit
   .offset(sql.placeholder("offset")) // Use placeholder for offset
   .where(filters) // Apply filters directly
   .as("pages_for_cars_with_filters");

const queryPaginatedCars = db
   .select({
      id: cars.id,
      make: cars.make,
      model: cars.model,
      year: cars.year,
      ownerId: cars.ownerId,
      owner: {
         id: owners.id,
         name: owners.name,
         email: owners.email,
      },
   })
   .from(cars)
   .innerJoin(owners, eq(owners.id, cars.ownerId))
   .innerJoin(pagesWithFiltersCars, eq(cars.id, pagesWithFiltersCars.id))
   .prepare("get_paginated_cars");

// Cached function for total count of Cars
export const getTotalCars = defineCachedFunction(
   async ({ search }: Input) => {
      const result = await queryTotalCars.execute({ search });
      const [{ total = 0 } = {}] = result || [{}]; // Default to 0 if no result
      return total;
   },
   {
      name: cacheName.getTotalCars,
      getKey: buildCacheKey,
      maxAge: cacheMaxAge,
   }
);

// Cached function for paginated results with deferred joins for Cars
export const getPaginatedCars = defineCachedFunction(
   async ({ limit, page, search }: PaginationInput) => {
      const offset = (page - 1) * limit; // Calculate offset based on page and limit
      search = `%${search}%`;
      const result = await queryPaginatedCars.execute({ limit, offset, search });
      const total = await getTotalCars({ search }); // Fetch total count

      return { result, total };
   },
   {
      name: cacheName.getPaginatedCars,
      getKey: buildCacheKey,
      maxAge: cacheMaxAge,
   }
);
