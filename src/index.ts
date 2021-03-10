import _ from 'lodash';
import { Subject } from 'rxjs';
import actions from './actions';
import {
  PageAction,
  PageActionOtherActionQueue,
  PageActionQueue,
  PageActionType,
} from './types';

type Result = object | boolean | string | number | undefined;

interface Payload {
  params?: Result;
}

function runTask(payload: Payload, action: PageAction): Promise<Result> {
  return new Promise<Result>((resolve) => {
    const { params } = payload;
    const result = _.add(params as number, 1);
    console.log(action.type, result);
    resolve(result);
  });
}

interface ObservableActionQueues {
  [actionQueueId: string]: {
    start$: Subject<Result>;
    result$: Subject<Result>;
  };
}

function getObservableActionQueues(actionQueues: {
  [actionId: string]: PageActionQueue;
}): ObservableActionQueues {
  const observableActionQueues: ObservableActionQueues = {};
  const actionQueueList = _.values(actionQueues);

  while (actionQueueList.length > 0) {
    // 若队列中的 action 是关联 id，且并未构建 observable，则先保留，到下一循环处理
    // 余下的则是关联 action 均可以找到的
    const list = _.remove(actionQueueList, (actionQueue) =>
      actionQueue.actions.every(
        (action) =>
          action.type !== PageActionType.OTHER_ACTION_QUEUE ||
          (action as PageActionOtherActionQueue).actionId in
            observableActionQueues,
      ),
    );

    list.forEach((actionQueue) => {
      const start = new Subject<Result>();

      observableActionQueues[actionQueue.id] = {
        start$: start,
        result$: actionQueue.actions.reduce((acc, action) => {
          const subject = new Subject<Result>();

          if (action.type === PageActionType.OTHER_ACTION_QUEUE) {
            const relativeAction$ =
              observableActionQueues[
                (action as PageActionOtherActionQueue).actionId
              ];

            relativeAction$.result$.subscribe((result) => subject.next(result));
          } else {
            acc.subscribe((params) => {
              runTask({ params }, action).then((result) =>
                subject.next(result),
              );
            });
          }

          return subject;
        }, start),
      };
    });
  }

  return observableActionQueues;
}

function main() {
  const actionQueues = getObservableActionQueues(
    (actions as unknown) as { [key: string]: PageActionQueue },
  );

  const actionQueue = _.values(actionQueues)[0];

  actionQueue.result$.subscribe((result) =>
    console.log('result$ is: ', result),
  );

  actionQueue.start$.next(0);
}

main();
