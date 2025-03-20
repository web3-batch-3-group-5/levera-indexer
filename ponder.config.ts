import { createConfig } from "ponder";
import { http } from "viem";

import { LendingPoolFactoryABI } from "./abis/LendingPoolFactoryABI";
import { PositionFactoryABI } from "./abis/PositionFactoryABI";

export default createConfig({
  ordering: "multichain",
  networks: {
    local: {
      chainId: 109695,
      transport: http(process.env.PONDER_RPC_URL_109695),
    },
  },
  database: {
    kind: "postgres",
    connectionString: `postgresql://${process.env.PG_USER}:${process.env.PG_PWD}@${process.env.PG_HOST}:5432/${process.env.PG_DB}`,
  },
  contracts: {
    LendingPoolFactory: {
      abi: LendingPoolFactoryABI,
      startBlock: "latest",
      network: {
        local: { address: "0x1482d87527CCc6B83c7499F7956cA3712e83712E" },
      },
    },
    PositionFactory: {
      abi: PositionFactoryABI,
      startBlock: "latest",
      network: {
        local: { address: "0xf692258599fb1DC41bbE076f1b4F34B4423c9aDC" },
      },
    },
  },
});
