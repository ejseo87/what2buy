import {
  bigint,
  jsonb,
  pgEnum,
  pgPolicy,
  pgSchema,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { tickets } from "../tickets/schema";
import { sql } from "drizzle-orm";
import { authenticatedRole, authUid, authUsers } from "drizzle-orm/supabase";

//const users = pgSchema("auth").table("users", {
//  id: uuid().primaryKey(),
//});


export const profiles = pgTable(
  "profiles",
  {
    profile_id: uuid()
      .primaryKey()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    avatar: text(),
    name: text().notNull(),
    username: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("profiles-insert-policy", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("profiles-update-policy", {
      for: "update",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("profiles-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
);

export const notificationType = pgEnum("notification_type", [
  "alert",
  "system",
  "promotion",
  "information",
]);

export const notifications = pgTable(
  "notifications",
  {
    notification_id: bigint({ mode: "number" })
      .primaryKey()
      .generatedAlwaysAsIdentity(),
    profile_id: uuid().references(() => profiles.profile_id, {
      onDelete: "cascade",
    }),
    type: notificationType().notNull(),
    created_at: timestamp().notNull().defaultNow(),
  },
  (table) => [
    pgPolicy("notifications-insert-policy", {
      for: "insert",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("notifications-update-policy", {
      for: "update",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
    pgPolicy("notifications-select-policy", {
      for: "select",
      to: authenticatedRole,
      as: "permissive",
      withCheck: sql`${authUid} = ${table.profile_id}`,
    }),
  ]
);
