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
import {EMPTY, switchMap} from "rxjs";
import {SGApplicationStatusService} from "../../services/application-status.service";

@Component({
    selector: "sg-application-status",
    templateUrl: "./application-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiTooltipModule, TuiHintModule, TuiButtonModule, TuiSvgModule, TuiLetModule, TuiLoaderModule],
    providers: [
        SGApplicationStatusService
    ]
})
export class SGApplicationStatusComponent {

    public _appStatus$ = this.appQuery.applicationStatus$;

    public _appStatuses: typeof SGServerApplicationStatus = SGServerApplicationStatus;

    private statusToActionMapping: Record<SGServerApplicationStatus, () => void> = {
        [SGServerApplicationStatus.IDLE]: () => this.handleStartApplication(),
        [SGServerApplicationStatus.RUNNING]: () => this.handleStopApplication(),
        [SGServerApplicationStatus.WAITING_START]: () => {
        },
        [SGServerApplicationStatus.WAITING_STOP]: () => {
        },
        [SGServerApplicationStatus.ERROR]: () => {
        }
    };

    @HostBinding("class.sg-application-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService,
                private applicationStatusService: SGApplicationStatusService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }

    @HostListener("click")
    private onClick(): void {
        this.statusToActionMapping[this.appQuery.getValue().serverStatus.applicationStatus]();
    }

    private handleStartApplication(): void {
        this.applicationStatusService.startApplication({})
            .pipe()
            .subscribe();
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
                switchMap((response: boolean) => {
                    if (response) {
                        return this.applicationStatusService.stopApplication()
                            .pipe();
                    }

                    return EMPTY;
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
