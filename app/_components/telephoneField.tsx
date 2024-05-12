import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import type { CafeSchema } from '@/app/page';

export default function TelephoneField() {
  const form = useFormContext<CafeSchema>();

  return (
    <FormField
      control={form.control}
      name="telephone"
      render={({ field }) => (
        <FormItem className="w-[380px]">
          <FormLabel>전화번호(옵션)</FormLabel>
          <FormControl>
            <Input placeholder="02-" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
