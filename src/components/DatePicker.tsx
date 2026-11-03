
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import "react-day-picker/style.css";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const selectedDate = value
    ? new Date(`${value}T12:00:00`)
    : undefined;

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex w-full items-center justify-between
          rounded-xl border border-[#075985]
          bg-[#04131f] px-3 py-3 h-11
          text-white transition hover:border-[#00C9F2]
        "
      >
        <span className="flex items-center gap-3">
          <LuCalendarDays className="text-xl text-[#94A3B8]" />
          <span className={value ? "text-white" : "text-gray-500"}>
            {value
              ? format(selectedDate!, "dd/MM/yyyy")
              : "dd/mm/aaaa"}
          </span>
        </span>

        <LuCalendarDays className="text-xl text-[#00C9F2]" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar calendário"
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <div className="
            absolute left-0 top-full z-50 mt-1
            rounded-xl border border-[#075985]
            bg-[#031727] p-3 shadow-xl
          ">
            <DayPicker
              mode="single"
              locale={ptBR}
              selected={selectedDate}
              defaultMonth={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onChange(format(date, "yyyy-MM-dd"));
                  setOpen(false);
                }
              }}
              classNames={{
                root: "text-white",
                months: "flex flex-col",
                month: "space-y-4",
                month_caption: "flex justify-center items-center h-6 relative",
                caption_label: "text-white font-bold capitalize",
                nav: "absolute right-0 flex items-center gap-1",
                button_previous: "h-8 w-8 flex items-center justify-center rounded-lg text-[#00C9F2] hover:bg-[#075985] cursor-pointer z-999",
                button_next: "h-8 w-8 flex mr-2 items-center justify-center rounded-lg text-[#00C9F2] hover:bg-[#075985] cursor-pointer z-999",
                chevron: "fill-[#00C9F2]",
                month_grid: "w-full border-collapse",
                weekdays: "flex",
                weekday: "w-10 text-center text-xs font-semibold text-[#94A3B8]",
                week: "flex w-full mt-1.5",
                day: "h-7 w-10 text-center text-sm",
                day_button: "h-9 w-9 rounded-lg text-white transition hover:bg-[#075985] focus:outline-none focus:ring-2 focus:ring-[#00C9F2]",
                selected: "bg-[#00C9F2] text-[#031727] font-bold rounded-lg h-9",
                today: "text-[#37E359] font-bold",
                outside: "text-[#64748B] opacity-50",
                disabled: "text-gray-600 opacity-30",
                hidden: "invisible",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;
