import { LinkInternal } from '@sushiswap/ui'
import { PathnameButton } from 'src/ui/pathname-button'
import { type ChainId, ChainKey } from 'sushi/chain'

export function NavigationItems({ chainId }: { chainId: ChainId }) {
  return (
    <>
      <LinkInternal
        shallow={true}
        scroll={false}
        href={`/${ChainKey[chainId]}/explore/pools`}
      >
        <PathnameButton
          id="all-pools"
          pathname={`/${ChainKey[chainId]}/explore/pools`}
          asChild
          size="sm"
        >
          All Pools
        </PathnameButton>
      </LinkInternal>
    </>
  )
}
