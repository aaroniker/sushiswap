'use client'

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  classNames,
} from '@sushiswap/ui'
import { useState } from 'react'
import { DCAOrdersTable } from '../dca-orders-table/dca-orders-table'
import { HistoryTable } from '../history-tables/history-table'
import { LimitOrdersTable } from '../limit-orders-table/limit-orders-table'
import { TradeTableFilters } from './trade-table-filters'

export const TABS = [
  {
    label: 'Limit Orders (2)',
    value: 'limit-orders',
  },
  {
    label: 'DCA Orders',
    value: 'dca-orders',
  },
  {
    label: 'History',
    value: 'history',
  },
]

export const TradeTableTabs = () => {
  const [currentTab, setCurrentTab] = useState(TABS[0].value)

  return (
    <Tabs
      defaultValue={TABS[0].value}
      onValueChange={setCurrentTab}
      className="-mx-5 md:mx-0"
    >
      <div className="flex flex-col items-start justify-between xl:items-center xl:flex-row">
        <TabsList className="!px-5 w-full md:!px-0 md:!pb-0 !pb-6 !justify-start bg-white dark:bg-background border-t-0 border-l-0 border-r-0 rounded-none shadow-none md:rounded-lg md:border-none md:mx-0">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              asChild
              value={tab.value}
              className="bg-transparent"
            >
              <Button
                size="sm"
                asChild
                className={classNames(
                  '!shadow-none data-[state=active]:!text-blue  dark:data-[state=active]:!text-skyblue transition-colors !pl-3 !pt-2 border-none',
                  currentTab === tab.value
                    ? '!bg-blue/[8%] hover:!bg-blue/[15%] dark:!bg-[#3DB1FF]/[8%] dark:hover:!bg-[#3DB1FF]/[15%]'
                    : 'hover:!bg-blue/[8%] dark:hover:!bg-[#3DB1FF]/[8%]',
                )}
              >
                {tab.label}
              </Button>
            </TabsTrigger>
          ))}
        </TabsList>
        <TradeTableFilters />
      </div>
      <TabsContent
        value={TABS[0].value}
        className="px-5 !mt-0 !pt-2 bg-[#F9FAFB] dark:bg-slate-900 md:px-0 pb-[86px] md:pb-0"
      >
        <LimitOrdersTable />
      </TabsContent>
      <TabsContent
        value={TABS[1].value}
        className="px-5 !mt-0 !pt-2 bg-[#F9FAFB] dark:bg-slate-900 md:px-0 pb-[86px] md:pb-0"
      >
        <DCAOrdersTable />
      </TabsContent>
      <TabsContent
        value={TABS[2].value}
        className="px-5 !mt-0 !pt-2 bg-[#F9FAFB] dark:bg-slate-900 md:px-0 pb-[86px] md:pb-0"
      >
        <HistoryTable />
      </TabsContent>
    </Tabs>
  )
}
