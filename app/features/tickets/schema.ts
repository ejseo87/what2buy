import {
  bigint,
  date,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { TICKET_STATUS, TICKET_TYPES } from "./constants";
import { profiles } from "../users/schema";

export const ticketTypes = pgEnum(
  "ticket_types",
  TICKET_TYPES.map((type) => type.value) as [string, ...string[]]
);

export const ticketStatus = pgEnum(
  "ticket_status",
  TICKET_STATUS.map((status) => status.value) as [string, ...string[]]
);

export const tickets = pgTable("tickets", {
  ticket_id: bigint({ mode: "number" })
    .primaryKey()
    .generatedAlwaysAsIdentity(),
  ticket_type: ticketTypes().notNull(),
  ticket_description: text(),
  ticket_duration_start: date().notNull(),
  ticket_duration_end: date().notNull(),
  status: ticketStatus().notNull(),
  used_date: date(),
  profile_id: uuid()
    .references(() => profiles.profile_id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
