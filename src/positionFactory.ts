import { ponder } from "ponder:registry";
import { createPosition, discardPosition } from "ponder:schema";

ponder.on("PositionFactory:CreatePosition", async ({ event, context }) => {
  await context.db
    .insert(createPosition)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      blockNumber:  BigInt(event.block.timestamp),
      blockTimestamp:  BigInt(event.block.number),
      transactionHash:  event.transaction.hash,
    })
    .onConflictDoNothing();
});

ponder.on("PositionFactory:DeletePosition", async ({ event, context }) => {
  await context.db
    .insert(discardPosition)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      caller: event.args.caller,
      positionAddr: event.args.positionAddr,
      blockNumber:  BigInt(event.block.timestamp),
      blockTimestamp:  BigInt(event.block.number),
      transactionHash:  event.transaction.hash,
    })
    .onConflictDoNothing();
});
