"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/Dropdown"
import { CustomSwitch } from "@/components/ui/CustomSwitch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cx, focusInput } from "@/lib/utils"
import { RiBuildingLine, RiExpandUpDownLine, RiInformationLine } from "@remixicon/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import React, { useEffect } from "react"
import { ModalAddBuilding } from "./ModalAddBuilding"

const buildings = [
  {
    value: "retail-analytics",
    name: "125 Highland Ave",
    initials: "HA",
    color: "bg-primary dark:bg-primary-400",
    imageUrl: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  // Add more buildings...
]

export const BuildingsDropdownDesktop = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const [isPortfolioView, setIsPortfolioView] = React.useState(false)
  const [selectedBuilding, setSelectedBuilding] = React.useState(buildings[0])
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  const handleBuildingSelect = (building: typeof buildings[0]) => {
    setSelectedBuilding(building)
    setIsPortfolioView(false)
    setDropdownOpen(false)
  }

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[280px]">
        <DropdownMenu
          open={dropdownOpen}
          onOpenChange={setDropdownOpen}
          modal={false}
        >
          <DropdownMenuTrigger asChild>
            <button
              className={cx(
                "flex w-full items-center gap-x-2.5 rounded-md border border-gray-300 bg-white p-1.5 text-sm shadow-sm transition-all hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 hover:dark:bg-gray-900",
                focusInput,
              )}
            >
              <div className="flex shrink-0 items-center gap-x-2.5">
                {isPortfolioView ? (
                  <span
                    className="flex aspect-square size-6 items-center justify-center rounded bg-primary p-1 text-xs font-medium text-white dark:bg-primary-400"
                    aria-hidden="true"
                  >
                    <RiBuildingLine className="size-4" />
                  </span>
                ) : (
                  <div className="relative size-6 overflow-hidden rounded">
                    <Image
                      src={selectedBuilding.imageUrl}
                      alt={selectedBuilding.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between gap-x-2">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                  {isPortfolioView ? "All buildings" : selectedBuilding.name}
                </p>
                <RiExpandUpDownLine
                  className="size-4 shrink-0 text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px]"
            hidden={hasOpenDialog}
            onCloseAutoFocus={(event) => {
              if (focusRef.current) {
                focusRef.current.focus()
                focusRef.current = null
                event.preventDefault()
              }
            }}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                Buildings ({buildings.length})
              </DropdownMenuLabel>
              {buildings.map((building) => (
                <DropdownMenuItem
                  key={building.value}
                  onSelect={() => handleBuildingSelect(building)}
                >
                  <div className="flex w-full items-center gap-x-2.5">
                    <div className="relative size-6 overflow-hidden rounded">
                      <Image
                        src={building.imageUrl}
                        alt={building.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {building.name}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ModalAddBuilding
              onSelect={handleDialogItemSelect}
              onOpenChange={handleDialogItemOpenChange}
              itemName="Add building"
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden items-center whitespace-nowrap lg:flex">
        <Switch
          checked={isPortfolioView}
          onCheckedChange={setIsPortfolioView}
          size="small"
        />
        <span className="ml-2 text-sm font-medium text-text-primary dark:text-gray-50">
          Portfolio view
        </span>
      </div>
    </div>
  )
}

export const BuildingsDropdownMobile = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [hasOpenDialog, setHasOpenDialog] = React.useState(false)
  const [isPortfolioView, setIsPortfolioView] = React.useState(false)
  const [selectedBuilding, setSelectedBuilding] = React.useState(buildings[0])
  const [isAnimating, setIsAnimating] = React.useState(false)
  const dropdownTriggerRef = React.useRef<null | HTMLButtonElement>(null)
  const focusRef = React.useRef<null | HTMLButtonElement>(null)
  const pathname = usePathname()

  const portfolioAllowed = isPortfolioViewAllowed(pathname)
  const pageName = getPageName(pathname)

  // Effect to handle portfolio view toggle when navigating between pages
  useEffect(() => {
    if (isPortfolioView && !portfolioAllowed) {
      setIsAnimating(true);
      // Animate the toggle off
      setTimeout(() => {
        setIsPortfolioView(false);
        setIsAnimating(false);
      }, 300);
    }
  }, [pathname, isPortfolioView, portfolioAllowed]);

  const handleDialogItemSelect = () => {
    focusRef.current = dropdownTriggerRef.current
  }

  const handleDialogItemOpenChange = (open: boolean) => {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  const handleBuildingSelect = (building: typeof buildings[0]) => {
    setSelectedBuilding(building)
    setIsPortfolioView(false)
    setDropdownOpen(false)
  }

  const handlePortfolioToggle = (checked: boolean) => {
    if (portfolioAllowed) {
      setIsPortfolioView(checked);
    }
  };

  return (
    <>
      <DropdownMenu
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-x-2 rounded-md p-1.5 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-900">
            {/* Only show building image/icon and dropdown arrow */}
            {isPortfolioView ? (
              <span
                className="flex aspect-square size-6 items-center justify-center rounded bg-primary p-1 text-xs font-medium text-white dark:bg-primary-400"
                aria-hidden="true"
              >
                <RiBuildingLine className="size-4" />
              </span>
            ) : (
              <div className="relative size-6 overflow-hidden rounded">
                <Image
                  src={selectedBuilding.imageUrl}
                  alt={selectedBuilding.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <RiExpandUpDownLine
              className="size-4 shrink-0 text-gray-500"
              aria-hidden="true"
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[280px]"
          hidden={hasOpenDialog}
          onCloseAutoFocus={(event) => {
            if (focusRef.current) {
              focusRef.current.focus()
              focusRef.current = null
              event.preventDefault()
            }
          }}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>
              Buildings ({buildings.length})
            </DropdownMenuLabel>
            {buildings.map((building) => (
              <DropdownMenuItem
                key={building.value}
                onSelect={() => handleBuildingSelect(building)}
              >
                <div className="flex w-full items-center gap-x-2.5">
                  <div className="relative size-6 overflow-hidden rounded">
                    <Image
                      src={building.imageUrl}
                      alt={building.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    {building.name}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ModalAddBuilding
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
            itemName="Add building"
          />
          <DropdownMenuSeparator />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={cx(
                  "flex items-center whitespace-nowrap px-2 py-1.5 transition-opacity duration-300",
                  !portfolioAllowed && !isAnimating ? "opacity-50 cursor-not-allowed" : "opacity-100"
                )}>
                  <CustomSwitch
                    checked={isPortfolioView}
                    onCheckedChange={handlePortfolioToggle}
                    size="small"
                    disabled={!portfolioAllowed || isAnimating}
                    className={cx(
                      "transition-transform duration-300",
                      isAnimating ? "scale-90" : "scale-100"
                    )}
                  />
                  <span className="ml-2 text-sm font-medium text-text-primary dark:text-gray-50">
                    Portfolio view
                  </span>
                  {!portfolioAllowed && (
                    <RiInformationLine className="ml-1 size-4 text-gray-400" />
                  )}
                </div>
              </TooltipTrigger>
              {!portfolioAllowed && (
                <TooltipContent side="bottom">
                  <p>Portfolio view is not available for {pageName}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
