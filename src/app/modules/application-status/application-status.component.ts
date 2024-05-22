import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, Injector} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../state/app.query";
import {SGServerApplicationStatus} from "../../models/core/server.model";
import {
    TuiButtonModule,
    TuiDialogService,
    TuiHintModule,
    TuiLoaderModule,
    TuiSvgModule,
    TuiTooltipModule
} from "@taiga-ui/core";
import {SGApplicationStatusFormService} from "./services/application-status-form.service";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SGAppService} from "../../state/app.service";
import {
    SGGenericModelDeviceViewFormData
} from "../generic-model-device-view/components/generic-model-device-view-form.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {
    SGModelsParametersConfigurationComponent
} from "../models-parameters-configuration/models-parameters-configuration.component";
import {
    SGModelsParametersConfigurationDialogData
} from "../models-parameters-configuration/model/models-parameters-configuration.model";
import {TUI_PROMPT} from "@taiga-ui/kit";
import {tap} from "rxjs";

@Component({
    selector: "sg-application-status",
    templateUrl: "./application-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiTooltipModule, TuiHintModule, TuiButtonModule, TuiSvgModule, TuiLetModule, TuiLoaderModule],
    providers: [
        SGApplicationStatusFormService
    ]
})
export class SGApplicationStatusComponent {

    public _appStatus$ = this.appQuery.select(state => state.serverStatus.applicationStatus);

    public _appStatuses: typeof SGServerApplicationStatus = SGServerApplicationStatus;

    private statusToActionMapping: Record<SGServerApplicationStatus, () => void> = {
        [SGServerApplicationStatus.IDLE]: () => this.handleStartApplication(),
        [SGServerApplicationStatus.RUNNING]: () => this.handleStopApplication(),
        [SGServerApplicationStatus.WAITING_START]: () => {
            this.updateAppStatus(SGServerApplicationStatus.RUNNING);
        },
        [SGServerApplicationStatus.WAITING_STOP]: () => {
            this.updateAppStatus(SGServerApplicationStatus.IDLE);
        },
        [SGServerApplicationStatus.ERROR]: () => {
        }
    };

    @HostBinding("class.sg-application-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }

    @HostListener("click")
    private onClick(): void {
        this.statusToActionMapping[this.appQuery.getValue().serverStatus.applicationStatus]();
    }

    private handleStartApplication(): void {
        this.updateAppStatus(SGServerApplicationStatus.WAITING_START);
        return;
        this.dialogs
            .open<SGGenericModelDeviceViewFormData>(
                new PolymorpheusComponent(SGModelsParametersConfigurationComponent, this.injector),
                {
                    data: <SGModelsParametersConfigurationDialogData>{
                        models: this.appQuery.getValue().config.models
                    },
                    dismissible: true,
                    size: "page"
                }
            )
            .subscribe();
    }

    private handleStopApplication(): void {
        this.dialogs
            .open<boolean>(TUI_PROMPT, {
                label: "Остановка моделей",
                data: {
                    content: 'Вы уверены, что хотите остановить модели?',
                    yes: 'Да',
                    no: 'Нет',
                },
            })
            .pipe(
                tap((response) => {
                    if (response) {
                        this.updateAppStatus(SGServerApplicationStatus.WAITING_STOP);
                    }
                })
            )
            .subscribe();
    }

    private updateAppStatus(status: SGServerApplicationStatus): void {
        this.appService.updateServerStatus({
            ...this.appQuery.getValue().serverStatus,
            applicationStatus: status
        });
    }
}
