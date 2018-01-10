import { NappJS, NappJSModule } from 'nappjs';
export default class NappJSRestAPI extends NappJSModule {
    postRegister(napp: NappJS): Promise<void>;
}
