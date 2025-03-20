import { onchainTable, index, relations, primaryKey } from "ponder";

/** Utility Function for Lending Pool & Position Event-Based Tables */
const updateLendingPoolEventSchema = (name: string) => onchainTable(name, (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}), (table) => ({
  pk: primaryKey({ columns: [table.lendingPoolAddr, table.blockTimestamp] }),
}));

const createSupplyEventSchema = (name: string) => onchainTable(name, (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  caller: t.hex().notNull(),
  supplyShares: t.bigint(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}), (table) => ({
  pk: primaryKey({ columns: [table.lendingPoolAddr, table.caller, table.blockTimestamp] }),
}));

const createPositionEventSchema = (name: string) => onchainTable(name, (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  caller: t.hex().notNull(),
  positionAddr: t.hex().primaryKey(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}));

const updatePositionEventSchema = (name: string) => onchainTable(name, (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  caller: t.hex().notNull(),
  positionAddr: t.hex().notNull(),
  totalCollateral: t.bigint(),
  borrowShares: t.bigint(),
  leverage: t.bigint(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}), (table) => ({
  pk: primaryKey({ columns: [table.positionAddr, table.blockTimestamp] }),
}));

/** Lending Pool Tables */
export const lendingPool = onchainTable("lendingPool", (t) => ({
  lendingPoolAddr: t.hex().primaryKey(),
  loanToken: t.hex().notNull(),
  collateralToken: t.hex().notNull(),
  creator: t.hex().notNull(),
  isActive: t.boolean().notNull(),
}));

export const lendingPoolStat = onchainTable("lendingPoolStat", (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  totalSupplyAssets: t.bigint(),
  totalSupplyShares: t.bigint(),
  totalBorrowAssets: t.bigint(),
  totalBorrowShares: t.bigint(),
  totalCollateral: t.bigint(),
  ltp: t.bigint(),
  interestRate: t.bigint(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}), (table) => ({
  pk: primaryKey({ columns: [table.lendingPoolAddr, table.blockTimestamp] }),
  lendingPoolIdx: index().on(table.lendingPoolAddr),
  blockTimestampIdx: index().on(table.blockTimestamp),
}));

export const userSupplyShare = onchainTable("userSupplyShare", (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  caller: t.hex().notNull(),
  supplyShares: t.bigint(),
}), (table) => ({
  pk: primaryKey({ columns: [table.lendingPoolAddr, table.caller] }),
}));

export const accrueInterest = onchainTable("accrueInterest", (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  prevInterest: t.bigint(),
  interest: t.bigint(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}), (table) => ({
  pk: primaryKey({ columns: [table.lendingPoolAddr, table.interest, table.blockTimestamp] }),
}));

/** Lending Pool Events */
export const createLendingPool = onchainTable("createLendingPool", (t) => ({
  lendingPoolAddr: t.hex().primaryKey(),
  blockNumber: t.bigint().notNull(),
  blockTimestamp: t.bigint().notNull(),
	transactionHash: t.hex().notNull(),
}));
export const storeLendingPool = updateLendingPoolEventSchema("storeLendingPool");
export const discardLendingPool = updateLendingPoolEventSchema("discardLendingPool");

export const supply = createSupplyEventSchema("supply");
export const withdraw = createSupplyEventSchema("withdraw");

/** Position Tables */
export const position = onchainTable("position", (t) => ({
  lendingPoolAddr: t.hex().notNull(),
  caller: t.hex().notNull(),
  positionAddr: t.hex().primaryKey(),
  baseCollateral: t.bigint(),
  totalCollateral: t.bigint(),
  borrowShares: t.bigint(),
  leverage: t.bigint(),
  liquidationPrice: t.bigint(),
  health: t.bigint(),
  ltv: t.bigint(),
  status: t.integer().notNull(),
}), (table) => ({
  lendingPoolIdx: index().on(table.lendingPoolAddr),
  callerIdx: index().on(table.caller),
}));

/** Position Events */
export const createPosition = createPositionEventSchema("createPosition");
export const discardPosition = createPositionEventSchema("discardPosition");

export const supplyCollateral = updatePositionEventSchema("supplyCollateral");
export const withdrawCollateral = updatePositionEventSchema("withdrawCollateral");
export const borrow = updatePositionEventSchema("borrow");
export const repay = updatePositionEventSchema("repay");

/** Relations */
export const createLendingPoolRelations = relations(createLendingPool, ({ one }) => ({
  lendingPool: one(lendingPool, { fields: [createLendingPool.lendingPoolAddr], references: [lendingPool.lendingPoolAddr] }),
}));

export const storeLendingPoolRelations = relations(storeLendingPool, ({ one }) => ({
  lendingPool: one(lendingPool, { fields: [storeLendingPool.lendingPoolAddr], references: [lendingPool.lendingPoolAddr] }),
}));

export const discardLendingPoolRelations = relations(discardLendingPool, ({ one }) => ({
  lendingPool: one(lendingPool, { fields: [discardLendingPool.lendingPoolAddr], references: [lendingPool.lendingPoolAddr] }),
}));

export const lendingPoolRelations = relations(lendingPool, ({ many }) => ({
  lendingPoolStat: many(lendingPoolStat),
}));

export const lendingPoolStatRelations = relations(lendingPoolStat, ({ one }) => ({
  lendingPool: one(lendingPool, { fields: [lendingPoolStat.lendingPoolAddr], references: [lendingPool.lendingPoolAddr] }),
}));

export const createPositionRelations = relations(createPosition, ({ one }) => ({
  position: one(position, { fields: [createPosition.positionAddr], references: [position.positionAddr] }),
}));

export const discardPositionRelations = relations(discardPosition, ({ one }) => ({
  position: one(position, { fields: [discardPosition.positionAddr], references: [position.positionAddr] }),
}));