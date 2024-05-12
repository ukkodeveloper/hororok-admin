import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Minus, MinusCircle, Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { CafeSchema } from '@/app/page';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function MenuField() {
  const form = useFormContext<CafeSchema>();
  return (
    <FormField
      control={form.control}
      name="menu"
      render={({ field }) => (
        <FormItem>
          <FormLabel>메뉴</FormLabel>
          <FormControl>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">메뉴</TableHead>
                  <TableHead className="w-[30%]">가격</TableHead>
                  <TableHead className="w-[15%]">이미지</TableHead>
                  <TableHead className="w-[5%]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <Input />
                  </TableCell>
                  <TableCell className="text-right">
                    <Input />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" type="button">
                      등록
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" type="button">
                      <Minus />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="bg-white hover:bg-none">
                <TableRow>
                  <TableCell colSpan={2} />
                  <TableCell colSpan={2}>
                    <Button size="sm" type="button" variant="ghost">
                      <Plus className="w-4" />
                      메뉴 추가하기
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
