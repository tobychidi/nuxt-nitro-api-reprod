import consola from "consola";

/**
 * Builds a cache key by concatenating the stringified values of the input object.
 *
 * @param {Record<string, unknown>} input - The input object to build the cache key from.
 * @return {string} The generated cache key.
 */
export const buildCacheKey = <T extends Record<string, unknown>>(input: T): string =>
   Object.keys(input)
      .map((key) => String(input[key]))
      .join(":");

export const cacheMaxAge = useRuntimeConfig().cache.maxAge ?? 60;

/**
 * Invalidates the cache for the keys that match the most input strings.
 * If multiple keys have the same highest number of matches, all are invalidated.
 *
 * @param {string[]} keys - The keys to use for matching and cache invalidation.
 */
export const invalidateCache = async (keys: Array<string | null>) => {
   try {
      const storage = useStorage("cache");

      const existingKeys = await storage.getKeys();

      consola.info(
         "INVALIDATE CACHE: Found these keys in cache:",
         JSON.stringify(existingKeys, null, 2),
         "To match with:",
         JSON.stringify(keys, null, 2)
      );

      // Count matches for each existing key
      const keyMatches = existingKeys.map((existingKey) => ({
         key: existingKey,
         matches: keys.filter((k) => k !== null && existingKey.includes(k)).length,
      }));

      consola.info(
         "INVALIDATE CACHE: Found matches",
         JSON.stringify(keyMatches, null, 2)
      );

      // Find the maximum number of matches
      const maxMatches = Math.max(...keyMatches.map((km) => km.matches));

      // Filter keys with the maximum number of matches
      const keysToInvalidate = keyMatches
         .filter((km) => km.matches === maxMatches && km.matches > 0)
         .map((km) => km.key);

      consola.start(
         `Invalidating ${keysToInvalidate.length} keys in cache with ${maxMatches} matches:`,
         JSON.stringify(keysToInvalidate, null, 2)
      );

      await Promise.all(keysToInvalidate.map((key) => storage.removeItem(key)));
      consola.success(`Invalidate cache done`);
   } catch (err) {
      consola.error("Error invalidating cache:", err);
      throw createError({
         statusCode: 500,
         cause: import.meta.dev ?? err,
      });
   }
};

export type CacheName = (typeof cacheName)[keyof typeof cacheName];

export const cacheName = {
   getTotalCars: "get_total_cars",
   getPaginatedCars: "get_paginated_cars",
   getTotalHouses: "get_total_houses",
   getPaginatedHouses: "get_paginated_houses",
} as const;
