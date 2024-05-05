'use client';

import { Check, Upload, SearchIcon } from 'lucide-react';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';

const addingCafeSchema = z.object({
  cafe: z.string({
    required_error: '카페 이름은 필수입니다.',
  }),
  phone: z
    .string({
      required_error: '전화번호는 필수입니다.',
    })
    .regex(/^(\d{2,3}-\d{3,4}-\d{4})$/, '전화번호 형식이 올바르지 않습니다.'),
  coordinates: z
    .array(z.number())
    .length(2, '좌표는 반드시 2개의 숫자로 이루어져야 합니다.'),
  address: z.string({
    required_error: '주소는 필수입니다.',
  }),
  photos: z.array(z.string()).optional(),
});

const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
] as const;

type ProfileFormValues = z.infer<typeof addingCafeSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {};

export default function Home() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(addingCafeSchema),
    defaultValues,
    mode: 'onChange',
  });
  const [searchingWords, setSearchingWords] = useState();
  const [cafes, setCafes] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (searchingWords) {
      // 예를 들어 API 호출을 통해 좌표와 주소를 가져옵니다.
      fetch(`api/coordinates/${searchingWords}`)
        .then(response => response.json())
        .then(data => {});
    }
  }, [searchingWords]);

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: '값이 등록되었습니다.',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="flex flex-col max-w-screen-sm m-auto p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 grid-cols-3"
        >
          <FormField
            control={form.control}
            name="cafe"
            render={({ field }) => (
              <FormItem className="w-[350px] flex flex-col">
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
                        {field.value
                          ? languages.find(
                              language => language.value === field.value
                            )?.label
                          : 'Select language'}
                        <SearchIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[350px] p-0">
                    <Command>
                      <CommandInput placeholder="Type a command or search..." />
                      <CommandList>
                        {languages.map(language => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue('language', language.value);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                language.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {language.label}
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

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>전화번호(옵션)</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카페 사진 (필수)</FormLabel>
                <FormControl>
                  <div className="grid gap-2 max-w-xs">
                    <Image
                      alt="Product image"
                      className="aspect-square w-full rounded-md object-cover"
                      height="300"
                      src="/placeholder.svg"
                      width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <button type="button">
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        />
                      </button>
                      <button type="button">
                        <Image
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          src="/placeholder.svg"
                          width="84"
                        />
                      </button>
                      <button
                        type="button"
                        className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                      >
                        <Upload className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">카페사진 업로드</span>
                      </button>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations to
                  link to them.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">등록하기</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
