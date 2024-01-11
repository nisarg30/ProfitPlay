import React from "react";
import searchBar from "../searchbar/searchbar";

const Portfolio = () => {
    return (
        <div className="portfolio-container">
            <div className="search-bar">
                <searchBar />
            </div>
            <div className="portfolio-overview">
                <div class="xl:p-3 p-2 bg-skin-hover">
                    <h3 class="text-sm font-medium text-skin-base mb-2.5">Equity Portfolio Overview</h3>
                    <div class="items-center border border-skin-grey bg-skin-white shadow-all px-5 xl:px-6 py-3 xl:py-[1.188rem] h-[5.188rem] xl:h-[4.375rem] flex flex-col xl:flex-row">
                        <div class="flex w-full xl:w-auto">
                            <div class="w-1/2 xl:w-auto xl:mr-8">
                                <div class="flex items-center">
                                    <div class="items-center hidden sm:flex justify-center bg-skin-royalblue rounded-full xl:h-8 xl:w-8 h-6 w-6 mr-2 text-skin-white text-xxs xl:text-sm">
                                        <span class="icon-rupee"></span>
                                    </div>
                                    <div class="xl:items-start xl:flex xl:flex-col flex items-center justify-start">
                                        <p class="text-xs text-skin-base xl:w-32 font-normal mb-1 inline">Investment Amount</p>
                                        <h2 class="font-semibold text-base leading-4 inline xl:block ml-1 xl:ml-0 whitespace-nowrap min-w-[6.688rem] text-skin-bold relative group">
                                            <span class="icon-rupee text-xs font-medium mr-px"></span>42,183.00
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 xl:w-auto">
                                <div class="flex items-center">
                                    <div class="items-center hidden sm:flex justify-center bg-skin-royalblue rounded-full xl:h-8 xl:w-8 h-6 w-6 mr-2 text-skin-white text-xxs xl:text-sm">
                                        <span class="icon-market-value"></span>
                                    </div>
                                    <div class="xl:items-start xl:flex xl:flex-col flex items-center justify-start">
                                        <p class="text-xs text-skin-base xl:w-32 font-normal mb-1 inline">Market Value</p>
                                        <h2 class="font-semibold text-base leading-4 inline xl:block ml-1 xl:ml-0 whitespace-nowrap min-w-[6.688rem] text-skin-bold relative group">
                                            <span class="icon-rupee text-xs font-medium mr-px"></span>41,512.00
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex xl:ml-8 w-full xl:w-auto">
                            <div class="w-1/2 xl:w-auto">
                                <div class="flex xl:flex-col flex-row mt-4 xl:mt-0 justify-items-start">
                                    <div class="flex justify-start items-center mb-1">
                                        <div class="flex items-center">
                                            <div class="flex items-center justify-center rounded-full h-3 w-3 mr-1 ml-1.5 xl:ml-0 text-skin-white bg-skin-down rotate-180">
                                                <img src="https://cdn.angelone.in/sparkweb/icons/arrow-icon.svg" />
                                            </div>
                                            <p class="text-xs text-skin-base font-normal whitespace-nowrap">Overall Loss</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-start min-w-[10rem] w-auto">
                                        <div class="flex">
                                            <h3 class="font-semibold text-sm leading-4 block xl:inline whitespace-nowrap ml-1 xl:ml-0 relative group text-skin-down">
                                                <span class="icon-rupee text-[0.6875rem] font-bold mr-px"></span>670.41
                                            </h3>
                                            <p class="text-xs text-skin-muted font-medium ml-1 block xl:inline whitespace-nowrap">-1.59%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-1/2 xl:w-auto">
                                <div class="flex xl:flex-col flex-row mt-4 xl:mt-0 justify-items-start">
                                    <div class="flex justify-start items-center mb-1">
                                        <div class="flex items-center">
                                            <div class="flex items-center justify-center rounded-full h-3 w-3 mr-1 ml-1.5 xl:ml-0 text-skin-white bg-skin-up">
                                                <img src="https://cdn.angelone.in/sparkweb/icons/arrow-icon.svg"/>
                                            </div>
                                            <p class="text-xs text-skin-base font-normal whitespace-nowrap">Today's Gain</p>
                                        </div>
                                    </div>
                                    <div class="flex justify-start min-w-[10rem] w-auto">
                                        <div class="flex">
                                            <h3 class="font-semibold text-sm leading-4 block xl:inline whitespace-nowrap ml-1 xl:ml-0 relative group text-skin-up">
                                                <span class="icon-rupee text-[0.6875rem] font-bold mr-px"></span>12.80
                                            </h3>
                                            <p class="text-xs text-skin-muted font-medium ml-1 block xl:inline whitespace-nowrap">+0.03%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ticker-container">

            </div>
        </div>
    )
}