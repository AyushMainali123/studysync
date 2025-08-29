import { Button } from '@studysync/ui/components/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@studysync/ui/components/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '../../../../components/logo';
import { NavMenu } from './nav-menu';

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="pt-2 pl-3">
          <Logo />
        </div>
        <NavMenu orientation="vertical" className="mt-12" />
      </SheetContent>
    </Sheet>
  );
};
