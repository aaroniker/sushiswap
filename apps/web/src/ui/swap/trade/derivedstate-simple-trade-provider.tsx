'use client'

import { useParams, usePathname } from 'next/navigation'
import {
  type FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { type SupportedChainId, isSupportedChainId } from 'src/config'
import { EvmChainId } from 'sushi/chain'
import { EvmChainKey } from 'sushi/chain'
import {
  TRADE_MODES,
  TRADE_VIEWS,
  type TradeMode,
  type TradeView,
  isSupportedTradeModeOnChainId,
} from './config'
import { TradeModeContext } from './trade-mode-buttons'

interface State {
  mutate: {
    setTradeMode(tradeMode: TradeMode): void
    setTradeView(tradeView: TradeView): void
  }
  state: {
    tradeView: TradeView
    tradeMode: TradeMode
    tradeModeChanged: boolean
    chainId: EvmChainId
  }
}

const DerivedStateSimpleTradeContext = createContext<State>({} as State)

interface DerivedStateSimpleTradeProviderProps {
  children: React.ReactNode
}

const resolveViewModeFromPathname = (pathname: string): TradeView => {
  const view = pathname.split('/')?.[3]
  return TRADE_VIEWS.includes(view as TradeView)
    ? (view as TradeView)
    : 'simple'
}

const createUrl = (
  chainId: EvmChainId,
  view: TradeView,
  mode: TradeMode,
): string => {
  const newPath = `/${EvmChainKey[chainId]}/${mode}${view !== 'simple' ? `/${view}` : ''}`
  return new URL(`${window.location.origin}${newPath}`).toString()
}

/* Parses the URL and provides the tradeMode and chainId globally.
 * URL example:
 * /swap || /limit || /dca ...
 */
const DerivedstateSimpleTradeProvider: FC<
  DerivedStateSimpleTradeProviderProps
> = ({ children }) => {
  const pathname = usePathname()
  const { chainId: _chainId, trade } = useParams()
  const chainId =
    _chainId && isSupportedChainId(+_chainId)
      ? (+_chainId as SupportedChainId)
      : EvmChainId.ETHEREUM
  const [tradeMode, _setTradeMode] = useState<TradeMode>(trade as TradeMode)
  const [tradeView, _setTradeView] = useState<TradeView>(
    resolveViewModeFromPathname(pathname),
  )
  const [tradeModeChanged, _setTradeModeChanged] = useState<boolean>(false)

  const setTradeView = useCallback(
    (view: TradeView) => {
      if (view === tradeView) {
        return
      }

      _setTradeView(view)
      _setTradeModeChanged(false)
      window.history.pushState({}, '', createUrl(chainId, view, tradeMode))
    },
    [chainId, tradeView, tradeMode],
  )

  const setTradeMode = useCallback(
    (trade: TradeMode) => {
      if (trade === tradeMode) {
        return
      }

      _setTradeMode(trade)
      _setTradeModeChanged(true)
      window.history.pushState({}, '', createUrl(chainId, tradeView, trade))
    },
    [chainId, tradeView, tradeMode],
  )

  return (
    <DerivedStateSimpleTradeContext.Provider
      value={useMemo(() => {
        return {
          mutate: {
            setTradeMode,
            setTradeView,
          },
          state: {
            tradeView,
            tradeMode,
            tradeModeChanged,
            chainId,
          },
        }
      }, [
        tradeMode,
        tradeView,
        chainId,
        setTradeMode,
        setTradeView,
        tradeModeChanged,
      ])}
    >
      <TradeModeContext.Provider
        value={useMemo(
          () => ({
            tradeMode,
            supportedTradeModes: TRADE_MODES.filter((item) =>
              isSupportedTradeModeOnChainId(item, chainId),
            ),
            switchTradeMode: setTradeMode,
          }),
<<<<<<< HEAD
          [tradeMode, setTradeMode],
=======
          [tradeMode, setTradeMode, chainId],
>>>>>>> 1d8c958171 (fix: lint)
        )}
      >
        {children}
      </TradeModeContext.Provider>
    </DerivedStateSimpleTradeContext.Provider>
  )
}

const useDerivedStateSimpleTrade = () => {
  const context = useContext(DerivedStateSimpleTradeContext)
  if (!context) {
    throw new Error(
      'Hook can only be used inside Simple Trade Derived State Context',
    )
  }

  return context
}

export { DerivedstateSimpleTradeProvider, useDerivedStateSimpleTrade }
