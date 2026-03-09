// Утилита для объединения CSS классов
type ClassValue = string | undefined | null | boolean | ClassValue[]

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((c) => typeof c === 'string' && c.length > 0)
    .join(' ')
}
