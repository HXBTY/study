import {forwardRef, Module} from '@nestjs/common';
import { CirculateBModule } from "src/circulate-b/circulate-b.module"

@Module({
    /**
     * forwardRef 处理循环引用的问题
     */
    imports: [
        forwardRef(() => CirculateBModule)
    ]
})
export class CirculateAModule {}
