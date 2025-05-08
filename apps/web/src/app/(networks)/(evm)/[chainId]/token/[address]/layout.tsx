import {
  SushiSwapChainIds,
  isSushiSwapChainId,
} from '@sushiswap/graph-client/data-api'
import { notFound } from 'next/navigation'
import type { EvmChainId } from 'sushi/chain'
import { SidebarContainer, SidebarProvider } from '~evm/_common/ui/sidebar'
import { Header } from '../../header'
import { Providers } from './providers'

export default async function PoolLayout(props: {
  children: React.ReactNode
  params: Promise<{ chainId: string }>
}) {
  const params = await props.params

  const { children } = props

  const chainId = +params.chainId as EvmChainId
  if (!isSushiSwapChainId(chainId)) {
    return notFound()
  }

  return (
    <Providers>
      <SidebarProvider>
        <Header chainId={chainId} />
        <SidebarContainer
          selectedNetwork={chainId}
          supportedNetworks={SushiSwapChainIds}
          unsupportedNetworkHref={'/ethereum/explore/tokens'}
          shiftContent
        >
          <main className="flex flex-col h-full flex-1">{children}</main>
        </SidebarContainer>
      </SidebarProvider>
    </Providers>
  )
}
