import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      expand={false}
      richColors
      closeButton
      duration={3000}
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:border-border/50 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:text-xs group-[.toaster]:p-3 group-[.toaster]:max-w-[280px] group-[.toaster]:animate-in group-[.toaster]:slide-in-from-top-2 group-[.toaster]:fade-in-0 group-[.toaster]:duration-300",
          description: "group-[.toast]:text-muted-foreground group-[.toast]:text-[10px]",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:text-[10px] group-[.toast]:px-2 group-[.toast]:py-1 group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:text-[10px] group-[.toast]:rounded-lg",
          error: "group-[.toaster]:bg-destructive/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive/50",
          success: "group-[.toaster]:bg-primary/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-primary-foreground group-[.toaster]:border-primary/50",
          warning: "group-[.toaster]:bg-amber-500/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-white group-[.toaster]:border-amber-400/50",
          info: "group-[.toaster]:bg-blue-500/95 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-white group-[.toaster]:border-blue-400/50",
          title: "group-[.toast]:text-xs group-[.toast]:font-semibold",
          closeButton: "group-[.toast]:bg-background/80 group-[.toast]:border-border/50 group-[.toast]:hover:bg-muted group-[.toast]:rounded-full group-[.toast]:h-5 group-[.toast]:w-5",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
