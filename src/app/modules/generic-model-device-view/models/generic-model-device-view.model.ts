export type SGGenericModelDeviceViewConfig = Readonly<{
    title: string;
    icon: string;
}>;

export enum SGGenericModelDeviceViewMenuItemType {
    INPUT_PARAMS_CHANGE = "inputParamsChange",
    EMIT_EMERGENCY = "emitEmergency"
}

export type SGGenericModelDeviceViewMenuItem = Readonly<{
    id: SGGenericModelDeviceViewMenuItemType;
    text: string;
    icon?: string;
}>;
