import React from "react";

const searchBar = () => {
    return (
        <div class="flex">
        <div class="border border-skin-grey flex items-center h-9 pl-3 mr-2 w-80">
            <em class="icon-search mr-2 text-skin-bold"></em>
            <input class="focus:outline-0 w-full text-sm text-skin-black bg-skin-white" type="text" placeholder="Search for stock or company" id="portfolio-search" />
        </div>

        <div class="flex relative group">
            <button id="btn_dropdownshow" class="icon-filter border relative border-skin-grey cursor-pointer flex items-center justify-center h-9 w-9 text-skin-bold"></button>
            <div class="flex flex-row items-center absolute z-20 whitespace-nowrap pointer-events-none rounded bg-skin-dark text-xs font-medium text-skin-white opacity-0 py-2 px-3 group-hover:opacity-100 ease-in-out duration-300 delay-100 top-full left-1/2 mt-3 -translate-x-1/2">
                <span class="absolute -z-10 h-2 w-2 rotate-45 rounded-sm bg-skin-dark ease-in-out duration-300 delay-100 top-[-3px] left-1/2 -translate-x-1/2"></span>
                <span>Filter</span>
            </div>
        </div>
    </div>

    )
}

export default searchBar;