import type { ChildrenProps } from 'react';
import { Button, Drawer } from 'react-daisyui';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ClientIcon from '@/components/icons/ClientIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import SignOutIcon from '@/components/icons/SignOutIcon';
import UserIcon from '@/components/icons/UserIcon';
import logo from '@/public/logo.png';

interface DrawerButtonProps extends ChildrenProps {
  href?: string;
  pathname?: string;
}

function DrawerButton({ href, pathname: path, children }: DrawerButtonProps) {
  const router = useRouter();

  const isMatched = router.pathname === path;

  if (href) {
    return (
      <Link
        className={clsx(
          'btn-square btn',
          isMatched
            ? 'btn-primary'
            : 'btn-accent bg-background text-darker-background',
        )}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      shape="square"
      color={isMatched ? 'primary' : 'accent'}
      className={isMatched ? undefined : 'bg-background text-darker-background'}
    >
      {children}
    </Button>
  );
}

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex">
      <Drawer
        className="max-w-[100px]"
        open
        side={
          <div className="flex flex-col gap-6.5 bg-white p-6.5">
            <Image
              alt="logo"
              src={logo}
              className="mb-1.5"
              width={48}
              height={48}
            />
            <DrawerButton href="/" pathname="/">
              <ClientIcon />
            </DrawerButton>
            <DrawerButton pathname="/users/[userId]">
              <UserIcon />
            </DrawerButton>
            <DrawerButton>
              <SettingIcon />
            </DrawerButton>
            <div className="flex-1" />
            <DrawerButton>
              <SignOutIcon />
            </DrawerButton>
          </div>
        }
      />
      <div className="w-full bg-background p-5">
        <div className="container mx-auto max-w-screen-lg">{children}</div>
      </div>
    </div>
  );
}
