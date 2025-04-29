import { ponder } from "ponder:registry";
import { token } from "ponder:schema";

ponder.on("TokenFactory:AllToken", async ({ event, context }) => {
  const existingToken = await context.db.find(token, {
    name: event.args.name,
    symbol: event.args.symbol,
    chainId: BigInt(context.network.chainId)
  });

  if (!existingToken) {
    await context.db
      .insert(token)
      .values({
        tokenAddr: event.args.tokenAddr,
        chainId: BigInt(context.network.chainId),
        name: event.args.name,
        symbol: event.args.symbol,
        decimals: event.args.decimals,
        isActive: event.args.isActive,
      })
      .onConflictDoNothing();
  } else {
    await context.db
      .update(token, {
        name: event.args.name,
        symbol: event.args.symbol,
        chainId: BigInt(context.network.chainId)
      })
      .set({
        tokenAddr: event.args.tokenAddr,
        decimals: event.args.decimals,
        isActive: event.args.isActive,
      });
  }
});
