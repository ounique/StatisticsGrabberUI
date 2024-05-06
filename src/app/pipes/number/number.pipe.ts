import {Pipe, PipeTransform} from "@angular/core";
import {SGAppQuery} from "../../state/app.query";
import {SGConfigNumberFormat} from "../../models/core/app.model";

@Pipe({
    name: "sgNumber",
    standalone: true
})
export class SGNumberPipe implements PipeTransform {

    constructor(private appQuery: SGAppQuery) {
    }

    public transform(value: string | number): string {
        return this.convert(
            Number(value),
            this.appQuery.getValue().config.numberFormat
        ).toString();
    }

    private convert(
        value: number,
        format: SGConfigNumberFormat
    ): string {
        if (value === undefined || value === null) {
            return "";
        }

        return `${value < 0 ? "-" : ""}${this.getBasePart(value, format)}${this.getDecimalPart(value, format)}`;
    }

    private getBasePart(value: number, format: SGConfigNumberFormat): string {
        const base: string = parseInt(this.toFixed(Math.abs(value), format.precision), 10).toString();
        const mod: number = base.length > 3 ? base.length % 3 : 0;

        return (
            (mod ? base.substr(0, mod) + format.thousandsDelimiter : "") +
            base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + format.thousandsDelimiter)
        );
    }

    private getDecimalPart(value: number, format: SGConfigNumberFormat): string {
        const res: string = this.toFixed(Math.abs(value), format.precision)
            .split(".")[1];

        return res ? `${format.decimalDelimiter}${res}` : "";
    }

    private toFixed(value: number, precision: number): string {
        return Number(
            Math.round(Number(value + "e" + precision.toString())) + "e-" + precision.toString()
        ).toFixed(precision);
    }
}
