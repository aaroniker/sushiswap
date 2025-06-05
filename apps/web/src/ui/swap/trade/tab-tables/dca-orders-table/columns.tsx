import { formatUSD } from 'sushi/format'

import { formatPercent } from 'sushi/format'

import {
  Chip,
  Currency,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@sushiswap/ui'

import { formatNumber } from 'sushi/format'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { NetworkIcon } from '@sushiswap/ui/icons/NetworkIcon'
import type { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DollarCircledIcon } from 'src/ui/icons/dollar-circled'
import type { DCAOrder } from './dca-orders-table'

export const SIZE_COLUMN: ColumnDef<DCAOrder> = {
  id: 'size',
  header: 'Size',
  enableSorting: false,
  accessorFn: (row) => row.sizeAmount,
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <Currency.Icon
        disableLink
        currency={row.original.token}
        width={24}
        height={24}
      />{' '}
      <div className="flex flex-col">
        <span>
          {formatNumber(row.original.sizeAmount)} {row.original.token.symbol}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatUSD(row.original.sizeUSD)}
        </span>
      </div>
    </div>
  ),
}

export const SPENT_COLUMN: ColumnDef<DCAOrder> = {
  id: 'spent',
  header: 'Spent',
  enableSorting: false,
  accessorFn: (row) => row.spentAmount,
  cell: ({ row }) => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span>
          {formatNumber(row.original.spentAmount)} {row.original.token.symbol}
        </span>
        <Chip className="dark:bg-[#222137] bg-[#E8E7EB] !p-2 dark:text-slate-500 text-slate-450">
          {formatPercent(row.original.spentPercent)}
        </Chip>
      </div>
      <span className="text-xs text-muted-foreground">
        {row.original.ordersRemaining}/{row.original.ordersTotal} Order
        Remaining
      </span>
    </div>
  ),
}

export const FILLED_COLUMN: ColumnDef<DCAOrder> = {
  id: 'filled',
  header: 'Filled',
  enableSorting: false,
  accessorFn: (row) => row.filledPercent,
  cell: ({ row }) => (
    <div className="flex items-center gap-2">
      <Currency.Icon
        disableLink
        currency={row.original.token}
        width={24}
        height={24}
      />{' '}
      <span>
        {formatNumber(row.original.totalAmount)} {row.original.token.symbol}
      </span>
    </div>
  ),
}

export const AVG_PRICE_USD_COLUMN: ColumnDef<DCAOrder> = {
  id: 'avgPriceUsd',
  header: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1">
            <span>Avg. Price</span>
            <span className="inline-flex items-center dark:text-skyblue text-blue font-normal gap-[1px] border-b border-dashed border-current pb-[1px]">
              <DollarCircledIcon />
              <span>USD</span>
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Toggle to view price in USD or token pair unit.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  enableSorting: false,
  accessorFn: (row) => row.avgPriceUsd,
  cell: ({ row }) => <span>{formatUSD(row.original.avgPriceUsd)}</span>,
}

export const EXPIRES_COLUMN: ColumnDef<DCAOrder> = {
  id: 'expires',
  header: 'Expires',
  enableSorting: false,
  accessorFn: (row) => row.expires,
  cell: ({ row }) => {
    const formattedDate = format(
      new Date(row.original.expires),
      'MM/dd/yy h:mm a',
    )
    console.log(`Formatted expiration date: ${formattedDate}`)
    return formattedDate
  },
}

export const CHAIN_COLUMN: ColumnDef<DCAOrder> = {
  id: 'chain',
  header: 'Chain',
  enableSorting: false,
  accessorFn: (row) => row.chainId,
  cell: ({ row }) => (
    <NetworkIcon
      type="square"
      chainId={row.original.chainId}
      width={20}
      height={20}
      className="rounded-sm"
    />
  ),
}

export const ACTION_COLUMN: ColumnDef<DCAOrder> = {
  id: 'action',
  header: 'Action',
  enableSorting: false,
  accessorFn: (row) => row.id,
  cell: () => (
    <XMarkIcon
      className="w-4 h-4 ml-auto cursor-pointer text-red"
      aria-label="Cancel order"
    />
  ),
}
