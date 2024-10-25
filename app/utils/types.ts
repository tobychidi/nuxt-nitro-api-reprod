import type { InternalApi } from "nitropack";

export type House = InternalApi["/api/houses"]["get"]["data"][number];
