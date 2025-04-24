'use client'

import { ChevronDownIcon } from '@heroicons/react-v1/solid'
import {
  Badge,
  Navigation,
  SushiNavigationDropdown,
  classNames,
} from '@sushiswap/ui'
import { NetworkIcon } from '@sushiswap/ui/icons/NetworkIcon'
import { SushiIcon } from '@sushiswap/ui/icons/SushiIcon'
import { SushiWithTextIcon } from '@sushiswap/ui/icons/SushiWithTextIcon'
import React, { type FC, Suspense } from 'react'
import { NonStandardChainId, SUPPORTED_NETWORKS } from 'src/config'
import { HeaderNetworkSelector } from 'src/lib/wagmi/components/header-network-selector'
import { SidebarToggle, useSidebar } from 'src/ui/sidebar'
import { useAccount, useChainId } from 'wagmi'
import { HeaderElements } from './_common/header-elements'
import { WalletConnector } from './_common/ui/WalletConnector/WalletConnector'
import { useKadena } from './kadena-wallet-provider'

export const Header: FC = () => {
  const { isConnected } = useKadena()

  const evmChainId = useChainId()

  const { isConnected: isEVMConnected } = useAccount()

  const { isOpen } = useSidebar()

  return (
    <div className="z-20 flex">
      <div
        className={classNames(
          'hidden lg:flex justify-between items-center px-1 w-56 h-14 flex-shrink-0 bg-gray-100 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 border-b',
          isOpen && 'border-b-gray-100 dark:border-b-slate-900',
        )}
      >
        <SushiNavigationDropdown className="!px-2">
          <SushiWithTextIcon width={90} />
        </SushiNavigationDropdown>
        <SidebarToggle variant="ghost" className="!px-2" asChild>
          <Badge
            position="bottom-right"
            badgeContent={
              isConnected || isEVMConnected ? (
                <div className="bg-green rounded-full w-2 h-2 mr-0.5 mb-0.5" />
              ) : (
                <div />
              )
            }
          >
            <NetworkIcon
              chainId={isConnected ? NonStandardChainId.KADENA : evmChainId}
              width={22}
              height={22}
            />
          </Badge>
          <ChevronDownIcon className="w-3 h-3" />
        </SidebarToggle>
      </div>
      <div className="flex items-center justify-between pl-4 bg-gray-100 border-b border-gray-200 lg:hidden dark:bg-slate-900 dark:border-slate-800">
        <SushiNavigationDropdown>
          <SushiIcon width={24} height={24} />
        </SushiNavigationDropdown>
      </div>
      <Navigation
        className="!pl-0 lg:!pl-4 !z-[unset]"
        hideSushiDropdown
        leftElements={HeaderElements()}
        rightElement={
          <Suspense>
            <HeaderNetworkSelector
              networks={SUPPORTED_NETWORKS}
              selectedNetwork={NonStandardChainId.KADENA}
              className="flex lg:hidden"
            />
            <WalletConnector variant="secondary" />
          </Suspense>
        }
      />
    </div>
  )
}
