import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Check } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { useGetCafeListQuery } from '@/app/_queries/useGetCafeListQuery';
import type { CafeSchema } from '@/app/page';

export default function CafeInputField() {
  const form = useFormContext<CafeSchema>();
  const { cafeOptions, keyword, setKeyword, getCafeMeta } =
    useGetCafeListQuery();
  return (
    <FormField
      control={form.control}
      name="cafe"
      render={({ field, formState }) => (
        <FormItem className="w-[380px] flex flex-col">
          <FormLabel>카페명 (필수)</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[382px] p-0">
              <Command>
                <CommandInput
                  placeholder="카페 이름을 검색하세요."
                  {...field}
                  onValueChange={keyword => setKeyword(keyword)}
                  value={keyword}
                />
                <CommandList>
                  <CommandEmpty>찾는 결과가 없습니다.</CommandEmpty>
                  {cafeOptions?.map(({ label, value }) => (
                    <CommandItem
                      value={label}
                      key={label}
                      onSelect={() => {
                        const meta = getCafeMeta(value);
                        if (!meta) return;

                        form.setValue('cafe', value);
                        form.setValue('coordinates', meta.coordinates);
                        form.setValue('address', meta.address);
                        if (meta.telephone) {
                          form.setValue('telephone', meta.telephone);
                        }
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          value === field.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {label}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
