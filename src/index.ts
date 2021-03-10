import _ from 'lodash';
import { Subject } from 'rxjs';
import actions from './actions';
import {
  PageAction,
  PageActionOtherActionQueue,
  PageActionQueue,
  PageActionType,
} from './types';

type Data = object | boolean | string | number | undefined;

type Payload = {
  data: Data;
  actionType?: PageActionType;
};

function runTask(params: Data, action: PageAction): Promise<number> {
  return new Promise<number>((resolve) => {
    const result = _.add(params as number, 1);
    console.log(action.type, result);
    resolve(result);
  });
}

interface ObservableActionQueues {
  [actionQueueId: string]: {
    start$: Subject<Payload>;
    result$: Subject<Payload>;
  };
}

function getObservableActionQueues(actionQueues: {
  [actionId: string]: PageActionQueue;
}): ObservableActionQueues {
  const observableActionQueues: ObservableActionQueues = {};
  const actionQueueList = _.values(actionQueues);
  let counter = actionQueueList.length;

  // 1. 观察剩余队列是否为空
  // 2. 若存在循环依赖，则剩余队列始终无法为空（依赖了尚未生成的依赖），则循环过原始队列长度的次数后退出
  while (actionQueueList.length > 0 && counter > 0) {
    counter--;
    // 去除尚存未解决关联依赖的 actionQueue
    const list = _.remove(actionQueueList, (actionQueue) =>
      actionQueue.actions.every(
        (action) =>
          action.type !== PageActionType.OTHER_ACTION_QUEUE ||
          (action as PageActionOtherActionQueue).actionId in
            observableActionQueues,
      ),
    );

    // 余下的则是关联依赖均已解决的，或没有关联依赖的
    list.forEach((actionQueue) => {
      const start = new Subject<Payload>();

      observableActionQueues[actionQueue.id] = {
        start$: start,
        result$: actionQueue.actions.reduce((acc, action) => {
          const subject = new Subject<Payload>();

          acc.subscribe(
            (payload) => {
              if (payload.actionType === PageActionType.GUARD && !payload.data) {
                subject.complete();
              }

              if (action.type === PageActionType.OTHER_ACTION_QUEUE) {
                const act = action as PageActionOtherActionQueue;

                const relativeAction$ = observableActionQueues[act.actionId];

                relativeAction$.result$.subscribe((result) =>
                  subject.next(result),
                );

                relativeAction$.start$.next(payload);
              } else {
                runTask(payload.data, action)
                  .then((result) =>
                    subject.next({
                      data: result,
                      actionType: action.type,
                    }),
                  )
                  .catch((error) => subject.error(error));
              }
            },
            (error) => subject.error(error),
            () => subject.complete(),
          );

          return subject;
        }, start),
      };
    });
  }

  if (actionQueueList.length > 0) {
    console.info(
      '尚存未解决的依赖队列，检查是否有循环依赖',
      actionQueueList.map((i) => i.id).toString(),
    );
  }

  return observableActionQueues;
}

function main() {
  const actionQueues = getObservableActionQueues(
    (actions as unknown) as { [key: string]: PageActionQueue },
  );

  const actionQueue = actionQueues['75f1f81c-ff8f-4ad6-a62b-02c774e1ee21'];

  if (actionQueue) {
    actionQueue.result$.subscribe(
      (result) => console.log('result$ is: ', result),
      (error) => console.log('error', error),
    );

    actionQueue.start$.next({ data: 0 });
  } else {
    throw Object({ message: '未找到 actionQueue' });
  }
}

main();
