import { type ComponentProps, useEffect } from 'react'
import { TokenInput } from '~kadena/_common/ui/Input/TokenInput'
import { usePoolDispatch, usePoolState } from '../pool-provider'

export const AmountInToken0 = ({
  theme = 'default',
  disabled = false,
}: {
  theme?: ComponentProps<typeof TokenInput>['theme']
  disabled?: boolean
}) => {
  const {
    token0,
    token1,
    amountInToken0,
    poolId,
    rateOfToken1ToToken0,
    inputField,
  } = usePoolState()
  const { setToken0, setAmountInToken0, setAmountInToken1, setInputField } =
    usePoolDispatch()

  const pairExists = Boolean(poolId)

  const rateOfToken1 = rateOfToken1ToToken0 ?? 0

  // biome-ignore lint/correctness/useExhaustiveDependencies: rateOfToken1 will be defined when the pool exists
  useEffect(() => {
    if (inputField === 'token1') {
      return
    }
    if (pairExists && amountInToken0 === '') {
      setAmountInToken1('')
      return
    }
    if (pairExists && rateOfToken1 && token1) {
      const amountFormatted =
        rateOfToken1 * Number.parseFloat(amountInToken0 || '0')
      if (amountFormatted) {
        setAmountInToken1(String(amountFormatted))
      } else {
        setAmountInToken1('')
      }
    }
  }, [amountInToken0, pairExists, token1, inputField, setAmountInToken1])

  const setAmount = (amount: string) => {
    setInputField('token0')
    setAmountInToken0(amount)
  }

  return (
    <TokenInput
      theme={theme}
      type="input"
      amount={amountInToken0}
      setAmount={setAmount}
      currency={token0}
      setToken={disabled ? undefined : setToken0}
    />
  )
}
