'use client';
import * as Tabs from '@radix-ui/react-tabs';

export function SettingsTabs() {
  return (
    <>
      <Tabs.Root>
        <Tabs.List className="mt-2 mb-6 flex w-full items-center gap-4 border-b border-zinc-400 ">
          <Tabs.TabsTrigger
            value="details"
            className="px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-orange-500"
          >
            <span>Principal</span>
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            value="details"
            className="px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-orange-500"
          >
            <span>Secundário</span>
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            value="details"
            className="px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-orange-500"
          >
            <span>Técnico</span>
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            value="details"
            className="px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-orange-500"
          >
            <span>Setor</span>
          </Tabs.TabsTrigger>
          <Tabs.TabsTrigger
            value="details"
            className="px-1 pb-4 text-sm font-medium text-zinc-500 hover:text-orange-500"
          >
            <span>Categoria</span>
          </Tabs.TabsTrigger>
        </Tabs.List>
      </Tabs.Root>
    </>
  );
}
