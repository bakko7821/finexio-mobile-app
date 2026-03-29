import WarningIcon from "@/assets/ui/notifications/CircleWavyWarningFill.svg";
import ErrorIcon from "@/assets/ui/notifications/ErrorRounded.svg";
import InfoIcon from "@/assets/ui/notifications/Info.svg";
import SuccessIcon from "@/assets/ui/notifications/Success.svg";
import { SvgProps } from "react-native-svg";
import { NotificationKey } from "../types/notifications";

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
    titleColor: "#ffffff",
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
