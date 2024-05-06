export interface SGGenericModel<Input = any, Output = any, Parameters = any> {
    readonly input: Input;
    readonly output: Output;
    readonly parameters: Parameters;
}
