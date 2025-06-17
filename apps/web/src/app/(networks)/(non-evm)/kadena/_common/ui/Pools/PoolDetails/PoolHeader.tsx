'use client'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import {
  Button,
  Currency,
  LinkExternal,
  SkeletonCircle,
  SkeletonText,
  typographyVariants,
} from '@sushiswap/ui'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useBaseTokens } from '~kadena/_common/lib/hooks/use-base-tokens'
import { usePoolById } from '~kadena/_common/lib/hooks/use-pool-by-id'
import { getChainwebAddressLink } from '~kadena/_common/lib/utils/kadena-helpers'
import { Icon } from '~kadena/_common/ui/General/Icon'
import { usePoolDispatch, usePoolState } from '../pool-provider'

export const PoolHeader = ({ poolId }: { poolId: string }) => {
  const router = useRouter()

  const { data: baseTokens } = useBaseTokens()
  console.log(baseTokens)
  const { data: pool, isLoading: isLoadingPoolById } = usePoolById({
    poolId,
    first: 10,
  })
  const { setToken0, setToken1 } = usePoolDispatch()
  const { token0, token1, poolId: poolAddress, isLoadingPool } = usePoolState()

  const isLoading = isLoadingPoolById || isLoadingPool

  useEffect(() => {
    if (pool?.token0) {
      const _token0 = baseTokens?.find(
        (token) => token.tokenAddress === pool.token0.address,
      )
      setToken0({
        tokenAddress: pool?.token0?.address,
        tokenSymbol: _token0?.tokenSymbol ?? '',
        tokenDecimals: _token0?.tokenDecimals ?? 12,
        tokenName: _token0?.tokenName ?? pool.token0.name,
        tokenImage: _token0?.tokenImage ?? '',
      })
    }
    if (pool?.token1) {
      const _token1 = baseTokens?.find(
        (token) => token.tokenAddress === pool.token1.address,
      )
      setToken1({
        tokenAddress: pool?.token1?.address,
        tokenSymbol: _token1?.tokenSymbol ?? '',
        tokenDecimals: _token1?.tokenDecimals ?? 12,
        tokenName: _token1?.tokenName ?? pool.token1.name,
        tokenImage: _token1?.tokenImage ?? '',
      })
    }
  }, [pool?.token0, pool?.token1, setToken0, setToken1, baseTokens])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <button
          className="text-sm text-blue hover:underline w-fit"
          type="button"
          onClick={() => {
            router.back()
          }}
        >
          ← Back
        </button>
        {isLoading ? (
          <div className="flex items-center w-full gap-3">
            <div className="flex items-center">
              <SkeletonCircle radius={40} />
              <SkeletonCircle radius={40} className="-ml-[13.33px]" />
            </div>
            <div className="w-[200px]">
              <SkeletonText fontSize="3xl" />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center gap-3 max-w-[100vh]">
            <Currency.IconList iconWidth={36} iconHeight={36}>
              <Icon currency={token0} />
              <Icon currency={token1} />
            </Currency.IconList>
            <Button
              asChild
              variant="link"
              className={typographyVariants({
                variant: 'h1',
                className:
                  'sm:!text2-xl sm:!text-4xl !font-bold text-gray-900 dark:text-slate-50 truncate overflow-x-auto',
              })}
            >
              <LinkExternal href={getChainwebAddressLink(poolAddress ?? '')}>
                {token0?.tokenSymbol}/{token1?.tokenSymbol}
              </LinkExternal>
            </Button>
            {/* <div className="bg-pink/20 text-pink text-sm px-2 py-1 font-semibold rounded-full mt-0.5">
              V2
            </div> */}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-y-5 gap-x-[32px] text-secondary-foreground mb-8 mt-1.5">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold tracking-tighter">Fee</span>
          0.3%
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold tracking-tighter">Network</span>
          Kadena
        </div>
        {isLoading ? (
          <>
            <div className="w-48">
              <SkeletonText />
            </div>
            <div className="w-48">
              <SkeletonText />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tighter">
                {token0?.tokenSymbol}
              </span>
              <LinkExternal
                target="_blank"
                href={getChainwebAddressLink(token0?.tokenAddress ?? '')}
              >
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="!font-medium !text-secondary-foreground"
                >
                  {`${token0?.tokenName}`}
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </Button>
              </LinkExternal>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tracking-tighter">
                {token1?.tokenSymbol}
              </span>
              <LinkExternal
                target="_blank"
                href={getChainwebAddressLink(token1?.tokenAddress ?? '')}
              >
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="!font-medium !text-secondary-foreground"
                >
                  {`${token1?.tokenName}`}
                  <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                </Button>
              </LinkExternal>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
