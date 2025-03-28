import { RemoveProvider } from '~kadena/_common/ui/Pools/Remove/pool-remove-provider'
import { PoolProvider } from '~kadena/_common/ui/Pools/pool-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PoolProvider>
      <RemoveProvider>{children}</RemoveProvider>
    </PoolProvider>
  )
}
