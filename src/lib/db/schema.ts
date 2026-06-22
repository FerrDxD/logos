import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable("entries", {
  id: uuid("id").primaryKey().defaultRandom(),
  prompt: text("prompt").notNull(),
  outputText: text("output_text"),
  outputImages: text("output_images").array(),
  aiTool: varchar("ai_tool", { length: 255 }).notNull(),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Entry = typeof entries.$inferSelect;
export type NewEntry = typeof entries.$inferInsert;
