import { useToast } from "@/hooks/use-toast";
import { appActions, appState } from "@/stores/slices/app";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../ui/toast";

export function Toaster() {
  const dispatch = useDispatch();
  const { toasts, toast } = useToast();
  const { notification } = useSelector(appState);

  useEffect(() => {
    if (!notification) {
      return;
    }

    toast({
      description: notification.message,
      variant: notification.variant,
      duration: 2000,
    });
  }, [notification, toast]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            onOpenChange={(open) => {
              if (!open) {
                dispatch(appActions.clearNotification());
              }
              props.onOpenChange?.(open);
            }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
