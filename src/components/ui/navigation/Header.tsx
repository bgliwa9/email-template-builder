"use client"

import { HeaderActions } from "./HeaderActions"
import MobileSidebar from "./MobileSidebar"
import { BuildingsDropdownDesktop, BuildingsDropdownMobile } from "./SidebarBuildingsDropdown"
import { UserProfileMobile } from "./UserProfile"

export function Header() {
    return (
        <header className="sticky top-0 z-40 bg-white border-0 shadow-none dark:bg-gray-950 lg:ml-[2px]">
            {/* Mobile header */}
            <div className="flex h-16 items-center justify-between px-2 lg:hidden bg-white dark:bg-gray-950">
                <BuildingsDropdownMobile />
                <div className="flex items-center gap-1 sm:gap-2">
                    <HeaderActions />
                    <UserProfileMobile />
                    <MobileSidebar />
                </div>
            </div>

            {/* Desktop header */}
            <div className="hidden h-16 items-center justify-between px-6 lg:flex bg-white dark:bg-gray-950">
                <BuildingsDropdownDesktop />
                <HeaderActions />
            </div>
        </header>
    )
} 