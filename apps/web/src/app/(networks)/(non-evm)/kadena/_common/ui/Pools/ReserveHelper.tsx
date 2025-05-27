import { useEffect, useState } from 'react'
import { getValidTokenAddress } from '~tron/_common/lib/utils/helpers'
import { usePoolDispatch, usePoolState } from './pool-provider'

export const ReserveHelper = () => {
  const { token0, token1, poolId } = usePoolState()
  const { setReserve0, setReserve1 } = usePoolDispatch()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1200)
  }, [])

  const data = [
    {
      reserve: '123',
      address:
        'abf594a764e49a90a98cddf30872d8497e37399684c1d8e2b8e96fd865728cc2',
      decimals: 12,
      logoURI: '',
      name: 'Token1',
      symbol: 'TKN1',
    },
  ]

  useEffect(() => {
    if (!poolId) {
      setReserve0('')
      setReserve1('')
    }
    if (!isLoading && data && data?.length > 0 && poolId && token0 && token1) {
      const reserve0 = data.find(
        (d) =>
          getValidTokenAddress(d.address!) ===
          getValidTokenAddress(token0?.tokenAddress),
      )
      const reserve1 = data.find(
        (d) =>
          getValidTokenAddress(d.address!) ===
          getValidTokenAddress(token1?.tokenAddress),
      )
      setReserve0(reserve0?.reserve ?? '')
      setReserve1(reserve1?.reserve ?? '')
    }
  }, [isLoading, poolId, token0, token1, setReserve0, setReserve1])

  return null
}
