import { parseAbiItem } from 'abitype';
import { createConfig, factory } from 'ponder';
import { http } from 'viem';

import { TokenFactoryABI } from './abis/TokenFactoryABI';
import { TokenABI } from './abis/TokenABI';
import { LendingPoolFactoryABI } from './abis/LendingPoolFactoryABI';
import { LendingPoolABI } from './abis/LendingPoolABI';
import { PositionFactoryABI } from './abis/PositionFactoryABI';
import { PositionABI } from './abis/PositionABI';

const tokenFactoryEvent = parseAbiItem('event AllToken(address tokenAddr, string name, string symbol, uint8 decimals, bool isActive)');

const lendingPoolFactoryEvent = parseAbiItem('event CreateLendingPool(address lendingPoolAddr)');

const positionFactoryEvent = parseAbiItem('event CreatePosition(address lendingPoolAddr, address caller, address positionAddr)');

const { PHAROS_TESTNET_RPC_URL, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, DATABASE_NAME } = process.env;

export default createConfig({
  ordering: 'multichain',
  networks: {
    pharosTestnet: {
      chainId: 50002,
      transport: http(PHAROS_TESTNET_RPC_URL),
    },
  },
  database: {
    kind: 'postgres',
    connectionString: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${DATABASE_NAME}`,
  },
  contracts: {
    TokenFactory: {
      abi: TokenFactoryABI,
      startBlock: 'latest',
      network: {
        pharosTestnet: { address: '0xe758aE71DAf445A9aF6cc5381D413c1dd99F8a19' },
      },
    },
    Token: {
      abi: TokenABI,
      network: {
        pharosTestnet: {
          address: factory({
            address: '0xe758aE71DAf445A9aF6cc5381D413c1dd99F8a19',
            event: tokenFactoryEvent,
            parameter: 'tokenAddr',
          }),
          startBlock: 'latest',
        },
      },
    },
    LendingPoolFactory: {
      abi: LendingPoolFactoryABI,
      startBlock: 'latest',
      network: {
        pharosTestnet: { address: '0xF87071CE17eFF6f97F537521342A648f1D1401C5' },
      },
    },
    LendingPool: {
      abi: LendingPoolABI,
      network: {
        pharosTestnet: {
          address: factory({
            address: '0xF87071CE17eFF6f97F537521342A648f1D1401C5',
            event: lendingPoolFactoryEvent,
            parameter: 'lendingPoolAddr',
          }),
          startBlock: 'latest',
        },
      },
    },
    PositionFactory: {
      abi: PositionFactoryABI,
      startBlock: 'latest',
      network: {
        pharosTestnet: { address: '0x8AB9534c6dc1061308705Feb42881757a52bc024' },
      },
    },
    Position: {
      abi: PositionABI,
      network: {
        pharosTestnet: {
          address: factory({
            address: '0x8AB9534c6dc1061308705Feb42881757a52bc024',
            event: positionFactoryEvent,
            parameter: 'positionAddr',
          }),
          startBlock: 'latest',
        },
      },
    },
  },
});
