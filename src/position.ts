import { ponder } from "ponder:registry";
import { position, supplyCollateral, withdrawCollateral, borrow, repay } from "ponder:schema";

ponder.on("Position:UserPosition", async ({ event, context }) => {
  const existingPosition = await context.db.find(position, {
    positionAddr: event.args.positionAddr,
  });

  if (!existingPosition) {
    await context.db
      .insert(position)
      .values({
        lendingPoolAddr: event.args.lendingPoolAddr,
        caller: event.args.caller,
        positionAddr: event.args.positionAddr,
        baseCollateral: event.args.baseCollateral,
        totalCollateral: event.args.totalCollateral,
        borrowShares: event.args.borrowShares,
        leverage: event.args.leverage,
        liquidationPrice: event.args.liquidationPrice,
        health: event.args.health,
        ltv: event.args.ltv,
        status: event.args.status
      });
  } else {
    await context.db
      .update(position, {
        positionAddr: event.args.positionAddr,
      })
      .set({
        baseCollateral: event.args.baseCollateral,
        totalCollateral: event.args.totalCollateral,
        borrowShares: event.args.borrowShares,
        leverage: event.args.leverage,
        liquidationPrice: event.args.liquidationPrice,
        health: event.args.health,
        ltv: event.args.ltv,
        status: event.args.status
      });
  }
});

ponder.on("Position:SupplyCollateral", async ({ event, context }) => {
  await context.db
    .insert(supplyCollateral)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      totalCollateral: event.args.totalCollateral,
      borrowShares: event.args.borrowShares,
      leverage: event.args.leverage,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("Position:WithdrawCollateral", async ({ event, context }) => {
  await context.db
    .insert(withdrawCollateral)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      totalCollateral: event.args.totalCollateral,
      borrowShares: event.args.borrowShares,
      leverage: event.args.leverage,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("Position:Borrow", async ({ event, context }) => {
  await context.db
    .insert(borrow)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      totalCollateral: event.args.totalCollateral,
      borrowShares: event.args.borrowShares,
      leverage: event.args.leverage,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("Position:Repay", async ({ event, context }) => {
  await context.db
    .insert(repay)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      totalCollateral: event.args.totalCollateral,
      borrowShares: event.args.borrowShares,
      leverage: event.args.leverage,
      blockNumber: BigInt(event.block.timestamp),
      blockTimestamp: BigInt(event.block.number),
      transactionHash: event.transaction.hash,
    })
    .onConflictDoNothing();
});