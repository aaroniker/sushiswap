import { cloudinaryLogoFetchLoader } from '@sushiswap/ui'
import Image from 'next/image'
import { hashStringToColor } from '~kadena/_common/lib/utils/formatters'
import type { KadenaToken } from '~kadena/_common/types/token-type'

type IconProps = {
  currency: KadenaToken | undefined
  height?: number
  width?: number
}

export const Icon = ({ currency, height = 40, width = 40 }: IconProps) => {
  return (
    <>
      {currency?.tokenImage ? (
        <div
          style={{ width, height }}
          className="relative flex overflow-hidden rounded-full shrink-0"
        >
          <Image
            loader={cloudinaryLogoFetchLoader}
            // @TODO: need this to render local images, remove when we have a CDN
            unoptimized
            src={currency.tokenImage}
            alt={currency.tokenSymbol}
            height={height}
            width={width}
            className="w-full h-full aspect-square"
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center text-xs font-bold text-white rounded-full bg-gradient-to-b from-gray-300 to-gray-200 dark:from-blue-700 dark:to-blue-900"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            background: hashStringToColor(
              currency ? `${currency.tokenSymbol} ${currency.name}` : '??',
            ),
          }}
        >
          {currency?.tokenSymbol?.substring(0, 2) ?? '??'}
        </div>
      )}
    </>
  )
}
