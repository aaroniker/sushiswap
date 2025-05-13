import { type VariantProps, cva } from 'class-variance-authority'
import type * as React from 'react'

import classNames from 'classnames'

const skeletonBgColorClassName =
  'bg-black/[0.10] dark:bg-white/[0.10] black:bg-white/[0.25]'
const skeletonFillColorClassName =
  'fill-black/[0.10] dark:fill-white/[0.10] black:fill-white/[0.25]'

function SkeletonBox(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        skeletonBgColorClassName,
        'rounded-lg overflow-hidden animate-pulse',
      )}
    />
  )
}

export interface CircleProps extends React.HTMLAttributes<HTMLDivElement> {
  radius: number
}

function SkeletonCircle(props: CircleProps) {
  return (
    <div
      {...props}
      style={{
        ...props.style,
        minWidth: props.radius,
        minHeight: props.radius,
        width: props.radius,
        height: props.radius,
      }}
      className={classNames(
        props.className,
        skeletonBgColorClassName,
        'rounded-full overflow-hidden animate-pulse',
      )}
    />
  )
}

const skeletonTextVariants = cva('flex w-full', {
  variants: {
    fontSize: {
      xs: 'h-[18px] py-[3px]',
      sm: 'h-5 py-[3px]',
      default: 'h-6 py-[3px]',
      lg: 'h-[28px] py-[3px]',
      xl: 'h-[28px]',
      '2xl': 'h-[36px] py-[3px]',
      '3xl': 'h-[44px] py-[6px]',
    },
    align: {
      left: '',
      center: 'justify-center',
      right: 'justify-end',
    },
  },
  defaultVariants: {
    fontSize: 'default',
    align: 'left',
  },
})

export interface SkeletonTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof skeletonTextVariants> {}

function SkeletonText({
  className,
  align,
  fontSize,
  ...props
}: SkeletonTextProps) {
  return (
    <div
      {...props}
      className={classNames(skeletonTextVariants({ align, fontSize }))}
    >
      <div
        className={classNames(
          className,
          skeletonBgColorClassName,
          'flex w-full h-full rounded-md overflow-hidden animate-pulse',
        )}
      />
    </div>
  )
}

type ChartType = 'area' | 'bar'

function ChartLoadingStateMask({
  type,
  height,
}: { type: ChartType; height: number }) {
  switch (type) {
    case 'area':
      return (
        <g transform={`translate(0, ${height - 40}) scale(1,-1)`}>
          <defs>
            <pattern
              id="wavePattern"
              patternUnits="userSpaceOnUse"
              width="200"
              height={height}
            >
              <path
                d="M-150 170 Q-100 90, -50 170 T50 170 T150 170 T250 170 V0 H-150 Z"
                className="fill-black/[0.10] dark:fill-white/[0.10]"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height={height}
            fill="url(#wavePattern)"
            className="animate-pulse"
          />
        </g>
      )
    case 'bar':
      return (
        <g transform={`translate(0, ${height - 40}) scale(1,-1)`}>
          {Array.from({ length: 25 }).map((_, i) => {
            const _height = Math.random() * height * 0.8 + 20
            return (
              <rect
                key={i}
                rx="3"
                width="3%"
                height={_height}
                x={`${i * (4 + 1 / 25)}%`}
                className={classNames(
                  skeletonFillColorClassName,
                  'animate-pulse',
                )}
              />
            )
          })}
        </g>
      )
    default:
      return null
  }
}

function SkeletonXChartAxe({
  height,
}: {
  height: number
}) {
  return (
    <svg transform={`translate(0, ${height - 19})`}>
      <rect
        width="7%"
        height="16"
        rx="3"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="7%"
        height="16"
        rx="3"
        x="23.25%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="7%"
        height="16"
        rx="3"
        x="46.5%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="7%"
        height="16"
        rx="3"
        x="69.75%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="7%"
        height="16"
        rx="3"
        x="93%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
    </svg>
  )
}

function SkeletonYChartAxe() {
  return (
    <g transform={`translate(0, 0)`}>
      <rect
        width="32px"
        height="16"
        rx="3"
        y="0%"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="32px"
        height="16"
        rx="3"
        y="23.25%"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="32px"
        height="16"
        rx="3"
        y="46.5%"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="32px"
        height="16"
        rx="3"
        y="69.75%"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
      <rect
        width="32px"
        height="16"
        rx="3"
        y="93%"
        x="0%"
        className={classNames(skeletonFillColorClassName, 'animate-pulse')}
      />
    </g>
  )
}

function SkeletonChart({
  height,
  type,
  showYChartAxe = false,
}: {
  height: number
  type: ChartType
  showYChartAxe?: boolean
}) {
  return (
    <div className="relative flex flex-row">
      {showYChartAxe && (
        <svg width={58} height={height - 32} xmlns="http://www.w3.org/2000/svg">
          <SkeletonYChartAxe />
        </svg>
      )}
      <svg
        width="100%"
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <SkeletonXChartAxe height={height} />
        <ChartLoadingStateMask type={type} height={height} />
      </svg>
    </div>
  )
}

export { SkeletonBox, SkeletonCircle, SkeletonText, SkeletonChart }
