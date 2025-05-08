import { Container } from '@sushiswap/ui'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type React from 'react'
import { GlobalStatsCharts } from 'src/ui/explore/global-stats-charts'
import { TokensFiltersProvider } from 'src/ui/token/TokensFiltersProvider'
import type { EvmChainId } from 'sushi/chain'
import { SUSHISWAP_SUPPORTED_CHAIN_IDS, isSushiSwapChainId } from 'sushi/config'
import { SidebarContainer } from '~evm/_common/ui/sidebar'
import { NavigationItems } from '../navigation-items'

export const metadata: Metadata = {
  title: 'Tokens',
  description: 'Explore SushiSwap tokens.',
}

export default async function ExploreLayout(props: {
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
    <SidebarContainer
      selectedNetwork={chainId}
      supportedNetworks={SUSHISWAP_SUPPORTED_CHAIN_IDS}
      unsupportedNetworkHref={'/ethereum/explore/tokens'}
      shiftContent
    >
      <main className="flex flex-col h-full flex-1">
        <Container maxWidth="7xl" className="px-4 py-4">
          <GlobalStatsCharts chainId={chainId} />
        </Container>
        <Container maxWidth="7xl" className="px-4 flex gap-2 pb-4">
          <NavigationItems chainId={chainId} />
        </Container>
        <section className="flex flex-col flex-1">
          <div className="bg-gray-50 dark:bg-white/[0.02] border-t border-accent pt-4 pb-10 min-h-screen">
            <TokensFiltersProvider>{children}</TokensFiltersProvider>
          </div>
        </section>
      </main>
    </SidebarContainer>
  )
}
