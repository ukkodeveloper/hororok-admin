import { useFormContext } from 'react-hook-form';
import type { CafeSchema } from '@/app/page';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TimePickerDemo } from '@/components/ui/timePicker';
import { WavesIcon } from 'lucide-react';

export default function HoursField() {
  const form = useFormContext<CafeSchema>();

  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();

  const [daysChecked, setDaysChecked] = useState<{
    [key: string]: boolean;
  }>({
    월: true,
    화: true,
    수: true,
    목: true,
    금: true,
    토: true,
    일: true,
  });

  const dayList = Object.keys(daysChecked);

  return (
    <FormField
      control={form.control}
      name="hours"
      render={({ field: { value, onChange } }) => (
        <FormItem>
          <FormLabel>영업 시간 (옵션)</FormLabel>
          <div className="space-y-6 p-4 bg-zinc-100 rounded-md">
            <div className="flex w-full gap-2 ">
              {Object.entries(daysChecked).map(([day, checked], index) => (
                <Button
                  className="w-full"
                  key={day}
                  variant={checked ? 'default' : 'secondary'}
                  type="button"
                  onClick={() => {
                    setDaysChecked(prev => {
                      return {
                        ...prev,
                        [day]: !prev[day],
                      };
                    });
                  }}
                >
                  {day}
                </Button>
              ))}
            </div>
            <div className="flex  justify-between items-center">
              <TimePickerDemo
                date={startTime}
                setDate={date => {
                  setStartTime(date);
                }}
              />
              <WavesIcon className="mt-auto mb-2" />
              <TimePickerDemo
                date={endTime}
                setDate={date => {
                  setEndTime(date);
                }}
              />
              <Button
                className="mt-auto"
                variant="outline"
                type="button"
                onClick={() => {
                  if (startTime && endTime) {
                    const startTimeStr = startTime.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    const endTimeStr = endTime.toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    });
                    onChange(
                      value.map((hour, index) =>
                        daysChecked[dayList[index]]
                          ? [startTimeStr, endTimeStr]
                          : hour
                      )
                    );
                  }
                }}
              >
                선택 적용
              </Button>
            </div>
          </div>
          <FormControl>
            <div className="flex flex-col gap-6">
              {value.map((hour, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <span className="font-bold">{dayList[index]}</span>
                  <div className="border-b border-b-neutral-300 flex gap-4 items-center w-52 justify-evenly">
                    <span className="text-zinc-500 px-4">{hour[0]}</span>
                    <span>~</span>
                    <span className="text-zinc-500 px-4">{hour[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
