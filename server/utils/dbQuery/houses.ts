import { eq, ilike, count, and, sql, or } from "drizzle-orm";
import { houses, owners } from "~~/db/schema";

// Define input types for search filters
interface Input {
   search?: string; // Optional search input
}

// Define pagination input type extending Input
interface PaginationInput extends Input {
   limit: number;
   page: number; // Use page instead of offset
}

// Declare filters globally for Houses
const filters = and(
   or(eq(sql.placeholder("search"), ""), ilike(houses.address, sql.placeholder("search")))
);

// Total count query for Houses
const queryTotalHouses = db
   .select({ total: count() })
   .from(houses)
   .where(filters) // Apply filters directly
   .prepare("get_total_houses");

// Deferred join query with pagination for Houses
const pagesWithFiltersHouses = db
   .select({ id: houses.id })
   .from(houses)
   .orderBy(houses.id) // Order by a column to maintain consistency
   .limit(sql.placeholder("limit")) // Use placeholder for limit
   .offset(sql.placeholder("offset")) // Use placeholder for offset
   .where(filters) // Apply filters directly
   .as("pages_for_houses_with_filters");

const queryPaginatedHouses = db
   .select({
      id: houses.id,
      address: houses.address,
      price: houses.price,
      ownerId: houses.ownerId,
      owner: {
         id: owners.id,
         name: sql`COALESCE(${owners.name}, '')`,
         email: owners.email,
      },
   })
   .from(houses)
   .innerJoin(owners, eq(owners.id, houses.ownerId))
   .innerJoin(pagesWithFiltersHouses, eq(houses.id, pagesWithFiltersHouses.id))
   .prepare("get_paginated_houses");

// Cached function for total count of Houses
export const getTotalHouses = defineCachedFunction(
   async ({ search }: Input) => {
      //I have removed fall back object`= {}` from the line below to induce the  type inferece error
      //In my original project though, I want eevn getting this error that total could be undefined.
      const [{ total = 0 }] = await queryTotalHouses.execute({ search });
      return total;
   },
   {
      name: cacheName.getTotalHouses,
      getKey: buildCacheKey,
      maxAge: 60,
   }
);

// Cached function for paginated results with deferred joins for Houses
export const getPaginatedHouses = defineCachedFunction(
   async ({ limit, page, search }: PaginationInput) => {
      const offset = (page - 1) * limit; // Calculate offset based on page and limit
      search = `%${search}%`; // Prepare search term with wildcards
      // const result = await queryPaginatedHouses.execute({ limit, offset, search });
      // const total = await getTotalHouses({ search }); // Fetch total count

      const [result, total] = await Promise.all([
         queryPaginatedHouses.execute({ limit, offset, search }),
         getTotalHouses({ search }),
      ]);

      return { result, total };
   },
   {
      name: cacheName.getPaginatedHouses,
      getKey: buildCacheKey,
      maxAge: 60,
   }
);
