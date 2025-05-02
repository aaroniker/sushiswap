import type React from 'react'
import { POOL_SUPPORTED_NETWORKS } from 'src/config'
import type { ChainId } from 'sushi/chain'
import { Header } from '../header'

export default async function ExploreLayout(props: {
  children: React.ReactNode
  params: Promise<{ chainId: string }>
}) {
  const params = await props.params

  const { children } = props

  const chainId = +params.chainId as ChainId

  return (
    <>
      <Header chainId={chainId} supportedNetworks={POOL_SUPPORTED_NETWORKS} />
      {children}
    </>
  )
}
