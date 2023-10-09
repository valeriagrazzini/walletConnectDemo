import { Center, VStack } from '@chakra-ui/react'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'

import {
  arbitrum,
  aurora,
  avalanche,
  base,
  bsc,
  celo,
  gnosis,
  mainnet,
  optimism,
  polygon,
  zkSync,
  zora
} from 'wagmi/chains'
import { ConnectButton } from './components/ConnectButton'
import { NetworksButton } from './components/NetworksButton'

// 1. Get projectId
const projectId = '69c28a49f044d93cf44ec267a495282e'


// 2. Create wagmiConfig
const chains = [
  mainnet,
  arbitrum,
  polygon,
  avalanche,
  bsc,
  optimism,
  gnosis,
  zkSync,
  zora,
  base,
  celo,
  aurora
]
export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  }
})

// 3. Create Web3Modal
export const modal = createWeb3Modal({
  wagmiConfig,
  projectId,
  chains
})

export default function HomePage() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return ready ? (
    <WagmiConfig config={wagmiConfig}>
      <Center h="80vh">
        <VStack gap={4}>
          <ConnectButton />
          <NetworksButton />
        </VStack>
      </Center>
    </WagmiConfig>
  ) : null
}
