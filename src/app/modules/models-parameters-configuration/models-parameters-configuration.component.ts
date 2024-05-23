import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule, TuiCheckboxModule} from "@taiga-ui/kit";
import {SGModelsParametersConfigurationDialogData} from "./model/models-parameters-configuration.model";
import {SGApplicationStatusService} from "../../services/application-status.service";
import {SGModelName} from "../../models/core/app.model";

@Component({
    selector: "sg-model-parameters-configuration",
    templateUrl: "./models-parameters-configuration.component.html",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCheckboxLabeledModule, TuiButtonModule, TuiCheckboxModule]
})
export class SGModelsParametersConfigurationComponent implements OnInit {

    public _isMultipleView: boolean = false;

    public _selectedMenuItem: string = null;

    public _singleMenuItems: Readonly<{ id: SGModelName; text: string; }>[] = [
        {
            id: SGModelName.BMS_MODEL,
            text: "Батарея"
        },
        {
            id: SGModelName.RU_MODEL,
            text: "РУ"
        },
        {
            id: SGModelName.IMPELLER_MODEL,
            text: "Импеллер"
        }
    ];

    get data(): SGModelsParametersConfigurationDialogData {
        return this.context.data;
    }

    @HostBinding("class.sg-model-parameters-configuration")
    private hostClass: boolean = true;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGModelsParametersConfigurationDialogData>,
                private applicationStatusService: SGApplicationStatusService) {
    }

    public ngOnInit(): void {
    }

    public start(): void {
        this.applicationStatusService.startApplication({})
            .pipe()
            .subscribe();
    }

    public _onMenuItemClick(id: SGModelName): void {
        this._selectedMenuItem = id;
    }
}
