export type SGFormConfig = Readonly<{
    name: string
    groups: SGFormGroupConfig[];
}>;

export type SGFormGroupConfig = Readonly<{
    name: string;
    label: string;
    innerGroups: SGFormInnerGroupConfig[];
}>;

export type SGFormInnerGroupConfig = Readonly<{
    name: string;
    label: string;
    controls: SGFormControlConfig[];
}>;

export type SGFormControlConfig = Readonly<{
    id: string;
    name: string;
    label: string;
    value: string | number;
    prefix?: string;
    postfix?: string;
}>;
