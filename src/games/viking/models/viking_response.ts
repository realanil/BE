import { PlatformMath } from "../../../libs/platform/base/platform_math";
import { ConfigResponseV2Model, PlayResponseV2Model } from "../../../libs/platform/slots/responses_v2";
import { VikingState } from "./viking_state";

export class VikingResponseModel extends PlayResponseV2Model {

    public scatterCount = 0;
    public activeReels = [];

    constructor( version:string, name:string, math:PlatformMath, state:VikingState ) {
        super( version, name, math, state);
        this.scatterCount = state.scatterCount;
        this.activeReels = state.activeReels;
    }
}

export class VikingConfigResponseV2Model extends ConfigResponseV2Model {
    
    public scatterCount = 0;
    public activeReels = [];

    constructor( version:string, name:string, math:PlatformMath, state:VikingState ) {
        super( version, name, math, state);
        this.scatterCount = state.scatterCount;
        this.activeReels = state.activeReels;
    }

}
