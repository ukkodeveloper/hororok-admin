import { FormField } from '@/components/ui/form';

import { MinusCircle, Plus, Upload, AlertCircle } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
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
import { type LegacyRef, useImperativeHandle, useRef } from 'react';
import { compress } from '@/app/_utils/compress';
import Image from 'next/image';

export default function MenuField() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'menu',
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">메뉴 이름</TableHead>
            <TableHead className="w-[30%]">가격</TableHead>
            <TableHead className="w-[15%]">이미지</TableHead>
            <TableHead className="w-[5%]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={control}
              name="menu"
              render={() => (
                <TableRow>
                  <TableCell>
                    <Input {...register(`menu.${index}.name`)} />
                  </TableCell>
                  <TableCell className="flex">
                    <Input
                      type="number"
                      {...register(`menu.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                  </TableCell>
                  <TableCell>
                    <UploadCell index={index} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      type="button"
                    >
                      <MinusCircle />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            />
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <p className="text-gray-600 flex gap-2 items-center">
                <AlertCircle />
                입력창에 메뉴 이름과 가격을 적지 않으면 등록이 되지 않습니다.
              </p>
            </TableCell>

            <TableCell colSpan={2}>
              <Button
                onClick={() => append({ name: '', price: 0, image: '' })}
                type="button"
              >
                <Plus className="w-4 h-4" />
                추가하기
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

const UploadCell = ({ index }: { index: number }) => {
  const form = useFormContext<CafeSchema>();
  const hiddenInputRef = useRef<HTMLElement>(null);
  const { ref, onChange, ...rest } = form.register(`menu.${index}.image`);

  const image = form.watch(`menu.${index}.image`);

  const handleClickUpload = () => {
    hiddenInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files?.[0];

    if (!_file) return;

    const [file] = await compress([_file]);

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = loadEvent => {
        if (loadEvent.target) {
          const base64Image = loadEvent.target.result as string;
          form.setValue(`menu.${index}.image`, base64Image);
        } else {
          console.error('이미지 로드에 실패');
        }
      };
      reader.readAsDataURL(file);
    } else {
      console.error('이미지 로드에 실패');
    }
  };

  useImperativeHandle(ref, () => hiddenInputRef.current);

  return (
    <>
      <Button
        variant={image ? 'secondary' : 'outline'}
        size="icon"
        onClick={handleClickUpload}
        type="button"
      >
        {image ? (
          <Image alt="업로드할 이미지" src={image} width={20} height={20} />
        ) : (
          <Upload />
        )}
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={hiddenInputRef as LegacyRef<HTMLInputElement>}
        className="sr-only"
        onChange={handleFileUpload}
        {...rest}
      />
    </>
  );
};
