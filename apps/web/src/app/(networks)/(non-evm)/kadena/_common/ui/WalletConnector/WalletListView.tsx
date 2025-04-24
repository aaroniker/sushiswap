import { List, SelectIcon } from '@sushiswap/ui'
import Image from 'next/image'
import { useKadena } from '~kadena/kadena-wallet-provider'

export const WalletListView = () => {
  const { adapters, handleConnect } = useKadena()

  return (
    <List className="flex flex-col gap-1 !p-0">
      <List.Control className="bg-gray-100">
        {adapters.map((adapter) => (
          <List.MenuItem
            icon={() => (
              <Image
                src={adapter.imageURI}
                alt={adapter.name}
                width={12}
                height={12}
              />
            )}
            className="flex items-center justify-start w-full px-0 text-left"
            key={adapter.name}
            title={adapter.name}
            onClick={() => {
              adapter.detected
                ? handleConnect(adapter.name)
                : window.open(adapter.installUrl, '_blank')
            }}
            hoverIcon={() => <SelectIcon className="-rotate-90" />}
          />
        ))}
      </List.Control>
    </List>
  )
}
