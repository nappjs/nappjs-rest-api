import { NappJS, NappJSService } from 'nappjs';
import NappJSApi from 'nappjs-api';
import NappJSCoreData from 'nappjs-core-data';
export default class NappJSRestAPI extends NappJSService {
    static dependencies: string[];
    coredata: NappJSCoreData;
    api: NappJSApi;
    constructor(coredata: NappJSCoreData, api: NappJSApi);
    load(napp: NappJS): Promise<void>;
}
