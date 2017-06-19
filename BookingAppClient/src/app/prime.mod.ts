import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule, SharedModule, GalleriaModule, TooltipModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import {OverlayPanelModule,ContextMenuModule} from 'primeng/primeng';

export const PrimeMode = [
    ContextMenuModule,
    OverlayPanelModule,
    PanelModule,
    InputTextModule,
    GalleriaModule,
    TooltipModule,
    ButtonModule,
    DataTableModule,
    SharedModule];