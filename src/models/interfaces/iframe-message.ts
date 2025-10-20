import type { IframeMessageType } from '../constants/iframe-message-type';

import type { Resume } from './resume-data';

export type IframeMessage<Payload = undefined> = Payload extends undefined
  ? {}
  : {
      payload: Payload;
    } & { type: IframeMessageType };

export interface IframeLoadedMesage extends IframeMessage {
  type: IframeMessageType.Loaded;
}

export interface IframeResumeMessage extends IframeMessage<{ resume: Resume }> {
  type: IframeMessageType.ResumeUpdate;
}
