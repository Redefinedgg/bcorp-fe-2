"use client";

import DashboardAvatar from "@/app/components/dashboard/avatar";
import DashboardContent from "@/app/components/dashboard/content";
import { cva } from "class-variance-authority";

const wrapper = cva(['container !py-[50px] flex']);
const leftBlock = cva(['flex flex-col mr-[19px] w-[30%]']);
const rightBlock = cva(['w-full']);

export default function Dashboard() {
    return (
        <div className={wrapper()}>
            <div className={leftBlock()}>
                <DashboardAvatar />
            </div>
            <div className={rightBlock()}>
                <DashboardContent />
            </div>
        </div>
    )
}