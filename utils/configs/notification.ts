import { NotificationKey } from "../types/notifications";
import SuccessIcon from "@/assets/ui/notifications/Success.svg";
import InfoIcon from "@/assets/ui/notifications/Info.svg";
import WarningIcon from "@/assets/ui/notifications/CircleWavyWarningFill.svg";
import ErrorIcon from "@/assets/ui/notifications/ErrorRounded.svg";
import { SvgProps } from "react-native-svg";
import { useTheme } from "@/hooks/useTheme";

export type NotificationConfigItem = {
  icon: React.FC<SvgProps>;
  mainColor: string;
  titleColor: string;
};

export const notificationConfig: Record<
  NotificationKey,
  NotificationConfigItem
> = {
  success: {
    icon: SuccessIcon,
    mainColor: "#27b400",
    titleColor: "",
  },
  warning: {
    icon: WarningIcon,
    mainColor: "#ff9800",
    titleColor: "",
  },
  error: {
    icon: ErrorIcon,
    mainColor: "#b40000",
    titleColor: "",
  },
  info: {
    icon: InfoIcon,
    mainColor: "#2196f3",
    titleColor: "",
  },
};
