import { ArrowUpIcon } from '@heroicons/react-v1/solid'
import type { SearchToken } from '@sushiswap/graph-client/data-api'
import { Badge, Currency, LinkExternal } from '@sushiswap/ui'
import { NetworkIcon } from '@sushiswap/ui/icons/NetworkIcon'
import { type EvmChainId, evmChains, shortenAddress } from 'sushi'
import { Token } from 'sushi/currency'

export const TokenNetworkIcon = ({ token }: { token: SearchToken }) => {
  return (
    <div className="flex items-center gap-3.5 w-full">
      <Badge
        className="border border-slate-50 dark:border-slate-900 rounded-[4px] z-[11]"
        position="bottom-right"
        badgeContent={
          <NetworkIcon
            type="square"
            className="rounded-[3px]"
            // @TODO: fix this once we have the correct type
            chainId={token.chainId as EvmChainId}
            width={14}
            height={14}
          />
        }
      >
        <Currency.Icon
          disableLink
          currency={
            new Token({
              address: token.address,
              name: token.name,
              symbol: token.symbol,
              // @TODO: fix this once we have the correct type
              chainId: token.chainId as EvmChainId,
              decimals: token.decimals,
            })
          }
          width={32}
          height={32}
        />
      </Badge>
      <div className="flex flex-col items-start">
        <div className="text-xs font-semibold dark:text-pink-100">
          {token.symbol}
        </div>
        <LinkExternal
          // @TODO: fix this once we have the correct type
          href={evmChains[token.chainId as EvmChainId].getTokenUrl(
            token.address,
          )}
          className="text-xs flex items-center gap-0.5 !text-muted-foreground dark:text-pink-200"
        >
          {shortenAddress(token.address)}
          <ArrowUpIcon width={10} height={10} className="rotate-45" />
        </LinkExternal>
      </div>
    </div>
  )
}
