import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { Upload } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { type LegacyRef, useImperativeHandle, useRef } from 'react';
import type { CafeSchema } from '@/app/page';

export default function ImageField() {
  const form = useFormContext<CafeSchema>();
  const hiddenInputRef = useRef<HTMLElement>(null);
  const { ref, onChange, ...rest } = form.register('images');

  const handleClickUpload = () => {
    hiddenInputRef.current?.click();
  };

  const handleSwitch = (index: number) => () => {
    const imageFiles = form.getValues('images');

    if (index <= 0 || index >= imageFiles.length) {
      return;
    }

    const imageFilesArray = Array.from(imageFiles);

    const imageSelected = imageFilesArray.splice(index, 1)[0];
    imageFilesArray.unshift(imageSelected);

    form.setValue('images', imageFilesArray);
  };

  useImperativeHandle(ref, () => hiddenInputRef.current);

  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>카페 사진 (필수)</FormLabel>
            <FormControl>
              <div className="grid gap-2 max-w-xs">
                <Image
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover border border-gray-300"
                  height="300"
                  src={
                    field.value?.[0]
                      ? URL.createObjectURL(field.value[0])
                      : '/placeholder.svg'
                  }
                  width="300"
                />
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={handleSwitch(1)}>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover border border-gray-300"
                      height="84"
                      src={
                        field.value?.[1]
                          ? URL.createObjectURL(field.value[1])
                          : '/placeholder.svg'
                      }
                      width="84"
                    />
                  </button>
                  <button type="button" onClick={handleSwitch(2)}>
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover border border-gray-300"
                      height="84"
                      src={
                        field.value?.[2]
                          ? URL.createObjectURL(field.value[2])
                          : '/placeholder.svg'
                      }
                      width="84"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                    onClick={handleClickUpload}
                  >
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">카페사진 업로드</span>
                  </button>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={hiddenInputRef as LegacyRef<HTMLInputElement>}
                  className="sr-only"
                  onChange={e => {
                    const images = Array.from(e.target.files ?? []);
                    form.setValue('images', images);
                  }}
                  {...rest}
                  multiple
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
