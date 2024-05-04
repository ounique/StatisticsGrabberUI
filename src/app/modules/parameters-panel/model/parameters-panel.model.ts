export type SGParametersPanelConfiguration = Readonly<{
    parameters: SGParametersPanelParameter[];
}>;

export type SGParametersPanelParameter = Readonly<{
    icon: string;
    label: string;
    unit: string;
    fieldKey: string;
}>;
