import Button from "@/app/ui/Button";
import { cva } from "class-variance-authority";

const wrapper = cva(['grid grid-cols-4 gap-[10px] mb-[16px]']);
const btnWrapper = cva(['relative flex']);
const btn = cva(['py-[10px]']);
const span = cva(['absolute top-[-5px] right-[30px] text-orange text-[12px] rounded-full bg-white border-[1px] border-orange w-[19px] h-[19px] text-center']);

export default function Dates({ dates, setDate, activeDate }: { dates: Record<string, number>; setDate: (label: string) => void; activeDate: string; }) {
    return (
        <div className={wrapper()}>
            {Object.entries(dates).map(([label, value]) => (
                <div className={btnWrapper()} key={label}>
                    <Button
                        classes={btn()}
                        onClick={() => setDate(label)}
                        label={label}
                        variant={label === activeDate ? "fullOrange" : "orangeBorder"}
                    />
                    <span className={span()}>{value}</span>
                </div>
            ))}
        </div>
    );
}