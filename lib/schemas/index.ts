import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
  decimal,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const products = pgTable("products", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name").notNull(),
  image: varchar("image"),
  description: varchar("description"),
  excerpt: varchar("excerpt"),
  userId: text("userid").notNull(),
  price: integer("price").notNull(),
  rating: decimal("rating"),
  category: varchar("category"),
  deal_price: integer("deal_price")
});

export const productImages = pgTable("productimages", {
  id: serial("id").primaryKey(),
  image: varchar("image"),
  productId: integer("productid"),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("productid"),
  userId: text("userid"),
  review: varchar("review"),
});

export const cartitems = pgTable("cartitems", {
  id: serial("id").primaryKey().notNull(),
  quantity: integer("quantity").default(1),
  productId: integer("productid").unique(),
  userId: text("userid"),
});
