import { cn } from '@studysync/ui/lib/utils';

interface ITypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function TypographyH1({ children, className, as }: ITypographyProps) {
  const Component = as || 'h1';
  return (
    <Component
      className={cn(
        'text-4xl font-extrabold tracking-tight text-balance',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function TypographyH2({ children, className, as }: ITypographyProps) {
  const Component = as || 'h2';
  return (
    <Component
      className={cn('text-3xl font-semibold tracking-tight', className)}
    >
      {children}
    </Component>
  );
}

export function TypographyH3({ children, className, as }: ITypographyProps) {
  const Component = as || 'h3';
  return (
    <Component
      className={cn('text-2xl font-semibold tracking-tight', className)}
    >
      {children}
    </Component>
  );
}

export function TypographyH4({ children, className, as }: ITypographyProps) {
  const Component = as || 'h4';
  return (
    <Component
      className={cn('text-xl font-semibold tracking-tight', className)}
    >
      {children}
    </Component>
  );
}

export function TypographyP({ children, className, as }: ITypographyProps) {
  const Component = as || 'p';
  return (
    <Component
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
    >
      {children}
    </Component>
  );
}

export function TypographyBlockquote({
  children,
  className,
  as,
}: ITypographyProps) {
  const Component = as || 'blockquote';
  return (
    <Component className={cn('border-l-2 pl-6 italic', className)}>
      {children}
    </Component>
  );
}

export function TypographyInlineCode({
  children,
  className,
  as,
}: ITypographyProps) {
  const Component = as || 'code';
  return (
    <Component
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
    >
      {children}
    </Component>
  );
}

export function TypographyLead({ children, className, as }: ITypographyProps) {
  const Component = as || 'p';
  return (
    <Component className={cn('text-muted-foreground text-xl', className)}>
      {children}
    </Component>
  );
}

export function TypographyLarge({ children, className, as }: ITypographyProps) {
  const Component = as || 'p';
  return (
    <Component className={cn('text-lg font-semibold', className)}>
      {children}
    </Component>
  );
}

export function TypographySmall({ children, className, as }: ITypographyProps) {
  const Component = as || 'small';
  return (
    <Component className={cn('text-sm leading-none font-medium', className)}>
      {children}
    </Component>
  );
}

export function TypographyMuted({ children, className, as }: ITypographyProps) {
  const Component = as || 'p';
  return (
    <Component className={cn('text-muted-foreground text-sm', className)}>
      {children}
    </Component>
  );
}
