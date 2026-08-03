import type { ComponentProps, ReactElement } from "react"

import type { SocialName } from "@/lib/contacts"

function BaseIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  )
}

function InstagramIcon(props: ComponentProps<"svg">) {
  return (
    <BaseIcon {...props}>
      <path d="M14.1667 1.6665H5.83332C3.53214 1.6665 1.66666 3.53198 1.66666 5.83317V14.1665C1.66666 16.4677 3.53214 18.3332 5.83332 18.3332H14.1667C16.4678 18.3332 18.3333 16.4677 18.3333 14.1665V5.83317C18.3333 3.53198 16.4678 1.6665 14.1667 1.6665Z" />
      <path d="M9.99999 13.3332C11.8409 13.3332 13.3333 11.8408 13.3333 9.99984C13.3333 8.15889 11.8409 6.6665 9.99999 6.6665C8.15904 6.6665 6.66666 8.15889 6.66666 9.99984C6.66666 11.8408 8.15904 13.3332 9.99999 13.3332Z" />
      <path
        d="M14.5833 5.83333C14.8134 5.83333 15 5.64679 15 5.41667C15 5.18655 14.8134 5 14.5833 5C14.3532 5 14.1667 5.18655 14.1667 5.41667C14.1667 5.64679 14.3532 5.83333 14.5833 5.83333Z"
        fill="currentColor"
      />
    </BaseIcon>
  )
}

function TelegramIcon(props: ComponentProps<"svg">) {
  return (
    <BaseIcon {...props}>
      <path d="M17.5 2.5L2.5 8.75L8.33333 10L10 15L13.3333 11.6667L17.5 15.8333V2.5Z" />
    </BaseIcon>
  )
}

function FacebookIcon(props: ComponentProps<"svg">) {
  return (
    <BaseIcon {...props}>
      <path d="M15 1.6665H12.5C11.3949 1.6665 10.3351 2.10549 9.55373 2.88689C8.77233 3.66829 8.33334 4.7281 8.33334 5.83317V8.33317H5.83334V11.6665H8.33334V18.3332H11.6667V11.6665H14.1667L15 8.33317H11.6667V5.83317C11.6667 5.61216 11.7545 5.4002 11.9108 5.24391C12.067 5.08763 12.279 4.99984 12.5 4.99984H15V1.6665Z" />
    </BaseIcon>
  )
}

function TiktokIcon(props: ComponentProps<"svg">) {
  return (
    <BaseIcon {...props}>
      <path d="M7.49999 10.0002C6.84072 10.0002 6.19625 10.1957 5.64809 10.5619C5.09993 10.9282 4.67268 11.4488 4.42039 12.0579C4.1681 12.667 4.10209 13.3372 4.23071 13.9838C4.35932 14.6304 4.67679 15.2243 5.14297 15.6905C5.60914 16.1567 6.20309 16.4742 6.84969 16.6028C7.49629 16.7314 8.16652 16.6654 8.7756 16.4131C9.38469 16.1608 9.90529 15.7336 10.2716 15.1854C10.6378 14.6372 10.8333 13.9928 10.8333 13.3335V3.3335C10.8333 4.43856 11.2723 5.49837 12.0537 6.27977C12.8351 7.06118 13.8949 7.50016 15 7.50016" />
    </BaseIcon>
  )
}

const ICONS: Record<SocialName, (props: ComponentProps<"svg">) => ReactElement> = {
  Instagram: InstagramIcon,
  Telegram: TelegramIcon,
  Facebook: FacebookIcon,
  TikTok: TiktokIcon,
}

export function SocialIcon({ name, className }: { name: SocialName; className?: string }) {
  const Icon = ICONS[name]

  return <Icon aria-hidden className={className} />
}
