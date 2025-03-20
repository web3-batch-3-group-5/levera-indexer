import { ponder } from "ponder:registry";
import { lendingPoolStat, userSupplyShare, accrueInterest, supply, withdraw } from "ponder:schema";

ponder.on("LendingPool:LendingPoolStat", async ({ event, context }) => {
  await context.db
    .insert(lendingPoolStat)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      totalSupplyAssets: event.args.totalSupplyAssets,
      totalSupplyShares: event.args.totalSupplyShares,
      totalBorrowAssets: event.args.totalBorrowAssets,
      totalBorrowShares: event.args.totalBorrowShares,
      totalCollateral: event.args.totalCollateral,
      ltp: event.args.ltp,
      interestRate: event.args.interestRate,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("LendingPool:UserSupplyShare", async ({ event, context }) => {
  const existingUserSupplyShare = await context.db.find(userSupplyShare, {
    lendingPoolAddr: event.args.lendingPoolAddr,
    caller: event.args.caller,
  });

  if (!existingUserSupplyShare) {
    await context.db
      .insert(userSupplyShare)
      .values({
        lendingPoolAddr: event.args.lendingPoolAddr,
        caller: event.args.caller,
        supplyShares: event.args.supplyShares,
      });
  } else {
    await context.db
      .update(userSupplyShare, {
        lendingPoolAddr: event.args.lendingPoolAddr,
        caller: event.args.caller
      })
      .set({ supplyShares: event.args.supplyShares });
  }
});

ponder.on("LendingPool:AccrueInterest", async ({ event, context }) => {
  await context.db
    .insert(accrueInterest)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      prevInterest: event.args.prevInterest,
      interest: event.args.interest,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("LendingPool:Supply", async ({ event, context }) => {
  await context.db
    .insert(supply)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      supplyShares: event.args.supplyShares,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("LendingPool:Withdraw", async ({ event, context }) => {
  await context.db
    .insert(withdraw)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      supplyShares: event.args.supplyShares,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});