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
      duration={4000}
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gradient-to-br group-[.toaster]:from-primary/95 group-[.toaster]:to-secondary/90 group-[.toaster]:backdrop-blur-xl group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-white/20 group-[.toaster]:shadow-[0_8px_32px_rgba(158,189,19,0.3)] group-[.toaster]:rounded-2xl group-[.toaster]:text-sm group-[.toaster]:p-4 group-[.toaster]:max-w-[320px] group-[.toaster]:animate-in group-[.toaster]:slide-in-from-top-4 group-[.toaster]:zoom-in-95 group-[.toaster]:fade-in-0 group-[.toaster]:duration-400 group-[.toaster]:ease-out",
          description: "group-[.toast]:text-white/90 group-[.toast]:text-xs group-[.toast]:mt-1",
          actionButton:
            "group-[.toast]:bg-white group-[.toast]:text-primary group-[.toast]:text-xs group-[.toast]:font-semibold group-[.toast]:px-3 group-[.toast]:py-1.5 group-[.toast]:rounded-full group-[.toast]:hover:bg-white/90 group-[.toast]:transition-all group-[.toast]:shadow-md",
          cancelButton:
            "group-[.toast]:bg-white/20 group-[.toast]:text-white group-[.toast]:text-xs group-[.toast]:rounded-full group-[.toast]:hover:bg-white/30",
          error: "group-[.toaster]:from-red-500/95 group-[.toaster]:to-red-600/90 group-[.toaster]:border-red-400/30 group-[.toaster]:shadow-[0_8px_32px_rgba(239,68,68,0.3)]",
          success: "group-[.toaster]:from-primary/95 group-[.toaster]:to-secondary/90 group-[.toaster]:border-primary/30 group-[.toaster]:shadow-[0_8px_32px_rgba(158,189,19,0.35)]",
          warning: "group-[.toaster]:from-amber-500/95 group-[.toaster]:to-orange-500/90 group-[.toaster]:border-amber-400/30 group-[.toaster]:shadow-[0_8px_32px_rgba(245,158,11,0.3)]",
          info: "group-[.toaster]:from-blue-500/95 group-[.toaster]:to-indigo-500/90 group-[.toaster]:border-blue-400/30 group-[.toaster]:shadow-[0_8px_32px_rgba(59,130,246,0.3)]",
          title: "group-[.toast]:text-sm group-[.toast]:font-bold group-[.toast]:tracking-tight",
          closeButton: "group-[.toast]:bg-white/20 group-[.toast]:border-white/30 group-[.toast]:hover:bg-white/40 group-[.toast]:rounded-full group-[.toast]:h-5 group-[.toast]:w-5 group-[.toast]:text-white group-[.toast]:transition-colors",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
