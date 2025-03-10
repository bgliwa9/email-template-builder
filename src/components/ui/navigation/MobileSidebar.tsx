"use client"

import { siteConfig } from "@/app/siteConfig"
import { Button } from "@/components/Button"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger
} from "@/components/Drawer"
import { cx, focusRing } from "@/lib/utils"
import {
  RiArrowDownSLine,
  RiBuildingLine,
  RiDashboardLine,
  RiHome2Line,
  RiLineChartLine,
  RiLinkM,
  RiMegaphoneLine,
  RiMenuLine,
  RiReceiptLine,
  RiSettings5Line
} from "@remixicon/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { HqOLogo } from "./HqOLogo"
import { UserProfileMobile } from "./UserProfile"

// Main navigation items excluding the ones that will go into the Asset Manager section
const navigation = [
  { name: "My HqO", href: siteConfig.baseLinks.overview, icon: RiHome2Line },
  { name: "Resources", href: siteConfig.baseLinks.resources, icon: RiLinkM },
  { name: "Analytics", href: siteConfig.baseLinks.analytics, icon: RiLinkM },
  {
    name: "Settings & setup",
    href: siteConfig.baseLinks.settings.general,
    icon: RiSettings5Line,
  },
] as const

// Asset Manager sub-navigation items
const assetManagerItems = [
  { name: "Buildings", href: siteConfig.baseLinks.buildings },
  { name: "Tenants", href: siteConfig.baseLinks.tenants },
  { name: "Users", href: siteConfig.baseLinks.users },
  { name: "Vendors", href: siteConfig.baseLinks.vendors },
  { name: "Audiences", href: siteConfig.baseLinks.audiences },
] as const

// Payments sub-navigation items
const paymentsItems = [
  { name: "Transactions", href: siteConfig.baseLinks.transactions },
  { name: "Credits", href: siteConfig.baseLinks.credits },
  { name: "Discounts", href: siteConfig.baseLinks.discounts },
] as const

// Experience Manager sub-navigation items
const experienceManagerItems = [
  { name: "Content", href: siteConfig.baseLinks.experienceManager.content },
  { name: "Amenity posts", href: siteConfig.baseLinks.experienceManager.amenityPosts },
  { name: "Events", href: siteConfig.baseLinks.experienceManager.events },
  { name: "Surveys", href: siteConfig.baseLinks.experienceManager.surveys },
  { name: "Community forum", href: siteConfig.baseLinks.experienceManager.communityForum },
  { name: "Communications", href: siteConfig.baseLinks.experienceManager.communications },
] as const

// Operations sub-navigation items
const operationsItems = [
  { name: "Access Control", href: siteConfig.baseLinks.operations.accessControl },
  { name: "Mobile Access", href: siteConfig.baseLinks.operations.mobileAccess },
  { name: "Visitor Management", href: siteConfig.baseLinks.operations.visitorManagement },
  { name: "Capacity Manager", href: siteConfig.baseLinks.operations.capacityManager },
  { name: "Resource Booking", href: siteConfig.baseLinks.operations.resourceBooking },
  { name: "Work Orders", href: siteConfig.baseLinks.operations.workOrders },
  { name: "Parking", href: siteConfig.baseLinks.operations.parking },
  { name: "Energy consumption", href: siteConfig.baseLinks.operations.energyConsumption },
] as const

// Settings and setup sub-navigation items
const settingsAndSetupItems = [
  { name: "Features", href: siteConfig.baseLinks.settingsAndSetup.features },
  { name: "SSO Apps", href: siteConfig.baseLinks.settingsAndSetup.ssoApps },
  { name: "Connected apps", href: siteConfig.baseLinks.settingsAndSetup.connectedApps },
  { name: "Settings", href: siteConfig.baseLinks.settingsAndSetup.settings },
  { name: "Theme", href: siteConfig.baseLinks.settingsAndSetup.theme },
] as const

// Intelligence sub-navigation items
const intelligenceItems = [
  { name: "Dashboard", href: siteConfig.baseLinks.intelligence.dashboard },
  { name: "Assessments", href: siteConfig.baseLinks.intelligence.assessments },
  { name: "About Intelligence", href: siteConfig.baseLinks.intelligence.aboutIntelligence },
] as const

// Type for section IDs to ensure type safety
type SectionId = 'assetManager' | 'payments' | 'experienceManager' | 'operations' | 'settingsAndSetup' | 'intelligence';

const shortcuts = [
  {
    name: "Add new user",
    href: "/settings/users",
    icon: RiLinkM,
  },
  {
    name: "Workspace usage",
    href: "/settings/billing#billing-overview",
    icon: RiLinkM,
  },
  {
    name: "Cost spend control",
    href: "/settings/billing#cost-spend-control",
    icon: RiLinkM,
  },
  {
    name: "My HqO – Rows written",
    href: "/my-hqo#usage-overview",
    icon: RiLinkM,
  },
] as const

export default function MobileSidebar() {
  const pathname = usePathname()
  // Use a single state for the open section
  const [openSection, setOpenSection] = useState<SectionId | null>(null)

  // Check if current path is in each section
  const isInAssetManager = assetManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInPayments = paymentsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInExperienceManager = experienceManagerItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInOperations = operationsItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInSettingsAndSetup = settingsAndSetupItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  const isInIntelligence = intelligenceItems.some(item =>
    pathname === item.href || pathname.startsWith(item.href + "/")
  )

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (isInAssetManager) {
      setOpenSection('assetManager')
    } else if (isInPayments) {
      setOpenSection('payments')
    } else if (isInExperienceManager) {
      setOpenSection('experienceManager')
    } else if (isInOperations) {
      setOpenSection('operations')
    } else if (isInSettingsAndSetup) {
      setOpenSection('settingsAndSetup')
    } else if (isInIntelligence) {
      setOpenSection('intelligence')
    }
  }, [isInAssetManager, isInPayments, isInExperienceManager, isInOperations, isInSettingsAndSetup, isInIntelligence])

  const isActive = (itemHref: string) => {
    return pathname === itemHref || pathname.startsWith(itemHref + "/")
  }

  // Toggle section open/closed
  const toggleSection = (section: SectionId) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          aria-label="open sidebar"
          className="group flex items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100 data-[state=open]:bg-gray-100 data-[state=open]:bg-gray-400/10 hover:dark:bg-gray-400/10"
        >
          <RiMenuLine
            className="size-6 shrink-0 sm:size-5"
            aria-hidden="true"
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <div className="flex items-center px-2">
            <HqOLogo className="h-6 w-auto" />
          </div>
        </DrawerHeader>
        <DrawerBody>
          <nav
            aria-label="core mobile navigation links"
            className="flex flex-1 flex-col space-y-10"
          >
            <ul role="list" className="space-y-1.5">
              {/* Regular navigation items */}
              {navigation.map((item) => (
                <li key={item.name}>
                  <DrawerClose asChild>
                    <Link
                      href={item.href}
                      className={cx(
                        isActive(item.href)
                          ? "text-primary dark:text-primary-400"
                          : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                        "flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                        focusRing,
                      )}
                    >
                      <item.icon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  </DrawerClose>
                </li>
              ))}

              {/* Experience Manager accordion */}
              <li className={cx(
                openSection === 'experienceManager' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('experienceManager')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'experienceManager'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'experienceManager'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiMegaphoneLine className="size-4 shrink-0" aria-hidden="true" />
                    Experience Manager
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'experienceManager' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'experienceManager' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {experienceManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Operations accordion */}
              <li className={cx(
                openSection === 'operations' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('operations')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'operations'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'operations'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiDashboardLine className="size-4 shrink-0" aria-hidden="true" />
                    Operations
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'operations' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'operations' ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {operationsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Payments accordion */}
              <li className={cx(
                openSection === 'payments' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('payments')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'payments'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'payments'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiReceiptLine className="size-4 shrink-0" aria-hidden="true" />
                    Payments
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'payments' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'payments' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {paymentsItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Asset Manager accordion */}
              <li className={cx(
                openSection === 'assetManager' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('assetManager')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'assetManager'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'assetManager'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiBuildingLine className="size-4 shrink-0" aria-hidden="true" />
                    Asset Manager
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'assetManager' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'assetManager' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {assetManagerItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Intelligence accordion */}
              <li className={cx(
                openSection === 'intelligence' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('intelligence')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'intelligence'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'intelligence'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiLineChartLine className="size-4 shrink-0" aria-hidden="true" />
                    Intelligence
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'intelligence' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'intelligence' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {intelligenceItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Settings and setup accordion */}
              <li className={cx(
                openSection === 'settingsAndSetup' ? "bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden pb-1" : ""
              )}>
                <button
                  onClick={() => toggleSection('settingsAndSetup')}
                  className={cx(
                    "flex w-full items-center justify-between gap-x-2.5 px-3 py-2 text-sm transition",
                    openSection === 'settingsAndSetup'
                      ? "text-gray-900 dark:text-gray-50"
                      : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-900 rounded-md",
                    focusRing,
                  )}
                  aria-expanded={openSection === 'settingsAndSetup'}
                >
                  <span className="flex items-center gap-x-2.5">
                    <RiSettings5Line className="size-4 shrink-0" aria-hidden="true" />
                    Settings and setup
                  </span>
                  <RiArrowDownSLine
                    className={cx(
                      "size-4 shrink-0 transition-transform duration-300 ease-in-out",
                      openSection === 'settingsAndSetup' ? "rotate-0" : "-rotate-90"
                    )}
                    aria-hidden="true"
                  />
                </button>

                {/* Sub-navigation items with animation */}
                <div
                  className={cx(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openSection === 'settingsAndSetup' ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
                  )}
                >
                  <ul className="space-y-1 px-2">
                    {settingsAndSetupItems.map((item) => (
                      <li key={item.name}>
                        <DrawerClose asChild>
                          <Link
                            href={item.href}
                            className={cx(
                              "flex items-center rounded-md px-3 py-2 text-sm transition w-full mx-1",
                              isActive(item.href)
                                ? "bg-white dark:bg-gray-900 text-primary dark:text-primary-400 shadow-sm"
                                : "text-[#696E72] hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50 hover:bg-gray-50 hover:dark:bg-gray-800",
                              focusRing,
                            )}
                          >
                            {item.name}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
            <div>
              <span className="text-xs font-medium leading-6 text-gray-500">
                Shortcuts
              </span>
              <ul aria-label="shortcuts" role="list" className="space-y-0.5">
                {shortcuts.map((item) => (
                  <li key={item.name}>
                    <DrawerClose asChild>
                      <Link
                        href={item.href}
                        className={cx(
                          pathname === item.href || pathname.startsWith(item.href)
                            ? "text-primary dark:text-primary-400"
                            : "text-gray-700 hover:text-gray-900 dark:text-gray-400 hover:dark:text-gray-50",
                          "flex items-center gap-x-2.5 rounded-md px-1.5 py-1.5 text-sm font-medium transition hover:bg-gray-100 hover:dark:bg-gray-900",
                          focusRing,
                        )}
                      >
                        <item.icon
                          className="size-4 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </DrawerClose>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <UserProfileMobile />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
