export type Messenger = "telegram" | "viber" | "whatsapp"

export type ContactFormValues = {
  name: string
  phone: string
  messenger: Messenger
}
