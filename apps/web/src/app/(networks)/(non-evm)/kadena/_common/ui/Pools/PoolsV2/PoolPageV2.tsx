import { Container, Separator } from '@sushiswap/ui'
import { PoolTransactionsV2 } from './PoolTransactionsV2'

import type { V2Pool } from '@sushiswap/graph-client/data-api'
import type { FC } from 'react'
import type { PoolByIdResponse } from '~kadena/_common/types/get-pool-by-id'
import { PoolChartV2 } from './PoolChartV2'
import { PoolComposition } from './PoolComposition'
import { PoolStats } from './PoolStats'
// import { UnknownTokenAlert } from './UnknownTokenAlert'

interface PoolPageV2 {
  pool: Awaited<PoolByIdResponse | undefined>
}

export const PoolPageV2: FC<PoolPageV2> = ({ pool }) => {
  return (
    <Container maxWidth="5xl" className="flex flex-col gap-4 px-4">
      {/* <UnknownTokenAlert pool={pool} /> */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <PoolChartV2 pool={pool} />
        </div>
        <div className="flex flex-col gap-6">
          <PoolComposition pool={pool} />
          <PoolStats pool={pool} />
        </div>
      </div>
      <div className="py-4">
        <Separator />
      </div>
      <PoolTransactionsV2 pool={pool} />
    </Container>
  )
}
