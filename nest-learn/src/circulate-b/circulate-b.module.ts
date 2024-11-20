import {forwardRef, Module} from '@nestjs/common';
import { CirculateAModule } from "src/circulate-a/circulate-a.module"

@Module({
    imports: [
        forwardRef(() => CirculateAModule)
    ]
})
export class CirculateBModule {}
