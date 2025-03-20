import { ponder } from "ponder:registry";
import { lendingPool, createLendingPool, storeLendingPool, discardLendingPool } from "ponder:schema";

ponder.on("LendingPoolFactory:AllLendingPool", async ({ event, context }) => {
  const existingLendingPool = await context.db.find(lendingPool, {
		lendingPoolAddr: event.args.lendingPoolAddr,
	});

	if (!existingLendingPool) {
		await context.db
    .insert(lendingPool)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      loanToken: event.args.loanToken,
      collateralToken: event.args.collateralToken,
      creator: event.args.creator,
      isActive: event.args.isActive,
    });
	} else {
    await context.db
    .update(lendingPool, { lendingPoolAddr: event.args.lendingPoolAddr })
    .set({ isActive: event.args.isActive });
  }
});

ponder.on("LendingPoolFactory:CreateLendingPool", async ({ event, context }) => {
  const createdLendingPool = await context.db.find(createLendingPool, {
		lendingPoolAddr: event.args.lendingPoolAddr,
	});

	if (createdLendingPool) {
    console.log(`⚠️ Skipped duplicate Lending Pool: ${event.args.lendingPoolAddr}`);
    return;
  };

  await context.db
    .insert(createLendingPool)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      blockNumber:  BigInt(event.block.timestamp),
      blockTimestamp:  BigInt(event.block.number),
      transactionHash:  event.transaction.hash,
    });
});

ponder.on("LendingPoolFactory:StoreLendingPool", async ({ event, context }) => {
  await context.db
    .insert(storeLendingPool)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      blockNumber:  BigInt(event.block.timestamp),
      blockTimestamp:  BigInt(event.block.number),
      transactionHash:  event.transaction.hash,
    });
});

ponder.on("LendingPoolFactory:DiscardLendingPool", async ({ event, context }) => {
  await context.db
    .insert(discardLendingPool)
    .values({
      lendingPoolAddr: event.args.lendingPoolAddr,
      blockNumber:  BigInt(event.block.timestamp),
      blockTimestamp:  BigInt(event.block.number),
      transactionHash:  event.transaction.hash,
    });
});